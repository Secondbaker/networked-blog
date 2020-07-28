import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    let textAreaCount = this.props.textBlocks.length + 1;
    let textBlocks = this.props.textBlocks.map((tb) => {
      tb.selected = false;
      return tb;});
    this.state = { textBlocks: textBlocks,
                  name: this.props.name,
                  selected: Array(textAreaCount).fill(false),
                };
  }
  render () {
    let {textBlocks, name} = this.state;
    
    
    return (
      
      <React.Fragment>
        <BlogPostTitle value={name}/>
        {textBlocks.map((block) => <TextBlock {...block} key={block.id} editMode={block.selected}/>)}
      </React.Fragment>
    );
  }
}

export default BlogPost
