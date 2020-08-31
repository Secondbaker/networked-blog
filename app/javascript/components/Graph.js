import Cytoscape from 'cytoscape';
import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import coseBilkent from 'cytoscape-cose-bilkent';
import { nodeName } from 'jquery';
const cy = Cytoscape;

cy.use(coseBilkent);

class Graph extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.nodes);
        this.handleLoad = this.handleLoad.bind(this);
        this.state = { height: "600px", width: "600px" };
    }

    render() {

        var elements = [];
        var nodes = this.props.nodes.slice();
        var mappedNodes = nodes.map((node) => {
            //console.log({ data: { id: node.id, label: node.name } });
            return { data: { id: node.id.toString(), label: node.name } };
        });
        elements = elements.concat(mappedNodes);

        var edges = this.props.edges.slice();
        console.log(edges);
        var mappedEdges = edges.map((edge) => {
            console.log({ data: { source: edge.source_id.toString(), target: edge.destination_id.toString() } });
            return { data: { source: edge.source_id.toString(), target: edge.destination_id.toString() } };
        });
        elements = elements.concat(mappedEdges);
        const layout = {
            name: 'cose-bilkent',
            animate: 'end',
            animationEasing: 'ease-out',
            animationDuration: 1000,
            randomize: true
        };

        return (

            <CytoscapeComponent cy={(cy) => { cy.center(); console.log(cy); return cy; }} layout={layout} elements={elements} className="width-100% height-100%" style={{ height: this.state.height, width: this.state.width, filter: blur("20px") }} />

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
        console.log(this.props.nodes);
        this.setState({ height: "100%", width: "100%" });

    }
}

export default Graph;