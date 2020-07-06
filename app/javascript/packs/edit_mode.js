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
    console.log(thisBlock).id);
    $(thisBlock).addClass('editing');
    myID = thisBlock.id.split('-')[2]
    let request = $.ajax({
        url: `/text_blocks/${myID}.json`
    });
    console.log(request);
}

//sets everything but event.target to read mode
function readMode (event) {

}

$('.text-block').click( editMode );

$('.text-block-container').click()