//Create initial array of sports
var topic = ["Obama", "Trump", "Olympics"];


$(document).ready(function () {


    //Event listener that pushes user input into array and creates an associated button

    $("body").on("click", "#add-topic", function (event) {
        event.preventDefault();

        var topicInput = $("#topic-input").val().trim();

        if (topicInput != "") {

            topic.push(topicInput);

            $("#topic-input").val("");

            renderButtons();

        } else {
            // Get the modal
            var modal = document.getElementById('myModal');

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }

    });

    //Puts buttons on the page from the array of sports
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topic.length; i++) {

            var btn = $("<button>");

            btn.addClass("topic-btn btn btn-success");

            btn.attr("data-topic", topic[i]);

            btn.text(topic[i]);

            $("#buttons-view").append(btn);
        };
    };

    //Calls the function
    renderButtons();



});



    //Event listener to trigger the AJAX request
    $("body").on("click", ".topic-btn", function () {
        var choiceTopic = $(this).attr("data-topic");
        
        var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2&q=" + choiceTopic;

        var nytIndex = 0;
        var nytTotalReadTime = 0;
    
    
        $.ajax({
            url: nytQueryURL,
            method: 'GET'
        }).then(function (input) {
    
            function displayNYTArticles() {
    
            var nytResults = input.response.docs;
    
            var nytWordcount = nytResults[nytIndex].word_count;
            // console.log("nytWordcount: " + nytWordcount);
    
            var nytReadTime = Math.round(nytWordcount/250);
            // console.log ("nytReadTime: " + nytReadTime);
    
            if (nytReadTime < 1 || nytReadTime > 10) {
                nytIndex++;
                displayNYTArticles();
                return;
            }
    
            var nytHeadline = nytResults[nytIndex].headline.main;
            // console.log(nytHeadline);
    
            var nytLink = nytResults[nytIndex].web_url;
    
            nytTotalReadTime += nytReadTime;
            
            if (nytTotalReadTime <= 25) {
                nytIndex++;
                displayNYTArticles();
            } else {
                nytTotalReadTime -= nytReadTime
                return;
            }
    
            var nytArticleText = $("<div>").attr("class", "nytSection");
    
            var nytHeadlineText = $("<p>").html("<a href='" + nytLink + "'>" + nytHeadline + "</a>");
    
            var nytReadTimeText = 
            $("<p>").text("Estimated read time: " + nytReadTime + " min");
    
            nytArticleText.append(nytHeadlineText, nytReadTimeText);
    
            $("#nyt").append(nytArticleText);
    
            // console.log("Total NYT read time =" + nytTotalReadTime)
            // console.log("NYT index: " + nytIndex);
    
            
    
        }
    
            displayNYTArticles();
            $("#nyt").append("Total read time: " + nytTotalReadTime + "min");
    
        });
    
    
        var guardQueryURL = "https://content.guardianapis.com/search?q=" + choiceTopic + "&show-fields=all&page-size=200&api-key=ee30fe53-cc69-4403-802d-998ba44e8fa7";
    
        var guardIndex = 0;
        var guardTotalReadTime = 0;
    
        $.ajax({
            url: guardQueryURL,
            method: 'GET'
        }).then(function (input) {
    
            function displayGuardArticles() {
            
            var guardResults = input.response.results;
    
            var guardWordcount = guardResults[guardIndex].fields.wordcount;
            // console.log(guardWordcount);
    
            var guardReadTime = Math.round(guardWordcount/250);
            // console.log (guardReadTime);
            
            if (guardReadTime < 5 || guardReadTime > 10) {
                guardIndex++; 
                displayGuardArticles();
                return;
            }
    
            var guardHeadline = guardResults[guardIndex].webTitle;
            // console.log(guardHeadline);
    
            var guardLink = guardResults[guardIndex].webUrl;
    
            guardTotalReadTime += guardReadTime;
    
            if (guardTotalReadTime <= 25) {
                guardIndex++;
                displayGuardArticles();
            } else {
                guardTotalReadTime -= guardReadTime
                return;
            }
    
            var guardArticleText = $("<div>").attr("class", "guardSection");
    
            var guardHeadlineText = $("<p>").html("<a href='" + guardLink + "'>" + guardHeadline + "</a>");
    
            // console.log("headline + link =" + guardHeadlineText)
    
            var guardReadTimeText = 
            $("<p>").text("Estimated read time: " + guardReadTime + " min");
    
            guardArticleText.append(guardHeadlineText, guardReadTimeText);
    
            $("#guardian").append(guardArticleText);
    
            // console.log("Total read time =" + guardTotalReadTime)
            // console.log("Guard index: " + guardIndex);
            }
    
            displayGuardArticles();
            $("#guardian").append("Total read time: " + guardTotalReadTime + "min");
    
    
            });

            console.log(nytQueryURL, guardQueryURL);






    });




