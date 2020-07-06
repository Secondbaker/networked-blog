console.log('edit_mode');

$('.text-block').click( function (event) {
        console.log('here');
        console.log(event.target.id);
        myID = event.target.id.split('-')[2]
        $.ajax( { 
            url: `/text_blocks/${myID}/edit` 
        })
    }
);