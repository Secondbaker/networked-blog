import DOMPurify from 'dompurify';
import TurndownService from 'turndown';
var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(text);

    var customExpressions = function () {
        var internalLink = {
          type: 'lang',
          regex: /\[\[.*\]\]/g,
          replace: 'showdown'
        };
        return [internalLink];
      }

converter = new showdown.Converter({ extensions: [customExpressions]})


gon.blog_posts.map((post) => {
    console.log('post id: ' +   post.id);
    $('#post-body-' + post.id).html(DOMPurify.sanitize(converter.makeHtml(post.body)));
});

$('span.link').on('click', function (e){
    window.location =$(e.target).data('link-target');
})