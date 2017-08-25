

$(document).ready(function() {
    $("#form-gif-request").submit(validateForm);
});


function clearPreviousValidation() {
  $('#gif-well').attr('hidden', true);
  $('#gif').prop('src', "");
  $("#feedback").text("");
  $('#validation').removeClass('has-error');
  $('#error').remove();
}


function addErrorAlert() {
  var errorAlert = '<div class="row">' +
        '<div class="col-sm-6 col-sm-offset-3">' +
          '<div id="error" class="alert alert-danger alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
            '<span class="sr-only">Error:</span> No gifs for you!' +
          '</div>' +
        '</div>' +
      '</div>';

  $('button').after(errorAlert);
}

function validateForm(event) {
  event.preventDefault();
  clearPreviousValidation();

  if ($('#valid-jacksons').val() == 5) {
    $('#gif-well').attr('hidden', false);
    fetchAndDisplayGif(event);
  } else {
    $('#validation').addClass('has-error');
    addErrorAlert();
  }
}


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    var searchQuery = $('#tag').val();
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

    do {
      $("#feedback").text("Loading...");
      setGifLoadedStatus(false);
    } while ( $('#gif').prop( "src" ) == "" );
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
