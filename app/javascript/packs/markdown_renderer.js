import DOMPurify from 'dompurify';
let marked = require('marked');

gon.blog_posts.map((post) => {
    console.log(marked(post.body));
});