import React from "react"
import PropTypes from "prop-types"
import BlogPost from "./BlogPost"
class BlogPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogPosts: props.blogPosts,}
  }
  render () {
    console.log(this.state.blogPosts);
    return (
      
      this.state.blogPosts.map((post) => <BlogPost key={post.id} value={post} textBlocks={post.text_blocks}  />)
    );
  }
}

export default BlogPostContainer
