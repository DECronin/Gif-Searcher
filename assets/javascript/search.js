$(document).ready(function () {
    var pauseGif;
    var key = 'oZgwe4apLj3XHqjHaMm6Um0A83PrrDDI';
    var topics = ['Animals', 'Puppies', 'Kittens', 'Foxes', 'Fish', 'Snakes', 'Owls'];
    //==============================================================
    function renderButtons() {
        $("#buttons-view").empty();
        for (i = 0; i < topics.length; i++){
            var newButton = $("<button>");
            upperCase(topics[i]);
            newButton.addClass("gif-search col-5");
            newButton.attr("data-name", topics[i]);
            newButton.html(topics[i]);
            $("#buttons-view").append(newButton);
        }
    }
    function upperCase(str){ //==url/ref==//https://www.w3resource.com/javascript-exercises/javascript-function-exercise-5.php
      var array1 = str.split(' ');
      var newarray1 = [];
      for(var x = 0; x < array1.length; x++){
          newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
      }
      str = newarray1.join(' ');
      return str
    }
    function searchGifs(search){
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + search;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            pageDisplay();
            for(i=0; i < 10; i++){
                var newDiv = $("<span>");
                var newImg = $('<img>');
                newImg.attr('id', 'gif-result');
                newImg.attr('data-animate', response.data[i].images.fixed_height.url);
                newImg.attr('data-still', response.data[i].images.fixed_height_still.url);
                newImg.attr('data-state', 'still');
                newImg.attr('src', newImg.attr('data-still'));
                newDiv.append(newImg)
                newDiv.addClass("tile col-6");
                newDiv.append("<br> Rating: " + response.data[i].rating);
                newDiv.append("<br>Title: " + response.data[i].title);
                newDiv.append("<br>Source: " + response.data[i].source_tld);;
                $("#gif-view").append(newDiv);
            }
        });
    }
    function pageDisplay(){
        $("#gif-view").empty();
                                //"&limit=10&offset=0"
    }
    //==============================================================
    $("#add-search").on("click", function(event) {
        event.preventDefault();
        var temp = $("#gif-input").val();
        var search = upperCase(temp);
        if (!topics.includes(search)){
            topics.push(search);
            renderButtons();
        }
        searchGifs(search);
    });
    $(document).on("click", ".gif-search", function(){
        event.preventDefault();
        var search = $(this).attr('data-name');
        searchGifs(search);
    });
    $(document).on('click', '#gif-result', function(){
        event.preventDefault();
        var state = $(this).attr('data-state');
        switch(state){
            case 'still':
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
                break;
            case 'animate':
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
                break;
        }
    });
    //==============================================================
    pageDisplay();
    renderButtons();
});


////============================= Notes ============================////

// 10 gifs on page <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< check
 /// originally static <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< check
 /// click to make move <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< check
 /// click again to return to static <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< check
 //===// Under every gif, display its rating (PG, G, so on) <<<<<<<<<<<<<<<<<<< check

// array of topics <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< check (change later?)

// buttons pull up gifs <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< check

// input for search bar to add button to topics array <<<<<<<<<<<<<<<<<<<<<<<<< check

// style
// deploy live on github pages // portfolio and readMe

// Bonus : Mobile Responsive
//         More than 10 gif if requested (pages w/ 10 gifs at a time) ~~~~~~~~~~~ var page //pull to display gifs prevPage#()*10 through thisPage#()*10
//         List additional metadata (title, tags, etc) for each gif in a clean and readable format <<<<<< check >>>>>>>
//         Allow users to add their favorite gifs to a favorites section (((((look into cookies)))))