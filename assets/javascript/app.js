$(document).ready(function () {

    var topics = ["thor", "wolverine", "deadpool", "wonder woman", "black widow", "iron man",
        "ant-man", "wasp", "gamora", "captain america"]
    var meme;


    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-secondary");
        button.text(topics[i]);
        button.attr("data-meme", topics[i]);
        $("#memeButtons").append(button);
    }

    $("#addMeme").on("click", function (event) {

        event.preventDefault();
        var inputMeme = $("#meme-input").val().trim();

        var newButton = $("<button>");
        newButton.addClass("btn btn-secondary");
        newButton.text(inputMeme);
        newButton.attr("data-meme", inputMeme);
        $("#memeButtons").append(newButton);
    })

    $("#memeButtons").on("click", "button", function () {
        $("#gifsHere").empty();
        meme = $(this).attr("data-meme");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + meme + "&api_key=Vy040QI14DAORV5J3eOzg1T0oD4QE8M3&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var memeDiv = $("<div>");
                    memeDiv.addClass("memeDiv");
                    var rating = $("<p>").text("Rating: " + results[i].rating);
                    var memeImage = $("<img>");
                    memeImage.addClass("gif");
                    
                    
                    memeImage.attr("src", results[i].images.fixed_height_still.url);
                    memeImage.attr("data-still", results[i].images.fixed_height_still.url);
                    memeImage.attr("data-animate", results[i].images.fixed_height.url);
                    memeImage.attr("data-state", "still")
                    memeDiv.append(rating);
                    memeDiv.append(memeImage);
                    $("#gifsHere").append(memeDiv);
                }

               
                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                })

            })
    })
});
