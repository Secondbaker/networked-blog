import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  render () {
    console.log(this.props.textBlocks);
    
    postBody = JSON.parse(this.props.value).text_blocks.map((block) => "<TextBlock value=${block}/>");
    
    return (
      
      <React.Fragment>
        {JSON.parse(this.props.value).name}
        <BlogPostTitle value={JSON.parse(this.props.value).name}/>
        {postBody}
      </React.Fragment>
    );
  }
}

export default BlogPost
