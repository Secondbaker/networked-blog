var MarkdownField = require('./markdown_field');

class BlogPost
{
    blogPostObject;
    markdown_fields = [];

    constructor(blogPostObject)
    {
        console.log('got blog post?  ' + blogPostObject);
        this.blogPostObject = blogPostObject;
        console.log($(blogPostObject).find('.text-block'));
        var textBlocks = $(blogPostObject).find('.text-block');
        for(i = 0; i < textBlocks.length; i++)
        {
            var field = new MarkdownField(textBlocks[i]);
            this.addField(field);
        }
        this.markdown_fields.forEach(element => console.log(element));
    }
    addField(field)
    {
        this.markdown_fields.push(field);
    }

    transformField(field)
    {
        
    }
}

module.exports = BlogPost;