import Link from "next/link";

export default function Sidebar({ allDocs }) {
	const rootDocs = allDocs.filter((doc) => !doc.parent);

	const groupedDocs = Object.groupBy(
		allDocs.filter((doc) => doc.parent),
		({ parent }) => parent
	);

	return (
		<nav className="hidden lg:mt-10 lg:block">
			<div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
			<div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
			<div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
			<ul role="list" className="border-l border-transparent">
				{rootDocs.map((rootNode) => (
					<li key={rootNode.id} className="relative">
						<Link
							aria-current="page"
							className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
							href={`/docs/${rootNode.id}`}
						>
							<span className="truncate">{rootNode.title}</span>
						</Link>

						{groupedDocs[rootNode.id] && (
							<ul role="list" className="border-l border-transparent">
								{groupedDocs[rootNode.id].map((childNode) => (
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
