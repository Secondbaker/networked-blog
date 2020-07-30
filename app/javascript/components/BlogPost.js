import React from "react"
import PropTypes from "prop-types"
import { BlogPostTitle, TextBlock } from './TextArea'
const axios = require('axios').default
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    let textBlocks = this.props.textBlocks.slice();
    textBlocks.unshift(this.props.post);
    textBlocks = textBlocks.map((tb) => {
      tb.selected = false;
      return tb;});
    this.state = { textBlocks: textBlocks,
                  post: this.props.post,
                  blogPostsPath: this.props.blogPostsPath,
                  textBlocksPath: this.props.textBlocksPath
                };
    console.log(this.state.textBlocks.map((tb) => {
      if(tb.name)
        return tb.name;
      else
        return 'no name';
    }));
    console.log(this.props);
    console.log(this.state);
    this.textAreaRef = '';
  }
  handleClick(index) {

    let textBlocks = this.state.textBlocks.slice();
    if(Number.isInteger(index))
    {
      if(textBlocks[index].selected)
      {
        return;
      }

      textBlocks = textBlocks.map((tb) => {
        if(tb.selected)
        {
          this.sendData(tb);
        }
        tb.selected = false;
        return tb;
      })
      textBlocks[index].selected = true;
    }
    
    this.setState({
      textBlocks: textBlocks
    });
    console.log(index);
  }
  textBoxChange(index){
    console.log('textboxchange');
    console.log(index);
    let textBlocks = this.state.textBlocks.slice();
    textBlocks[index].body = this.textAreaRef.value;
    this.setState({textBlocks: textBlocks});
    console.log(this.textAreaRef.value);
  }
  sendData(block)
  {
    if(isBlogPostTitle(block))
      console.log('found title');
    else
    {
      console.log('found block');
      console.log(block);
      //update db
      

    }
  }
  render () {
    let {textBlocks, post} = this.state;
    
    
    return (
      
      <React.Fragment>
        
        {textBlocks.map((block) => {
          if(block.name)
            return <BlogPostTitle onClick={() => this.handleClick(textBlocks.indexOf(block))} onChange={() => this.textBoxChange(textBlocks.indexOf(block))} textAreaRef={(textArea) => { this.textAreaRef = textArea }} {...block} key={block.id} editMode={block.selected} />
          else
            return <TextBlock onClick={() => this.handleClick(textBlocks.indexOf(block))} onChange={() => this.textBoxChange(textBlocks.indexOf(block))} textAreaRef={(textArea) => { this.textAreaRef = textArea }} {...block} key={block.id} editMode={block.selected} />
          }) 
        }
      </React.Fragment>
    );
  }
}

function isBlogPostTitle(block)
{
  return block.name;
}

export default BlogPost
