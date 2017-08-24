

$(document).ready(function() {
    $("#form-gif-request").submit(fetchAndDisplayGif);
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    event.preventDefault();

    var searchQuery = $('#form-gif-request input').val();
    var params = {
        api_key: config.GIPHY_KEY,
        tag : "jackson 5 " + searchQuery
    };

    $.ajax({
        url: "http://api.giphy.com/v1/gifs/random",
        data: params,

        success: function(response) {
            $('#gif').attr('src', response.data.image_url);
            setGifLoadedStatus(true);
        },
        error: function() {
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // TODO
    // give the user a "Loading..." message while they wait

}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
