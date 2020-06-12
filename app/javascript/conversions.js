console.log('hello from conversions');

//takes in a BlogPost
//returns an EleObj https://js.cytoscape.org/#notation/elements-json

export const blogPostToCyNodeArray = function (blogPost) {
	let result = {
		data: {
			label: blogPost.name,
			id: blogPost.id,
		},
	};
	console.log('blogPostToCyNodeArray');
	return result;
};
export const internalLinkToCyEdgeArray = function (internalLink) {};
