require('./markdown_field');

class BlogPost
{
    markdown_fields = [];

    addField(field)
    {
        markdown_fields.push(field);
    }

    transformField(field)
    {
        
    }
}