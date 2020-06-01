var cytoscape = require("cytoscape");
var coseBilkent = require("cytoscape-cose-bilkent");
let dagre = require('cytoscape-dagre');

cytoscape.use( coseBilkent );
cytoscape.use( dagre ); // register extension

var $ = require("jquery")
var link_range = gon.max_links - gon.min_links;

var sat = 65
var lum = 50

console.log(link_range);

function standardize_color(str) { var c = document.createElement('canvas').getContext('2d'); c.fillStyle = str; return c.fillStyle; }

var layout = 'dagre'

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
            'width': 3,
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
        nodeRepulsion: 200000,
        // Ideal (intra-graph) edge length
        idealEdgeLength: gon.blog_posts.length,
        // Divisor to compute edge forces
        edgeElasticity: 0.45,
        // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
        nestingFactor: 0.1,
        // Gravity force (constant)
        gravity: 0.2,
        // Maximum number of iterations to perform
        numIter: 250,
        // Whether to tile disconnected nodes
        tile: true,
        // Type of layout animation. The option set is {'during', 'end', false}
        animate: 'during',
        // Duration for animate:end
        animationDuration: 500,
        // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingVertical: 100,
        // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingHorizontal: 100,
        // Gravity range (constant) for compounds
        gravityRangeCompound: 1.5,
        // Gravity force (constant) for compounds
        gravityCompound: 1.0,
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

  gon.blog_posts.forEach(element => {
    var hue = element.internal_links_count * 315 / link_range;
    sat = element.body.length;
    var color = 'hsl(' + hue + ', ' + sat + '%, ' + lum + '%)';
    console.log(color);
    cy.elements('node#' + element.id)[0].style('background-color', color);
  });

gon.internal_links.forEach(element => {
  var gradientColors = '';
  var firstNode = gon.blog_posts.find(e => {
    if(e.id == element.source_id)
    {
      return true
    }
  });
  var hue = firstNode.internal_links_count * 315 / link_range;
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
  var secondColor = 'hsl(' + hue + ' ' + sat + '% ' + lum + '%)';
  var secondColor = standardize_color(secondColor)
  //cy.elements('node#' + secondNode.id)[0].style('background-color', secondColor);
  gradientColors = firstColor + " " + secondColor;
  console.log(gradientColors)
  cy.elements('edge#' + element.source_id + '' + element.destination_id)[0].style('line-gradient-stop-colors', gradientColors);
});