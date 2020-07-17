var MarkdownField = require('./markdown_field');

class BlogPost
{
    blogPostObject;
    markdown_fields = [];

    constructor(blogPostObject)
    {
        console.log('got blog post?  ' + blogPostObject);
        this.blogPostObject = blogPostObject;
        $(blogPostObject).click( this.toggleModes );
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

    selectField(field)
    {
        
    }
    //sets everything but event.target to read mode
    //sets the data-selected attribute to the id of the text-block which was clicked, if any
    toggleModes (event) {
        let { target } = event;
        //The target might be a text-block, or the child of a text-block, or the text-block-container
        if ($(target).hasClass('text-block'))
        {
            if ($(target).attr('id') !== $(this).data('selected'))
            {
                $(this).data('selected', $(target).attr('id'));
                editMode(target);
                $('.text-block', this).not($(target)).each(function () { readMode($(this)); });
            }
        }
        else if($(target).parentsUntil('.text-block-container').hasClass('text-block'))
        {
        //the text block we want is an ancestor of target
        //so we need to get that text block
        //then we do the same as above
            var targetBlock = $(target).closest('.text-block');
            if ($(targetBlock).attr('id') !== $(this).data('selected'))
            {
                $(this).data('selected', $(targetBlock).attr('id'));
                editMode(targetBlock);
                $('.text-block', this).not($(targetBlock)).each(function () { readMode($(this)); });
            }
        }
        else //text-block-container
        {
        //something outside of all the text blocks was clicked
        //put everything into read mode
        //set data-selected to none
            $(this).data('selected', "none");
            $('.text-block', this).each(function () { readMode($(this)); });
        }      
    }
}

module.exports = BlogPost;