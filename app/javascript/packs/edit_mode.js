console.log('edit_mode');

function editMode (event) {
    console.log('here');
    console.log(event.target.id);
    myID = event.target.id.split('-')[2]
    $.ajax({
        url: `/text_blocks/${myID}/edit`
    })
}

$('.text-block').click( editMode );

$('.text-block-container').click()