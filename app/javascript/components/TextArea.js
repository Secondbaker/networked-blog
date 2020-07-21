import React from "react"
import PropTypes from "prop-types"
class TextArea extends React.Component {
  render () {
    return (
      <React.Fragment>
        TextArea
      </React.Fragment>
    );
  }
}

class BlogPostTitle extends TextArea {
  render() {
    return (
      <React.Fragment>
        BlogPostTitle
      </React.Fragment>
    );
  }
}

export { TextArea,
   BlogPostTitle
}