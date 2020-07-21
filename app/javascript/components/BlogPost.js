import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
class BlogPost extends React.Component {
  render () {
    return (
      <React.Fragment>
        This is a BlogPost {this.props.value}
        <TextArea />
        <BlogPostTitle />
      </React.Fragment>
    );
  }
}

export default BlogPost
