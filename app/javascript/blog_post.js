var MarkdownField = require('./markdown_field');

class BlogPost
{
    blogPostObject;
    markdownFields = [];
    selectedField = null;

    constructor(blogPostObject)
    {
        console.log('got blog post?  ' + blogPostObject);
        this.blogPostObject = blogPostObject;
        var self = this;
        $(blogPostObject).click( { myObject: this }, this.toggleFields );
        console.log($(blogPostObject).find('.text-block'));
        var textBlocks = $(blogPostObject).find('.text-block');
        for(i = 0; i < textBlocks.length; i++)
        {
            var field = new MarkdownField(textBlocks[i]);
            this.addField(field);
        }
        this.markdownFields.forEach(element => console.log(element));
        console.log($(this));
    }
    addField(field)
    {
        this.markdownFields.push(field);
    }

    selectField(field)
    {
        console.log("selecting " + field);
        if(field === this.selectedField)
        {
            return;
        }
        if(field === null)
        {
            this.markdownFields[selectedField].readMode();
            this.selectedField = null;
        }
        else
        {
            console.log(this.selectedField);
            if(this.selectedField !== null){
                console.log("They told me it's not null");
                this.markdownFields[this.selectedField].readMode();
            }
            
            
            this.selectedField = this.markdownFields.indexOf(field);
            field.editMode();
            console.log(this.selectedField);
        }
    }
    //sets everything but event.target to read mode
    //sets the data-selected attribute to the id of the text-block which was clicked, if any
    toggleFields (event) {
        let { target, data } = event;
        console.log(data.myObject);
        if($(target).hasClass('.text-block'))
        {
            console.log("found a text-block");
            this.selectField(new MarkdownField(target));
        }
        else
        {
            console.log("found something else");
            console.log(target);
            textBlock = $(target).parentsUntil('.text-block-container').closest('.text-block')[0];
            textField = new MarkdownField(textBlock);
            console.log(textField);
            field = data.myObject.markdownFields.filter(function(markdownField){ return markdownField.field === textField.field })[0];
            data.myObject.selectField(field);
        }
    }
}

module.exports = BlogPost;