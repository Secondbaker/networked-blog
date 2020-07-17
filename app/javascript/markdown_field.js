class MarkdownField
{
    field;
    editing = false;
    constructor(field)
    {
        this.field = field;
    }
    readMode()
    {

    }
    editMode()
    {
        
    }
    isReadMode()
    {
        return !this.editing;
    }
    isEditingMode()
    {
        return this.editing;
    }
    
}

module.exports = MarkdownField;