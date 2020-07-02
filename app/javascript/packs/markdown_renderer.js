import DOMPurify from 'dompurify';
import TurndownService from 'turndown';
var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(text);


console.log('converter' + converter);


gon.blog_posts.map((post) => {
    console.log('post id: ' +   post.id);
    $('#post-body-' + post.id).html(DOMPurify.sanitize(converter.makeHtml(post.body)));
});

$('span.link').on('click', function (e){
    window.location =$(e.target).data('link-target');
})