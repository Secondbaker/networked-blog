import DOMPurify from 'dompurify';
let marked = require('marked');

const renderer = {
        link(href, title, text) {
        return `<span class='link' data-link-target='test.com' data-link-text='test'>${text}</span>`;
    }
}

marked.use({ renderer });

gon.blog_posts.map((post) => {
    document.getElementById('post-body-' + post.id).innerHTML = DOMPurify.sanitize(marked(post.body));
});

console.log($('span.link'));
$('span.link').each(function (index){
    console.log($(this).children());
    if ($(this).children().length == 0)
    {
        console.log('no one');
    }
})

