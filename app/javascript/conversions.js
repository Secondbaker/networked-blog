console.log('hello from conversions');

//takes in a BlogPost
//returns an EleObj https://js.cytoscape.org/#notation/elements-json

export const blogPostToCyNodeArray = function (blogPost, nodeClass = '') {
	console.log({
		data: {
			label: blogPost.name,
			id: blogPost.id,
		},
		class: nodeClass
	});
	return ({
		data: {
			label: blogPost.name,
			id: blogPost.id,
		},
		class: nodeClass
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
