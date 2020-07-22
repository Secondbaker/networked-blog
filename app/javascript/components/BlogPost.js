import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  render () {
    return (
      <React.Fragment>
        This is a BlogPost {JSON.parse(this.props.value).name}
        {this.props.textBlocks}
        <TextArea />
        <BlogPostTitle value={JSON.parse(this.props.value).name}/>
      </React.Fragment>
    );
  }
}

export default BlogPost
