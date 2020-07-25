import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  render () {
    console.log(this.props.textBlocks);
    
    let postBody = this.props.textBlocks.map((block) => `<p><TextBlock {...block} /></p>` ).join('\n');
    
    return (
      
      <React.Fragment>
        <BlogPostTitle value={this.props.name}/>
        {this.props.textBlocks.map((block) => <p><TextBlock {...block} /></p>)}
      </React.Fragment>
    );
  }
}

export default BlogPost
