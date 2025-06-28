
export default function LoadingSkeleton() {
	return (
		<div className="animate-pulse">
			<div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
			<div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
			<div className="h-4 w-1/6 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
			<div className="space-y-4">
				<div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
				<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
				<div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
				<div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
			</div>
		</div>
	);
}
