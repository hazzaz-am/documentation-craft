import ContentDisplay from "@/components/ContentDisplay";
import { getAllDocuments } from "@/libs/doc";
import { getDocumentsByTag } from "@/utils/doc-util";

export default function TagPage({ params: { name } }) {
	const docs = getAllDocuments();
	const tagDocs = getDocumentsByTag(docs, name);
	return <ContentDisplay id={tagDocs[0].id} />;
}
