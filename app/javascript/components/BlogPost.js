import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    let textAreaCount = this.props.textBlocks.length + 1;
    let textBlocks = this.props.textBlocks.slice();
    this.state = { textBlocks: textBlocks,
                  name: this.props.name,
                  selected: Array(textAreaCount).fill(false),
                };
    this.state.textBlocks.map((e) => console.log(e));
  }
  render () {
    let {textBlocks, name} = this.state;
    
    
    return (
      
      <React.Fragment>
        <BlogPostTitle value={name}/>
        {textBlocks.map((block) => <TextBlock {...block} key={block.id} editMode={true}/>)}
      </React.Fragment>
    );
  }
}

export default BlogPost
