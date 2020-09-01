import Cytoscape from 'cytoscape';
import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import coseBilkent from 'cytoscape-cose-bilkent';
import { nodeName } from 'jquery';
Cytoscape.use(coseBilkent);

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
        console.log(this.props.nodes);
        var height = "100%";
        var width = "100%";
        //this.cy.animate({})
        var elements = [];
        var nodes = this.props.nodes.slice();
        var mappedNodes = nodes.map((node) => {
            console.log({ data: { id: node.id, label: node.name } });
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
            randomize: true
        };

        var animation = this.cy.animation({
            duration: 1000,
            complete: this.centerGraph()

        });

        console.log(animation);

        this.cy.center();

        this.setState({ height: height, width: width, layout: layout, elements: elements.slice() });

        animation.play();

        console.log('Load handled');
    }

    centerGraph() {
        console.log('Centering graph');
        this.cy.center();
    }
}

export default Graph;