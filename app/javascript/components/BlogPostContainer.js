import React from "react"
import PropTypes from "prop-types"
import BlogPost from "./BlogPost"
class BlogPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogPosts: props.blogPosts, user: props.user }
  }
  render() {
    console.log(this.state.blogPosts);
    console.log(this.state.blogPosts[0].text_blocks);
    return (
      this.state.blogPosts.map((post) => { console.log(post.text_blocks); <BlogPost key={post.id} value={post} textBlocks={post.text_blocks} /> })
    );
  }
}

export default BlogPostContainer
