import React from "react"
import PropTypes from "prop-types"
import BlogPost from "./BlogPost"
class BlogPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogPosts: props.blogPosts,
    textBlocks: props.textBlocks, }
  }
  render () {
    console.log(this.state.blogPosts);
    console.log(this.state.textBlocks);
    return (
      
      this.state.blogPosts.map((post) => <BlogPost key={post.id} value={JSON.stringify(post)} textBlocks={this.state.textBlocks.filter((block) => block.blog_post_id === post.id).map((block) => JSON.stringify(block))}  />)
    );
  }
}

export default BlogPostContainer
