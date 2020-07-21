import React from "react"
import PropTypes from "prop-types"
export class TextArea extends React.Component {
  render () {
    return (
      <React.Fragment>
        <p>TextArea</p>
      </React.Fragment>
    );
  }
}

export class BlogPostTitle extends TextArea {
  render() {
    return (
      <React.Fragment>
        BlogPostTitle
      </React.Fragment>
    );
  }
}

export class TextBlock extends TextArea {
  render() {
    return (
      <React.Fragment>
        BlogPostTitle
      </React.Fragment>
    );
  }
}
