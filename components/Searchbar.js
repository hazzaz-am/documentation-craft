"use client";
import Image from "next/image";
import SearchResults from "./SearchResults";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function Searchbar({ docs }) {
	const [searchResults, setSearchResults] = useState([]);
	const [term, setTerm] = useState("");
	const router = useRouter();

	const handleSearchTerm = (e) => {
		const value = e.target.value;
		setTerm(value);
		doSearch(value);
	};

	const doSearch = useDebounce((term) => {
		const findDocs = docs.filter((doc) => {
			return doc.title.toLowerCase().includes(term.toLowerCase());
		});
		setSearchResults([...findDocs]);
	}, 500);

	const closedSearchResults = (e) => {
		e.preventDefault();
		router.push(e.target.href);
		setSearchResults([]);
		setTerm("");
	};

	return (
		<div className="fixed inset-x-0 top-0 z-50 bg-white bg-white/[var(--bg-opacity-light)] px-4 backdrop-blur-sm transition dark:bg-[#17181C] dark:backdrop-blur sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 --bg-opacity-light: 0.5 --bg-opacity-dark: 0.2">
			<div className="container flex h-14 items-center justify-between gap-12">
				<div className="absolute inset-x-0 top-full h-px bg-zinc-900/7.5 transition dark:bg-white/7.5"></div>

				<div className="relative hidden lg:block lg:max-w-md lg:flex-auto">
					<button
						type="button"
						className="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
					>
						<Image
							alt="Search"
							src="/search.svg"
							className="h-5 w-5"
							width={20}
							height={20}
						/>
						<input
							type="text"
							placeholder="Search..."
							className="flex-1 focus:border-none focus:outline-none"
							value={term}
							onChange={handleSearchTerm}
						/>
					</button>
					{term && term.trim().length > 0 && (
						<SearchResults
							searchResults={searchResults}
							term={term}
							closedSearchResults={closedSearchResults}
						/>
					)}
				</div>

				{/* <!-- Mobile Responsive Header Starts --> */}
				<div className="flex items-center gap-5 lg:hidden">
					<button
						type="button"
						className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						aria-label="Toggle navigation"
					>
						<Image
							src="/hamburger.svg"
							alt="Menu"
							className="w-2.5 stroke-zinc-900 dark:stroke-white"
							width={10}
							height={1000}
						/>
					</button>
					<a aria-label="Home" href="/">
						<Image
							src="/logo.svg"
							alt="Protocol"
							className="h-6"
							width={1000}
							height={24}
						/>
					</a>
				</div>
				{/* <!-- Mobile Responsive Header Ends --> */}

				<div className="flex items-center gap-5">
					<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
					<div className="flex gap-4">
						<div className="contents lg:hidden">
							<button
								type="button"
								className="focus:[&amp;:not(:focus-visible)]:outline-none flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden"
								aria-label="Find something..."
							>
								<Image
									src="/search.svg"
									alt="Search"
									className="h-5 w-5"
									width={20}
									height={20}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
