var cytoscape = require("cytoscape");
var $ = require("jquery")

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
      name: 'grid'
    }
  
  });

gon.blog_posts.forEach(element => {
  cy.elements('node#' + element.id)[0].style('background-color', element.name);
});

gon.internal_links.forEach(element => {
  cy.elements('edge#' + element.source_id + '' + element.destination_id)[0].style('line-gradient-stop-colors', 'magenta yellow');
});