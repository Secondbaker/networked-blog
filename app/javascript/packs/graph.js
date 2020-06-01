var cytoscape = require("cytoscape");
var coseBilkent = require("cytoscape-cose-bilkent");

cytoscape.use( coseBilkent );

var $ = require("jquery")
var link_range = gon.max_links - gon.min_links;

console.log(link_range);

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
      name: 'cose'
    }
  
  });

  gon.blog_posts.forEach(element => {
    var hue = element.internal_links_count * 360 / link_range;
    var color = 'hsl(' + hue + ', 75%, 50%)';
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
  var firstColor = firstNode.name
  //cy.elements('node#' + firstNode.id)[0].style('background-color', firstColor);
  var secondNode = gon.blog_posts.find(e => {
    if(e.id == element.destination_id)
    {
      return true
    }
  });
  var secondColor = secondNode.name
  //cy.elements('node#' + secondNode.id)[0].style('background-color', secondColor);
  gradientColors = firstColor + ' ' + secondColor;
  cy.elements('edge#' + element.source_id + '' + element.destination_id)[0].style('line-gradient-stop-colors', gradientColors);
});