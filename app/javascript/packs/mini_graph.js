import { blogPostToCyNodeArray, internalLinkToCyEdgeArray } from 'conversions';

var cytoscape = require('cytoscape');
var coseBilkent = require('cytoscape-cose-bilkent');
let dagre = require('cytoscape-dagre');
var fcose = require('cytoscape-fcose');
var conversions = require('conversions');
cytoscape.use(fcose);
cytoscape.use(coseBilkent);
cytoscape.use(dagre); // register extension

var $ = require('jquery');

var elements = [];
elements.push(blogPostToCyNodeArray(gon.blog_post));
gon.related_posts.forEach(function (post) {
	elements.push(blogPostToCyNodeArray(post));
	console.log(post.id);
});
gon.internal_links.forEach(function (internalLink) {
	console.log(internalLink.source_id);
	console.log(internalLink.destination_id);
	elements.push(internalLinkToCyEdgeArray(internalLink));
});

elements = elements.concat();

console.log(elements[0]);
console.log(blogPostToCyNodeArray(elements[0]));
console.log(gon.related_posts);

var cy = cytoscape({
	container: $('#cy'),
	elements: elements,
});

console.log(conversions);
console.log(cy.elements()[0]);
console.log(blogPostToCyNodeArray(cy.elements()[0]));

cy.on('tap', 'node', function (evt) {
	var node = evt.target;
	console.log('tapped ' + node.id());
	location.href = '/blog_posts/' + node.id();
});
