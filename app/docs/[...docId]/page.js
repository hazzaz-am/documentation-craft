import ContentDisplay from "@/components/ContentDisplay";

export default function ContentPage({ params }) {
	const { docId } = params;
	return (
		<ContentDisplay id={docId[docId.length - 1]}  />
	);
}
