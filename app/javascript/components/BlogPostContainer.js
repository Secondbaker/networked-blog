import React from "react"
import PropTypes from "prop-types"
import BlogPost from "./BlogPost"
class BlogPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogPosts: props.blogPosts }
  }
  render () {
    return (
      this.state.blogPosts.map((post) => <BlogPost key={post.id} value={JSON.stringify(post)} />)
    );
  }
}

export default BlogPostContainer
