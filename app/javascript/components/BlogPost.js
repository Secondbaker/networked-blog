import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    let textBlocks = this.props.textBlocks.slice();
    textBlocks.unshift(this.props.name);
    textBlocks = textBlocks.map((tb) => {
      tb.selected = false;
      return tb;});
    this.state = { textBlocks: textBlocks,
                  name: this.props.name,
                };
  }
  handleClick(key) {

    let textBlocks = this.state.textBlocks.slice();
    if(Number.isInteger(key))
    {
      textBlocks = textBlocks.map((tb) => {
        tb.selected = false;
        return tb;
      })
      textBlocks[key].selected = true;
    }
    this.setState({
      textBlocks: textBlocks
    });
    console.log(key);
  }
  render () {
    let {textBlocks, name} = this.state;
    
    
    return (
      
      <React.Fragment>
        <BlogPostTitle onClick={() => this.handleClick(0)} value={name.name}/>
        {textBlocks.map((block) => <TextBlock onClick={() => this.handleClick(textBlocks.indexOf(block))} {...block} key={block.id} editMode={block.selected}/>)}
      </React.Fragment>
    );
  }
}

export default BlogPost
