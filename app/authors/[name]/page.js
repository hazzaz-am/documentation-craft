import ContentDisplay from "@/components/ContentDisplay";
import { getAllDocuments } from "@/libs/doc";
import { getDocumentByAuthor } from "@/utils/doc-util";

export default function AuthorPage({ params: { name } }) {
	const docs = getAllDocuments();
	const authorDocs = getDocumentByAuthor(docs, name);

	return <ContentDisplay id={authorDocs[0].id} />;
}
