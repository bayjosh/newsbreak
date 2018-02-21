    
    //
    
    var searchTerm = 

    var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2&q=" + searchTerm;

    var nytIndex = 0;
    var nytTotalReadTime = 0;


    $.ajax({
        url: nytQueryURL,
        method: 'GET'
    }).then(function (input) {

        function displayNYTArticles() {

        var nytResults = input.response.docs;

        var nytWordcount = nytResults[nytIndex].word_count;
        console.log("nytWordcount: " + nytWordcount);

        var nytReadTime = Math.round(nytWordcount/250);
        console.log ("nytReadTime: " + nytReadTime);

        // if (nytReadTime < 1) {
        //     nytIndex++;
        //     displayNYTArticles();
        // }


        var nytArticleText = $("<div>").attr("class", "nytSection");
        
        var nytHeadline = nytResults[nytIndex].headline.main;

        console.log(nytHeadline);

        var nytHeadlineText = $("<p>").text(nytHeadline);
        
        nytTotalReadTime += nytReadTime;

        var nytReadTimeText = 
        $("<p>").text("Estimated read time: " + nytReadTime + " min");

        nytArticleText.append(nytHeadlineText, nytReadTimeText);

        $("#nyt").append(nytArticleText);

        console.log("Total NYT read time =" + nytTotalReadTime)
        console.log("NYT index: " + nytIndex);

        if (nytTotalReadTime < 25) {
            nytIndex++;
            displayNYTArticles();
        } else {
            return;
        }

    }

        displayNYTArticles();
        $("#nyt").append("Total read time: " + nytTotalReadTime + "min");

    });


    var guardQueryURL = "https://content.guardianapis.com/search?q=trump&show-fields=all&page-size=50&api-key=ee30fe53-cc69-4403-802d-998ba44e8fa7";

    var guardIndex = 0;
    var guardTotalReadTime = 0;

    $.ajax({
        url: guardQueryURL,
        method: 'GET'
    }).then(function (input) {

        function displayGuardArticles() {
        
        var guardResults = input.response.results;

        var guardWordcount = guardResults[guardIndex].fields.wordcount;
        console.log(guardWordcount);

        var guardReadTime = Math.round(guardWordcount/250);
        console.log (guardReadTime);
        
        // if (guardReadTime < 5) {
        //     guardIndex++;
        //     displayGuardArticles();
        // }

        var guardArticleText = $("<div>").attr("class", "guardSection");
        
        var guardHeadline = guardResults[guardIndex].webTitle;

        console.log(guardHeadline);

        var guardHeadlineText = $("<p>").text(guardHeadline);
        
        guardTotalReadTime += guardReadTime;

        var guardReadTimeText = 
        $("<p>").text("Estimated read time: " + guardReadTime + " min");

        guardArticleText.append(guardHeadlineText, guardReadTimeText);

        $("#guardian").append(guardArticleText);

        console.log("Total read time =" + guardTotalReadTime)
        console.log("Guard index: " + guardIndex);

        if (guardTotalReadTime < 25) {
            guardIndex++;
            displayGuardArticles();
        } else {
            return;
        }


        }

        displayGuardArticles();
        $("#guardian").append("Total read time: " + guardTotalReadTime + "min");


        });


        // var guardPic = guardResults[0].fields.thumbnail
        // $("#img2").html("<img src='https://media.guim.co.uk/8c7e29d7e1749e03bff6743e506e4189f1d056c4/0_384_5760_3456/500.jpg'>"); 
