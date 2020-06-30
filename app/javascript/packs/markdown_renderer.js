import DOMPurify from 'dompurify';
let marked = require('marked');

gon.blog_posts.map((post) => {
    console.log(DOMPurify.sanitize(marked(post.body)));
});