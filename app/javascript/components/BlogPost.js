import React from "react"
import PropTypes from "prop-types"
import { TextArea , BlogPostTitle } from './TextArea'
class BlogPost extends React.Component {
  render () {
    return (
      <React.Fragment>
        This is a BlogPost
        <TextArea />
        <BlogPostTitle />
      </React.Fragment>
    );
  }
}

export default BlogPost
