import React from "react"
import PropTypes from "prop-types"
import BlogPostTitle from './TextArea'
import TextArea from './TextArea'
class BlogPost extends React.Component {
  render () {
    return (
      <React.Fragment>
        This is a BlogPost
        <TextArea />
      </React.Fragment>
    );
  }
}

export default BlogPost
