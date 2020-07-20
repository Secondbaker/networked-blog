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
        console.log("Going to readMode()");
    }
    editMode()
    {
        console.log("Going to editMode()");
    }
    isReadMode()
    {
        return !this.editing;
    }
    isEditingMode()
    {
        return this.editing;
    }
    transform()
    {
        console.log("transforming");
    }
}

module.exports = MarkdownField;