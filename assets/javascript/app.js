$(document).ready(function() {
    //array of topics to create buttons
    var topics = ["Orlando City", "Manchester United", "Barcelona FC", "Real Madrid", "Bayern Munich", "Chelsea FC", "West Ham United", "Arsenal", "Borussia Dortmund", "Liverpool FC", "River Plate", "Tottenham"];



    //create initial buttons
    createButtons();

    //on click event for the submit button
    $("#addClub").on('click', function() {
        event.preventDefault();
        //get the input and push it to the topics array
        var inputValue = $('#club-input').val();
        topics.push(inputValue);
        //empty the buttons before reloading them
        $("#clubButtons").empty();
        //recreate the buttons with the new values
        createButtons();
        //clear the input field after submit
        // $("form").trigger("reset");
    });





    //on click event to generate gifs
    $('#clubButtons').on('click', '.actualButtons', function() {
        //clear gifs before loading more:
        $("#clubs").empty();

        //assigning the value of the button to a variable
        var club = $(this).attr("data-club");

        // creating the giphy URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            club + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                // results stored to an array that we can loop through
                var results = response.data;
                //limiting results to 10
                for (var i = 0; i < 10; i++) {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    //getting the rating
                    var rating = results[i].rating;

                    // ptag for the rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var clubGif = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    clubGif.addClass("gif");
                    clubGif.attr("src", results[i].images.fixed_height.url);
                    clubGif.attr("data-state", "animate");
                    clubGif.attr("data-animate", results[i].images.fixed_height.url);
                    clubGif.attr("data-still", results[i].images.fixed_height_still.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(clubGif);

                    // finally prepending the gif to the main div
                    $("#clubs").prepend(gifDiv);
                }
            });
    });


    //stop and start gifs on click
    //******this doesn't fire at all, can't figure out why******
        $('#clubs').on('click', '.gif', function() {
        //The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });





    //function to create buttons
    function createButtons() {
        //empty the buttons div before creating them!
        for (i = 0; i < topics.length; i++) {
            var newButton = $('<button>');
            newButton.html(topics[i]);
            newButton.addClass("actualButtons")
            newButton.addClass("btn")
            newButton.attr("data-club", topics[i]);
            $("#clubButtons").append(newButton);
            $("#clubButtons").append("&nbsp; &nbsp;");
        }
    }
});
