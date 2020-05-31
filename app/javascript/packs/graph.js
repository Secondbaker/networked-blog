var cytoscape = require("cytoscape");
var $ = require("jquery")
console.log ('here');
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
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'line'
        }
      }
    ],
  
    layout: {
      name: 'grid',
      rows: 15
    }
  
  });