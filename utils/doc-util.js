export const getDocumentByAuthor = (docs, author) => {
	return docs.filter((doc) => encodeURI(doc.author) === author);
};

export const getDocumentByCategory = (docs, category) => {
	return docs.filter((doc) => doc.category === category);
};

export const getDocumentsByTag = (docs, tag) => {
	return docs.filter((doc) => doc.tags.some((t) => t === tag));
};
