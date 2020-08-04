import React from "react";
import PropTypes from "prop-types";
import { BlogPostTitle, TextBlock } from "./TextArea";
const axios = require("axios").default;
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    let textBlocks = this.props.textBlocks.slice();
    textBlocks.unshift(this.props.post);
    textBlocks.push({ body: '', id: 'new' });
    textBlocks = textBlocks.map((tb) => {
      tb.selected = false;
      return tb;
    });
    this.state = {
      id: this.props.post.id,
      textBlocks: textBlocks,
      post: this.props.post,
      blogPostsPath: this.props.blogPostsPath,
      textBlocksPath: this.props.textBlocksPath,
    };
    this.textAreaRef = "";
  }

  handleClick(index) {
    let textBlocks = this.state.textBlocks.slice();
    if (Number.isInteger(index)) {
      if (textBlocks[index].selected) {
        return;
      }
      textBlocks = textBlocks.map((tb) => {
        if (tb.selected) {
          this.sendData(tb);
        }
        tb.selected = false;
        return tb;
      });
      textBlocks[index].selected = true;
    }
    this.setState({ textBlocks: textBlocks });
  }

  textBoxChange(index) {
    let textBlocks = this.state.textBlocks.slice();

    if (textBlocks[index].name) textBlocks[index].name = this.textAreaRef.value;
    else textBlocks[index].body = this.textAreaRef.value;

    this.setState({ textBlocks: textBlocks });
  }

  sendData(block) {
    const token = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

    if (isBlogPostTitle(block)) {
      let url = `${this.state.blogPostsPath}/${block.id}.json`;
      axios
        .patch(url, { blog_post: { name: block.name } })
        .then((response) => console.log(response));
    }
    else if (block.body == '') {
      console.log('found one to delete');
    }
    else if (block.id !== 'new') {
      let url = `${this.state.textBlocksPath}/${block.id}.json`;
      axios
        .patch(url, { text_block: { body: block.body } })
        .then((response) => console.log(response));
    }
    else {
      let url = `${this.state.blogPostsPath}/${this.state.id}/text_blocks/new`;
      axios
        .post(url, { text_block: { body: block.body } })
        .then((response) => {
          console.log(response);
          console.log(response.data.id);
          this.setBlockID(block, response.data.id);
          this.appendBlock();
        });

    }
  }

  setBlockID(block, id) {
    console.log('setBlockID');
    console.log(`block ${block.id} id ${id}`)
    var index = this.state.textBlocks.indexOf(block);
    console.log(index);
    block.id = id;
    console.log(block.id);
    let textBlocks = this.state.textBlocks.slice();
    textBlocks.splice(index, 1, block);
    console.log(textBlocks[index]);
    this.setState({ textBlocks: textBlocks });
  }

  appendBlock() {
    let textBlocks = this.state.textBlocks.slice();
    textBlocks.push({ body: '', selected: false, id: "new" });
    this.setState({ textBlocks: textBlocks });
  }

  render() {
    let { textBlocks, post } = this.state;

    return (
      <React.Fragment>
        {textBlocks.map((block) => {
          if (isBlogPostTitle(block))
            return (
              <BlogPostTitle
                onClick={() => this.handleClick(textBlocks.indexOf(block))}
                onChange={() => this.textBoxChange(textBlocks.indexOf(block))}
                textAreaRef={(textArea) => {
                  this.textAreaRef = textArea;
                }}
                {...block}
                key={block.id}
                editMode={block.selected}
              />
            );
          else
            return (
              <TextBlock
                onClick={() => this.handleClick(textBlocks.indexOf(block))}
                onChange={() => this.textBoxChange(textBlocks.indexOf(block))}
                textAreaRef={(textArea) => {
                  this.textAreaRef = textArea;
                }}
                {...block}
                key={block.id}
                editMode={block.selected}
              />
            );
        })}
      </React.Fragment>
    );
  }
}

function isBlogPostTitle(block) {
  return block.name;
}

export default BlogPost;
