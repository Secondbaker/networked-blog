require('./markdown_field');

class BlogPost
{
    blogPostObject;
    markdown_fields = [];

    constructor(blogPostObject)
    {
        console.log('got blog post?  ' + blogPostObject);
        this.blogPostObject = blogPostObject;
    }
    addField(field)
    {
        markdown_fields.push(field);
    }

    transformField(field)
    {
        
    }
}

module.exports = BlogPost;