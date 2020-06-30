import DOMPurify from 'dompurify';
let marked = require('marked');
import TurndownService from 'turndown';
var turndownService = new TurndownService();

const renderer = {
        link(href, title, text) {
            console.log(text);
            var targetText = text;
            if(text.match('(<span.*</span>)') != null)
            {
                targetText = turndownService.turndown(text);
            }
        return `<span class='link' data-link-target='${href}' data-link-text='${targetText}'>${text}</span>`;
    }
}

marked.use({ renderer });

gon.blog_posts.map((post) => {
    console.log('post id: ' +   post.id);
    $('#post-body-' + post.id).html(DOMPurify.sanitize(marked(post.body)));
});

$('span.link').on('click', function (e){
    window.location =$(e.target).data('link-target');
})