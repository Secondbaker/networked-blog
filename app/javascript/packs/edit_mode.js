console.log('edit_mode');

// sets event.target to edit mode
function editMode (event) {
    thisBlock = event.target
    
    //just so we don't need to make additional requests for edit mode
    if ($(thisBlock).hasClass('editing'))
    {
        return;
    }
    console.log('here');
    console.log(event.target.id);
    $(event.target).addClass('editing');
    myID = event.target.id.split('-')[2]
    $.ajax({
        url: `/text_blocks/${myID}/edit`
    })
}

//sets everything but event.target to read mode
function readMode (event) {

}

$('.text-block').click( editMode );

$('.text-block-container').click()