var cytoscape = require("cytoscape");
var coseBilkent = require("cytoscape-cose-bilkent");
let dagre = require('cytoscape-dagre');
var fcose = require('cytoscape-fcose');

cytoscape.use( fcose );
cytoscape.use( coseBilkent );
cytoscape.use( dagre ); // register extension

var $ = require("jquery")
var link_range = gon.max_links - gon.min_links;
var body_range = gon.max_body_length - gon.min_body_length;

var sat = 65
var lum = 50

function standardize_color(str) { var c = document.createElement('canvas').getContext('2d'); c.fillStyle = str; return c.fillStyle; }

var layout = 'cosedas'
var layoutRunner

var defaultfCoseOptions = {

  name: 'fcose',
  // 'draft', 'default' or 'proof' 
  // - "draft" only applies spectral layout 
  // - "default" improves the quality with incremental layout (fast cooling rate)
  // - "proof" improves the quality with incremental layout (slow cooling rate) 
  quality: "default",
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
  stop: () => {} // on layoutstop
};

if(layout == 'cose')
{
  var cy = cytoscape({

      container: $('#cy'), // container to render in
    
      elements: gon.graph_data,
    
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },
    
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#ccc',
            'line-fill': 'linear-gradient',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
          }
        }
      ],
    
      layout: {
        name: 'cose-bilkent',
        // 'draft', 'default' or 'proof" 
        // - 'draft' fast cooling rate 
        // - 'default' moderate cooling rate 
        // - "proof" slow cooling rate
        quality: 'proof',
        // Whether to include labels in node dimensions. Useful for avoiding label overlap
        nodeDimensionsIncludeLabels: true,
        // number of ticks per frame; higher is faster but more jerky
        refresh: 30,
        // Whether to fit the network view after when done
        fit: true,
        // Padding on fit
        padding: 10,
        // Whether to enable incremental mode
        randomize: true,
        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: 2000,
        // Ideal (intra-graph) edge length
        idealEdgeLength: gon.blog_posts.length / 2,
        // Divisor to compute edge forces
        edgeElasticity: .05,
        // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
        nestingFactor: 0.8,
        // Gravity force (constant)
        gravity: 0.2,
        // Maximum number of iterations to perform
        numIter: 500,
        // Whether to tile disconnected nodes
        tile: true,
        // Type of layout animation. The option set is {'during', 'end', false}
        animate: false,
        // Duration for animate:end
        animationDuration: 500,
        // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingVertical: 100,
        // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingHorizontal: 100,
        // Gravity range (constant) for compounds
        gravityRangeCompound: 1.0,
        // Gravity force (constant) for compounds
        gravityCompound: 0.5,
        // Gravity range (constant)
        gravityRange: 3.8,
        // Initial cooling factor for incremental layout
        initialEnergyOnIncremental: 0.5
      }
  });
}
else if (layout == 'dagre')
{
  var cy = cytoscape({

    container: $('#cy'), // container to render in

    elements: gon.graph_data,

    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'line-fill': 'linear-gradient',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
        }
      }
    ],

    layout: {
      name: 'dagre',
      nodeSep: undefined, // the separation between adjacent nodes in the same rank
      edgeSep: undefined, // the separation between adjacent edges in the same rank
      rankSep: undefined, // the separation between each rank in the layout
      rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right,
      ranker: 'network-simplex', // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
      minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
      edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

      // general layout options
      fit: true, // whether to fit to viewport
      padding: 30, // fit padding
      spacingFactor: .25, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
      animate: false, // whether to transition the node positions
      animateFilter: function( node, i ){ return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    }
  });
}
else
{
  var cy = cytoscape({

    container: $('#cy'), // container to render in
  
    
  
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': '#ccc',
          'line-fill': 'linear-gradient',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
        }
      }
    ]
  
    
});
}

var counter = 0;
gon.internal_links.forEach(element => {
  var newLink = [];

  if(cy.elements('node#' + element.source_id)[0] == null)
  {
    newLink.push({ group: 'nodes', data: { id: element.source_id} });
  }

  if(cy.elements('node#' + element.destination_id)[0] == null)
  {
    newLink.push({ group: 'nodes', data: { id: element.destination_id } });
  }
  
  newLink.push({ group: 'edges', data: { id: element.source_id +  '' + element.destination_id, source: element.source_id, target: element.destination_id } });

  var eles = cy.add(newLink);
  console.log(counter);
  counter++;
});
layoutRunner = cy.layout(defaultfCoseOptions);
hasRun = layoutRunner.run();
console.log(hasRun);
function colorNodes() {
  gon.blog_posts.forEach(element => {
    var size = element.internal_links_count * 20 / link_range + 10;
    var hue = element.internal_links_count * 315 / link_range;
    sat = element.body.length * 100 / body_range;
    lum = sat / 2;
    var color = 'hsl(' + hue + ', ' + sat + '%, ' + lum + '%)';
    cy.elements('node#' + element.id)[0].style({'background-color': color, 'width': size, 'height': size});
  });
}

function colorEdges() {
  gon.internal_links.forEach(element => {
    var gradientColors = '';
    var firstNode = gon.blog_posts.find(e => {
      if(e.id == element.source_id)
      {
        return true
      }
    });
    var hue = firstNode.internal_links_count * 315 / link_range;
    sat = firstNode.body.length * 100 / body_range;
    lum = sat / 2;
    var firstColor = 'hsl(' + hue + ' ' + sat + '% ' + lum + '%)';
    var firstColor = standardize_color(firstColor)
    //cy.elements('node#' + firstNode.id)[0].style('background-color', firstColor);
    var secondNode = gon.blog_posts.find(e => {
      if(e.id == element.destination_id)
      {
        return true
      }
    });
    var hue = secondNode.internal_links_count * 315 / link_range;
    sat = secondNode.body.length * 100 / body_range;
    lum = sat / 2;
    var secondColor = 'hsl(' + hue + ' ' + sat + '% ' + lum + '%)';
    var secondColor = standardize_color(secondColor)
    //cy.elements('node#' + secondNode.id)[0].style('background-color', secondColor);
    gradientColors = firstColor + " " + secondColor;
    cy.elements('edge#' + element.source_id + '' + element.destination_id)[0].style('line-gradient-stop-colors', gradientColors);
  });
}
cy.on('tap', 'node', function(evt){
  var node = evt.target;
  console.log( 'tapped ' + node.id() );
  location.href = '/blog_posts/' + node.id();
});