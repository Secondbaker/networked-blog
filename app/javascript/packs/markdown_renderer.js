import DOMPurify from 'dompurify';
let marked = require('marked');

const renderer = {
        link(href, title, text) {
        console.log(text);
        return `<span>${text}</span>`;
    }
}

marked.use({ renderer });

gon.blog_posts.map((post) => {
    document.getElementById('post-body-' + post.id).innerHTML = DOMPurify.sanitize(marked(post.body));
});

