console.log('edit_mode');

// sets target to edit mode
function editMode (target) {
    console.log('editMode')
    
    //just so we don't need to make additional requests for edit mode
    if ($(target).hasClass('editing') || $(target).parentsUntil('.text-block-container').hasClass('editing'))
    {
        console.log('early exit');
        return;
    }

    textBlock = $(target).parentsUntil('.text-block-container').find('.text-block');
    textBlockID = textBlock.attr('id').split('-')[2];
    console.log(textBlockID);
    $(textBlock).addClass('editing');
    let request = $.ajax({
        url: `/text_blocks/${textBlockID}.json`
    });
    console.log(request);
    request.done(function() {
        $(target).contents().replaceWith(`<input class="text-block-text-area" type="text" value="${request.responseJSON.body}"></input>`);
    });
    
}

function readMode (target) {
    console.log('readMode');
    console.log(target);
    if ($(target).hasClass('editing'))
    {   
        $(target).contents().replaceWith('nest');
        $(target).removeClass('editing')
    }
}

//sets everything but event.target to read mode
function toggleModes (event) {
    let { target } = event;
    console.log('toggleModes');
    console.log($('.editing'));
    console.log('toggleModes target');
    console.log($(target));
    if ($(target).hasClass('text-block'))
    {
        console.log('if');
    //then our target is the text block
    //check the container's data-selected
        //if it is our target's id
        //do nothing
        //else
        //run editMode on target
        //run readMode on everything else
        
        if ($(target).attr('id') === $(this).data('selected'))
        {
            console.log('already selected')
        }
        else
        {
            console.log('new selection')
            $(this).data('selected', $(target).attr('id'));
            editMode(target);
            $('.text-block', this).not($(target)).each(function () { readMode($(this)); });
        }
    }
    else if($(target).parentsUntil('.text-block-container').hasClass('text-block'))
    {
        console.log('else if');
    //then the text block we want is an ancestor of target
    //so we need to get that text block
        //then we do the same as above
    }
    else
    {
    //something outside of all the text blocks was clicked
    //put everything into read mode
    //set data-selected to none
        console.log('else');
        $(this).data('selected', "none");
        $('.text-block', this).each(function () { readMode($(this)); });
    }
    

    console.log($('.text-block', this).not(target));    
}

$('.text-block-container').click( toggleModes );