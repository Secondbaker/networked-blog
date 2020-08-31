import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.message);
        this.handleLoad = this.handleLoad.bind(this);
        this.state = { height: "600px", width: "600px" };
    }

    render() {
        const elements = [
            { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
        ];

        return (

            <CytoscapeComponent elements={elements} className="width-100% height-100% blur" style={{ height: this.state.height, width: this.state.width, filter: blur("20px") }} />

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
        this.setState({ height: "100%", width: "100%" });
    }
}

export default Graph;