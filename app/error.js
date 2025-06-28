"use client";

export default function Error({ error, reset }) {
	return (
		<div>
			<h2>Something went wrong!</h2>
			<h2 className="text-red-600 font-bold">{error.message}</h2>
			<button
				className="bg-gray-200 px-2 py-1 mt-2 rounded-md mr-2 text-xs font-bold underline transition-all text-emerald-600"
				onClick={() => reset()}
			>
				Try again
			</button>
		</div>
	);
}
