console.log('edit_mode');

// sets target to edit mode
function editMode (target) {
    console.log('editMode')
    thisBlock = target
    
    //just so we don't need to make additional requests for edit mode
    if ($(thisBlock).hasClass('editing'))
    {
        return;
    }

    console.log(thisBlock.id);
    $(thisBlock).addClass('editing');
    myID = thisBlock.id.split('-')[2];
    let request = $.ajax({
        url: `/text_blocks/${myID}.json`
    });
    console.log(request);
    $(thisBlock).contents().replaceWith('test');
}

function readMode (target) {
    console.log('readMode');

    console.log(target);
}

//sets everything but event.target to read mode
function toggleModes (event) {
    let { target } = event;
    console.log('toggleModes');
    console.log($('.editing'));
    console.log('readMode target');
    console.log($(target));

    if($(target).hasClass('text-block'))
    {
        editMode (target);
    }
    
    console.log($('.text-block', this).not(target));

    $('.text-block', this).not(target).map(readMode(this))
}

$('.text-block-container').click( toggleModes )