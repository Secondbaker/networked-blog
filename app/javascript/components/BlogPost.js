import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textBlocks: this.props.textBlocks,
                  name: this.props.name,
                };
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
