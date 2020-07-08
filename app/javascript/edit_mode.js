import DOMPurify from 'dompurify';
import Converter from './markdown_renderer';
var converter = Converter();

//#region Setup

//Yay global timeout variable
let timeout = 0;

//So we don't need to get the csrf token for every single ajax request
$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

//#endregion Setup

//#region Functions

//After keypresses, waits 3 seconds then triggers sendText if there are no more keypresses
function autoSend() {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    let text = $(this).val();
    let target = $(this).closest('.text-block');
    timeout = setTimeout( sendText(text, target), 3000);
}

//Triggers the edit method of text_blocks_controller through ajax
function sendText (text, textBlock) {
    //the id of textBlock should look like
        //text-block-{id}
    let textBlockID = $(textBlock).attr('id').split('-')[2];
    console.log(textBlockID);
    let request = $.ajax({
        method: 'PATCH',
        url: `/text_blocks/${textBlockID}`,
        data: {text_block: {body: text}},
        dataType: 'JSON'
    });
    //TODO?  Add error handling if the server can't accept the edit right now
}
// sets target to edit mode
function editMode (target) {
    
    //just so we don't need to make additional requests for edit mode
    if ($(target).hasClass('editing') || $(target).parentsUntil('.text-block-container').hasClass('editing'))
    {
        return;
    }

    //the id of textBlock should look like
        //text-block-{id}
    let textBlockID = $(target).attr('id').split('-')[2];
    $(target).addClass('editing');
    let request = $.ajax({
        url: `/text_blocks/${textBlockID}.json`
    });
    request.done(function() {
        $(target).html(`<textarea class="text-block-text-area">${request.responseJSON.body}</textarea>`);
        $('textarea.text-block-text-area').focus();
        //setting the focus puts the cursor into the textarea
        //TODO? make it so the cursor goes exactly where the user clicks
        $('textarea.text-block-text-area').keyup( autoSend );
    });
    //TODO? add error handling for request    
}

//To be triggered once for each TextBlock when it is first rendered
//Parses the markdown into HTML
function readyDisplay (target) {
    //to make sure this is only fired once per object
    if(!$(target).hasClass('ready'))
    {
        
        let text = $(target).find('.text-block-text-area').text();
        console.log(text);
        $(target).html(`<div class='text-block-text-area'>${DOMPurify.sanitize(converter.makeHtml(text))}</div>`);
        $(target).removeClass('ready')
    }
}

//Switches target from editing mode to read mode
//If target is not in editing mode (does not have class editing)
    //does nothing
function readMode (target) {
    if ($(target).hasClass('editing'))
    {   
        let text = $(target).find('.text-block-text-area').val();
        sendText(text, target);
        $(target).html(`<div class='text-block-text-area'>${DOMPurify.sanitize(converter.makeHtml(text))}</div>`);
        $(target).removeClass('editing')
    }
}

//sets everything but event.target to read mode
//sets the data-selected attribute to the id of the text-block which was clicked, if any
function toggleModes (event) {
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

//#endregion

//#region Attaching functions
//We put this on the container
//The container isn't replaced, but its contents are
//Because the container isn't replaced, we only need to attach this once
$('.text-block-container').click( toggleModes );

//since our text is raw markdown, we need to convert it
$('.text-block').each(function () { readyDisplay($(this)); });

//#endregion