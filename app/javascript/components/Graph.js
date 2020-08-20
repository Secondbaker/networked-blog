import React from "react"
var cytoscape = require("cytoscape");
import BlogPost from "./BlogPost"
class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log('Rendering Cytoscape Graph')
        return (
            <p>here</p>
        );
    }
}

export default Graph;
