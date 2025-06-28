"use client";

import {
	getDocumentByAuthor,
	getDocumentByCategory,
	getDocumentsByTag,
} from "@/utils/doc-util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar({ allDocs }) {
	const pathName = usePathname();
	const [rootNodes, setRootNodes] = useState([]);
	const [nonRootNodesGrouped, setNonRootNodesGrouped] = useState({});

	useEffect(() => {
		let matchedDocs = allDocs;
		if (pathName.includes("/tags")) {
			const tag = pathName.split("/")[2];
			matchedDocs = getDocumentsByTag(allDocs, tag);
		} else if (pathName.includes("/categories")) {
			const category = pathName.split("/")[2];
			matchedDocs = getDocumentByCategory(allDocs, category);
		} else if (pathName.includes("/authors")) {
			const author = pathName.split("/")[2];
			matchedDocs = getDocumentByAuthor(allDocs, author);
		}

		const rootDocs = matchedDocs.filter((doc) => !doc.parent);

		const groupedDocs = Object.groupBy(
			matchedDocs.filter((doc) => doc.parent),
			({ parent }) => parent
		);

		const nonRootsKeys = Reflect.ownKeys(groupedDocs);
		nonRootsKeys.forEach((key) => {
			const foundInRoots = rootDocs.find((doc) => doc.id === key);

			if (!foundInRoots) {
				const foundInDocs = allDocs.find((doc) => doc.id === key);
				rootDocs.push(foundInDocs);
			}
		});

		rootDocs.sort((a, b) => {
			if (a.order < b.order) {
				return -1;
			} else if (a.order > b.order) {
				return 1;
			} else {
				return 0;
			}
		});

		setRootNodes([...rootDocs]);
		setNonRootNodesGrouped({ ...groupedDocs });
	}, [pathName, allDocs]);

	return (
		<nav className="hidden lg:mt-10 lg:block">
			<div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
			<div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
			<div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
			<ul role="list" className="border-l border-transparent">
				{rootNodes.map((rootNode) => (
					<li key={rootNode.id} className="relative">
						<Link
							aria-current="page"
							className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
							href={`/docs/${rootNode.id}`}
						>
							<span className="truncate">{rootNode.title}</span>
						</Link>

						{nonRootNodesGrouped[rootNode.id] && (
							<ul role="list" className="border-l border-transparent">
								{nonRootNodesGrouped[rootNode.id].map((childNode) => (
									<li key={childNode.id} className="relative">
										<Link
											className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-white"
											href={`/docs/${rootNode.id}/${childNode.id}`}
										>
											<span className="truncate">{childNode.title}</span>
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
