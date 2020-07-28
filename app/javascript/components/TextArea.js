import React from "react"
import PropTypes from "prop-types"
export class TextArea extends React.Component {
  render() {
    let body;
    if (this.props.editMode) {
      body = <textarea defaultValue={this.props.body}></textarea>
    }
    else {
      body = this.props.body;
    }
    return (
      <React.Fragment>
        <p onClick={() => this.props.onClick()}>
          {body}
        </p>
      </React.Fragment>
    );
  }
}

export class BlogPostTitle extends TextArea {
  render() {
    console.log('here');
    return (
      <TextArea body={this.props.value} editMode={this.props.editMode} onClick={this.props.onClick}/>
    );
  }
}

export class TextBlock extends TextArea {
  render() {
    return (
      <TextArea body={this.props.body} editMode={this.props.editMode} onClick={this.props.onClick} />
    );
  }
}
