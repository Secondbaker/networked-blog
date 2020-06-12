import { blogPostToCyNodeArray } from 'conversions';

var cytoscape = require('cytoscape');
var coseBilkent = require('cytoscape-cose-bilkent');
let dagre = require('cytoscape-dagre');
var fcose = require('cytoscape-fcose');
var conversions = require('conversions');
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
