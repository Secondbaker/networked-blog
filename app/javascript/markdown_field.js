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
        if(!this.editing)
            return;
        console.log("Going to readMode()");
        this.editing = false;
    }
    editMode()
    {
        console.log(this.editing);
        if(this.editing)
            return;
        console.log("Going to editMode()");
        this.editing = true;
        console.log(this.editing);
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