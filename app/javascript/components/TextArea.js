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
        {this.props.value}
      </React.Fragment>
    );
  }
}

export class TextBlock extends TextArea {
  render() {
    let body;
    if(this.props.editMode)
    {
      body = <textarea defaultValue={this.props.body}></textarea>
    }
    else
    {
      body = this.props.body;
    }
    return (
      <React.Fragment>
        <p>
          {body}
        </p>
      </React.Fragment>
    );
  }
}
