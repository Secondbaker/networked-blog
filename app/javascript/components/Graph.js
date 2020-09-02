import Cytoscape from 'cytoscape';
import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import coseBilkent from 'cytoscape-cose-bilkent';
import { nodeName } from 'jquery';
import Spread from 'cytoscape-spread';
Cytoscape.use(coseBilkent);
Spread(Cytoscape);

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
        this.state = { height: "600px", width: "600px", elements: [], layout: { name: 'random' } };
    }

    render() {

        let { layout, elements, height, width } = this.state;


        return (

            <CytoscapeComponent cy={(cy) => { this.cy = cy }} layout={layout} elements={elements} className="" style={{ height: height, width: width, filter: blur("20px") }} />

        );
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

    handleLoad() {
        console.log('Handle Load');
        //console.log(this.props.nodes);
        var height = "100%";
        var width = "100%";
        //this.cy.animate({})
        var elements = [];
        var nodes = this.props.nodes.slice();
        var mappedNodes = nodes.map((node) => {
            //console.log({ data: { id: node.id, label: node.name } });
            return { data: { id: node.id.toString(), label: node.name } };
        });
        elements = elements.concat(mappedNodes);

        var edges = this.props.edges.slice();
        //console.log(edges);
        var mappedEdges = edges.map((edge) => {
            //console.log({ data: { source: edge.source_id.toString(), target: edge.destination_id.toString() } });
            return { data: { source: edge.source_id.toString(), target: edge.destination_id.toString() } };
        });
        elements = elements.concat(mappedEdges);

        const layout = {
            name: 'cose-bilkent',
            randomize: true,
            animate: true, // Whether to show the layout as it's running
            ready: undefined, // Callback on layoutready
            stop: undefined, // Callback on layoutstop
            fit: true, // Reset viewport to fit default simulationBounds

            minDist: 20, // Minimum distance between nodes
            padding: 20, // Padding
            expandingFactor: -1.0, // If the network does not satisfy the minDist
            // criterium then it expands the network of this amount
            // If it is set to -1.0 the amount of expansion is automatically
            // calculated based on the minDist, the aspect ratio and the
            // number of nodes
            prelayout: { name: 'cose' }, // Layout options for the first phase
            maxExpandIterations: 4, // Maximum number of expanding iterations
            boundingBox: undefined, // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            randomize: true // Uses random initial node positions on true
        };

        this.setState({ height: height, width: width, layout: layout, elements: elements.slice() });


        console.log('Load handled');
        this.centerGraph();
    }

    centerGraph() {
        console.log('Centering graph');
        this.cy.center();
    }
}

export default Graph;