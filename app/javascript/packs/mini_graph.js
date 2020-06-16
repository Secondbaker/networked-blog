import { blogPostToCyNodeArray, internalLinkToCyEdgeArray } from 'conversions';

var cytoscape = require('cytoscape');
var coseBilkent = require('cytoscape-cose-bilkent');
let dagre = require('cytoscape-dagre');
var fcose = require('cytoscape-fcose');
cytoscape.use(fcose);
cytoscape.use(coseBilkent);
cytoscape.use(dagre); // register extension

var $ = require('jquery');

var defaultfCoseOptions = {
	name: 'fcose',
	// 'draft', 'default' or 'proof'
	// - "draft" only applies spectral layout
	// - "default" improves the quality with incremental layout (fast cooling rate)
	// - "proof" improves the quality with incremental layout (slow cooling rate)
	quality: 'default',
	// Use random node positions at beginning of layout
	// if this is set to false, then quality option must be "proof"
	randomize: true,
	// Whether or not to animate the layout
	animate: true,
	// Duration of animation in ms, if enabled
	animationDuration: 1000,
	// Easing of animation, if enabled
	animationEasing: undefined,
	// Fit the viewport to the repositioned nodes
	fit: true,
	// Padding around layout
	padding: 30,
	// Whether to include labels in node dimensions. Valid in "proof" quality
	nodeDimensionsIncludeLabels: false,
	// Whether or not simple nodes (non-compound nodes) are of uniform dimensions
	uniformNodeDimensions: false,
	// Whether to pack disconnected components - valid only if randomize: true
	packComponents: true,

	/* spectral layout options */

	// False for random, true for greedy sampling
	samplingType: true,
	// Sample size to construct distance matrix
	sampleSize: 25,
	// Separation amount between nodes
	nodeSeparation: 75,
	// Power iteration tolerance
	piTol: 0.0000001,

	/* incremental layout options */

	// Node repulsion (non overlapping) multiplier
	nodeRepulsion: 4500,
	// Ideal edge (non nested) length
	idealEdgeLength: 50,
	// Divisor to compute edge forces
	edgeElasticity: 0.45,
	// Nesting factor (multiplier) to compute ideal edge length for nested edges
	nestingFactor: 0.1,
	// Maximum number of iterations to perform
	numIter: 2500,
	// For enabling tiling
	tile: true,
	// Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
	tilingPaddingVertical: 10,
	// Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
	tilingPaddingHorizontal: 10,
	// Gravity force (constant)
	gravity: 0.25,
	// Gravity range (constant) for compounds
	gravityRangeCompound: 1.5,
	// Gravity force (constant) for compounds
	gravityCompound: 1.0,
	// Gravity range (constant)
	gravityRange: 3.8,
	// Initial cooling factor for incremental layout
	initialEnergyOnIncremental: 0.3,

	/* layout event callbacks */
	ready: () => {}, // on layoutready
	stop: () => {}, // on layoutstop
};

var cy = cytoscape({
	container: $('#cy'),
	style: [
		// the stylesheet for the graph
		{
			selector: 'node',
			style: {
				'background-color': '#666',
				label: 'data(label)',
			},
		},

		{
			selector: 'edge',
			style: {
				width: 1,
				'line-color': '#ccc',
				'line-fill': 'linear-gradient',
				'target-arrow-color': '#ccc',
				'target-arrow-shape': 'triangle',
			},
		},
	],
});

cy.add(blogPostToCyNodeArray(gon.blog_post));
gon.related_posts.forEach(function (post) {
	cy.add(blogPostToCyNodeArray(post));
});
console.log(cy.elements());
gon.internal_links.forEach(function (internalLink) {
	cy.add(internalLinkToCyEdgeArray(internalLink));
});

let layoutRunner = cy.layout(defaultfCoseOptions);
let hasRun = layoutRunner.run();

cy.on('tap', 'node', function (evt) {
	var node = evt.target;
	location.href = '/blog_posts/' + node.id();
});
