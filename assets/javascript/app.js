var shows = ["Daria", "Doug", "Pogs", "Trapperkeepers", "Saved By The Bell", "teen angst", "fanny packs"];


function makeButtons() {
    // deletes the shows prior to adding new shows so there are no repeat buttons
    $("#buttonPlayground").empty();

    for (var i = 0; i < shows.length; i++) {
        var gifButton = $('<button>');
        gifButton.addClass('show');
        gifButton.attr('data-show', shows[i]);
        gifButton.text(shows[i]);
        $('#buttonPlayground').append(gifButton);

    }
}

console.log(shows);

$('#addShow').on("click", function () {
    var show = $('#show-input').val().trim();
    shows.push(show);
    makeButtons();
    return false;
})



function displayGifs() {
    var searchTerm = $(this).attr("data-show");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=5UcYwKOoeOpDdLZqF2NjqJMAoWQ26VCL&limit=5";

    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        console.log(response.data);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            //create div to strore results
            var gifDiv = $('<div id="gifs">');
            var gifImg = $('<img>');
            gifImg.attr('src', results[i].images.fixed_height_still.url);

            gifDiv.append(gifImg);
            $("#gifPlayground").prepend(gifDiv);
        }

    })
}
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this))
    }
})

$(document).on("click", ".show", displayGifs); makeButtons();