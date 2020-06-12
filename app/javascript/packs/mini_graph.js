var cytoscape = require('cytoscape');
var coseBilkent = require('cytoscape-cose-bilkent');
let dagre = require('cytoscape-dagre');
var fcose = require('cytoscape-fcose');

cytoscape.use(fcose);
cytoscape.use(coseBilkent);
cytoscape.use(dagre); // register extension

var $ = require('jquery');

var allPosts = [];
allPosts.concat(gon.related_posts);
allPosts.push(gon.blog_post);

var elements = [];
elements = elements.concat(gon.related_posts);
elements.push(gon.blog_post);
elements = elements.concat(gon.internal_links);

console.log(elements);
console.log(gon.related_posts);

var cy = cytoscape({
	container: $('#cy'),
	elements: elements,
});

console.log(cy.data());

console.log(blogPostToCyNodeArray(cy.data()[0]));
