    
    var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2&q=Obama";
    console.log(nytQueryURL);

    $.ajax({
        url: nytQueryURL,
        method: 'GET'
    }).then(function (input) {

        var nytResults = input.response.docs;
        console.log(nytResults);

        var nytHeadline = nytResults[0].headline.main;
        console.log(nytHeadline);
        $("#headline1").text(nytHeadline);

        var nytWordcount = nytResults[0].word_count;
        console.log(nytWordcount);

        var nytReadTime = Math.round(nytWordcount/275);
        console.log (nytReadTime);
        $("#readTime1").text("Estimated read time: " + nytReadTime + " min");


    });


    var guardQueryURL = "https://content.guardianapis.com/search?q=obama&show-fields=all&api-key=ee30fe53-cc69-4403-802d-998ba44e8fa7";
    console.log(guardQueryURL);

    var guardCount = 0;

    $.ajax({
        url: guardQueryURL,
        method: 'GET'
    }).then(function (input) {

        function displayArticles() {
        
        var guardResults = input.response.results;
        console.log(guardResults);

        var articleText = $("<div>").attr("class", "articleSection");
        
        var guardHeadline = guardResults[guardCount].webTitle;

        console.log(guardHeadline);

        var guardHeadlineText = $("<p>").text(guardResults[guardCount].webTitle);
        
        var guardWordcount = guardResults[guardCount].fields.wordcount;
        
        console.log(guardWordcount);

        var guardReadTime = Math.round(guardWordcount/275);
        console.log (guardReadTime);

        var guardReadTimeText = 
        $("<p>").text("Estimated read time: " + guardReadTime + " min");

        articleText.append(guardHeadlineText, guardReadTimeText);

        $("#guardian").append(articleText);

        guardCount++;

        if (guardCount < 3) {
            displayArticles();
        }

        }

        displayArticles();
        console.log(guardCount);

        });


        // var guardPic = guardResults[0].fields.thumbnail
        // $("#img2").html("<img src='https://media.guim.co.uk/8c7e29d7e1749e03bff6743e506e4189f1d056c4/0_384_5760_3456/500.jpg'>"); 
