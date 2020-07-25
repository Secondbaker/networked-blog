import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  render () {
    console.log(this.props.textBlocks);
    
    let postBody = this.props.textBlocks.map((block) => console.log(block));
    
    return (
      
      <React.Fragment>
        {this.props.name}
        <BlogPostTitle value={this.props.name}/>
        {postBody}
      </React.Fragment>
    );
  }
}

export default BlogPost
