import ContentDisplay from "@/components/ContentDisplay";
import { getAllDocuments } from "@/libs/doc";
import { getDocumentByCategory } from "@/utils/doc-util";

export default function CategoryPage({ params: { name } }) {
	const docs = getAllDocuments();
	const categoryDocs = getDocumentByCategory(docs, name);
	return <ContentDisplay id={categoryDocs[0].id} />;
}
