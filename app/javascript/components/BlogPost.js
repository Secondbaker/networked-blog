import React from "react"
import PropTypes from "prop-types"
import { TextArea, BlogPostTitle, TextBlock } from './TextArea'
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
                };
    console.log(this.state.textBlocks.map((tb) => {
      if(tb.name)
        return tb.name;
      else
        return 'no name';
    }));
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
  render () {
    let {textBlocks, post} = this.state;
    
    
    return (
      
      <React.Fragment>
        
        {textBlocks.map((block) => {
          if(block.name)
            return <BlogPostTitle onClick={() => this.handleClick(textBlocks.indexOf(block))} {...block} key={block.id} editMode={block.selected} />
          else
            return <TextBlock onClick={() => this.handleClick(textBlocks.indexOf(block))} {...block} key={block.id} editMode={block.selected} />
          }) 
        }
      </React.Fragment>
    );
  }
}

export default BlogPost
