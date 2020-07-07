import DOMPurify from 'dompurify';
var showdown = require('showdown'),
    converter = new showdown.Converter(),
    text = '# hello, markdown!',
    html = converter.makeHtml(text);

//#region  Setup

//Yay global timeout variable
let timeout = 0;

//Set custom expressions for the markdown converter
//This technically isn't needed right now, but I think it will be
var customExpressions = function () {
    var internalLink = {
        type: 'lang',
        filter: function (text, converter) {
            text = text.replace(/\[\[\{\"name\"\:\"(.*)\"\,\"id\"\:(.*)\}\]\]/g, `[$1](/text_blocks/$2)`);
            return text;
        }
    };
    return [internalLink];
}

//Yay global converter
var converter;

//So we don't need to get the csrf token for every single ajax request
$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

//#endregion Setup

//#region Functions

function autoSend() {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    console.log('keypress');
    console.log($(this).val());
    let text = $(this).val();
    let target = $(this).parentsUntil('.text-block-container').find('.text-block')
    timeout = setTimeout( sendText(text, target), 3000)
}

function sendText (text, textBlock) {
    console.log('sendText');
    console.log(text);
    console.log(textBlock);
    let textBlockID = $(textBlock).attr('id').split('-')[2];
    console.log(textBlockID)
    let request = $.ajax({
        method: 'PATCH',
        url: `text_blocks/${textBlockID}`,
        data: {text_block: {body: text}},
        dataType: 'JSON'
    });
}
// sets target to edit mode
function editMode (target) {
    console.log('editMode')
    
    //just so we don't need to make additional requests for edit mode
    if ($(target).hasClass('editing') || $(target).parentsUntil('.text-block-container').hasClass('editing'))
    {
        console.log('early exit');
        return;
    }

    console.log($(target).attr('id').split('-')[2]);
    let textBlockID = $(target).attr('id').split('-')[2];
    console.log(textBlockID);
    $(target).addClass('editing');
    let request = $.ajax({
        url: `/text_blocks/${textBlockID}.json`
    });
    console.log(request);
    request.done(function() {
        $(target).contents().replaceWith(`<textarea class="text-block-text-area">${request.responseJSON.body}</textarea>`);
        $('textarea.text-block-text-area').focus();
        $('textarea.text-block-text-area').keyup( autoSend );
    });
    
}

function readyDisplay (target) {
    var text = $(target).find('.text-block-text-area').text();
    console.log(text.replace('t', 'm'));
    
    let contents = $(target).contents();
    console.log($(contents));
    $(contents).replaceWith(`<div class='text-block-text-area'>${DOMPurify.sanitize(converter.makeHtml(text))}</div>`);
}

function readMode (target) {
    console.log('readMode');
    console.log(target);
    if ($(target).hasClass('editing'))
    {   
        let text = $(target).find('.text-block-text-area').val();
        sendText(text, target);
        $(target).contents().replaceWith(`<div class='text-block-text-area'>${DOMPurify.sanitize(converter.makeHtml(text))}</div>`);
        $(target).removeClass('editing')
    }
}

//sets everything but event.target to read mode
function toggleModes (event) {
    let { target } = event;
    //The target might be a text-block, or the child of a text-block, or the text-block-container
    if ($(target).hasClass('text-block'))
    {
        if ($(target).attr('id') !== $(this).data('selected'))
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
        console.log($(target).parentsUntil('.text-block-container').find('.text-block'));
        let targetBlock = $(target).parentsUntil('.text-block-container').find('.text-block')[0];
        console.log(targetBlock);

        if ($(targetBlock).attr('id') === $(this).data('selected'))
        {
            console.log('already selected')
        }
        else
        {
            console.log('new selection')
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
        console.log('else');
        $(this).data('selected', "none");
        $('.text-block', this).each(function () { readMode($(this)); });
    }      
}

//#endregion

//#region attaching functions
//We put this on the container
//The container isn't replaced, but its contents are
//Because the container isn't replaced, we only need to attach this once
$('.text-block-container').click( toggleModes );

//since our text is raw markdown, we need to convert it
converter = new showdown.Converter({ extensions: [customExpressions] });
$('.text-block').each(function () { readyDisplay($(this)); });

//#endregion