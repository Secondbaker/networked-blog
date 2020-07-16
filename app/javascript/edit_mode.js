import DOMPurify from 'dompurify';
import Converter from './markdown_renderer';
var autosize = require ('autosize');
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

    let splitString = $(textBlock).attr('id').split('-');
    let ID = splitString[2];
    console.log(ID);

    let type = [splitString[0], splitString[1]].join('_');

    //TODO it doesn't feel right that this function looks at the string
    //and figures out the same thing that editMode does in basically the same way
    //but right now if I change anything I have to remember to update both
    if(type === "text_block")
    {
        sendTextBlock(text, ID);
    }

    else if(type === "blog_post")
    {
        sendName(text, ID);
    }
    
    //TODO?  Add error handling if the server can't accept the edit right now
}

//Sends a TextBlock to the server
function sendTextBlock(text, ID)
{
    if(ID === "creator")
    {
        return $.ajax({
            method: 'POST',
            url: `/text_blocks/`,
            data: { text_block: { body: text } },
            dataType: 'JSON'
        });
    }
    else
    {
        return $.ajax({
            method: 'PATCH',
            url: `/text_blocks/${ID}`,
            data: { text_block: { body: text } },
            dataType: 'JSON'
        });
    }
}

//Sends a BlogPost#name to the server
function sendName(text, ID)
{
    return $.ajax({
        method: 'PATCH',
        url: `/blog_posts/${ID}`,
        data: { blog_post: { name: text } },
        dataType: 'JSON'
    });
}
// sets target to edit mode
async function editMode (target) {
    
    //just so we don't need to make additional requests for edit mode
    if ($(target).hasClass('editing') || $(target).parentsUntil('.text-block-container').hasClass('editing'))
    {
        return;
    }

    let splitID = $(target).attr('id').split('-');
    let type = [splitID[0], splitID[1]].join('_') + 's';
    let ID = splitID[2];

    let height = $(target).height();
    let width = $(target).width();
    
    $(target).addClass('editing');
    let dataLocation;
    if(type === "text_blocks")
    {
        dataLocation = 'body';
    }
    else if (type == "blog_posts")
    {
        dataLocation = 'name';
    }

    let replacementString = "...";
    if (ID !== "creator") {
        replacementString = await getInfo(ID, type, dataLocation);
    }

    //the id of textBlock should look like
        //text-block-{id}
    
    $(target).html(`<textarea class="text-block-text-area">${replacementString}</textarea>`);
    
    var textArea = $('textarea.text-block-text-area');
    textArea.focus();
    autosize(textArea);
    //setting the focus puts the cursor into the textarea
    //TODO? make it so the cursor goes exactly where the user clicks
    textArea.keyup(autoSend);
    textArea.keyup(function () { autosize(textArea) });
    textArea.keydown(textTravel);
}

function textTravel()
{
    console.log('textTravel');
    console.log(event);
    console.log(this.selectionStart);
    console.log()
    //down arrow
    if (event.keyCode === 40 && $(this).val().length == this.selectionStart) {
		console.log('move down');
	}
	//up arrow
	else if (event.keyCode === 38 && this.selectionStart == 0) {
		console.log('move up');
	}
}
function getLineNumber(textarea) {
	return textarea.value.substr(0, textarea.selectionStart).split('\n').length;
}


//Given:  ID of an object, its type, and a location to get data from (eg. body, head)
//Returns:  a string containing the information in that location
//Behavior on failed transaction is undefined.
async function getInfo(ID, type, dataLocation)
{
    var resultString = "test";
    let request = await $.ajax({
        url: `/${type}/${ID}.json`
    }).done(function(request) {
        return request[dataLocation];
    });

    resultString = request[dataLocation];

    return resultString;
    //TODO? add error handling for request 
}

//To be triggered once for each TextBlock when it is first rendered
//Parses the markdown into HTML
function readyDisplay (target) {
    //to make sure this is only fired once per object
    if(!$(target).hasClass('ready'))
    {
        
        let text = $(target).find('.text-block-text-area').text().trim();
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