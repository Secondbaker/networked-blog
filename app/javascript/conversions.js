//takes in a BlogPost
//returns an EleObj https://js.cytoscape.org/#notation/elements-json

export const blogPostToCyNodeArray = function (blogPost, nodeClass = '') {
	
	return ({
		data: {
			label: blogPost.name,
			id: blogPost.id,
		},
		classes: nodeClass
	});	
};
export const internalLinkToCyEdgeArray = function (internalLink) {
	return {
		data: {
			id: internalLink.id,
			source: internalLink.source_id,
			target: internalLink.destination_id,
		},
	};
};
