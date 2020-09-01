import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";
class TextArea extends React.Component {
  constructor(props) {
    super(props);
    let { editMode, body } = this.props;
    this.state = {
      editMode: editMode,
      body: body,
    };
  }

  handleChange = () => {
    this.setState({
      body: event.target.value,
    });
  };

  render() {
    let body;
    if (this.props.editMode) {
      body = (
        <TextareaAutosize
          className="text-block-text-area"
          defaultValue={this.props.body}
          onChange={this.props.onChange}
          ref={this.props.textAreaRef}
        />
      );
    } else {
      body = this.props.body;
    }
    return (
      <React.Fragment>
        <p onClick={() => this.props.onClick()}>{body}</p>
      </React.Fragment>
    );
  }
}

export class BlogPostTitle extends TextArea {
  render() {
    //console.log("here");
    return (
      <TextArea
        body={this.props.name}
        editMode={this.props.editMode}
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        textAreaRef={this.props.textAreaRef}
      />
    );
  }
}

export class TextBlock extends TextArea {
  render() {
    return (
      <TextArea
        body={this.props.body}
        editMode={this.props.editMode}
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        textAreaRef={this.props.textAreaRef}
      />
    );
  }
}
