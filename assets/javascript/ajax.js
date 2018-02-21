
//

var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2&q=obama";

var nytTotalReadTime = 0;

function getNYTValues(results) {

    var nytWordcount = results.word_count;

    console.log("nytWordcount: " + nytWordcount);

    var nytReadTime = Math.round(nytWordcount / 250);

    console.log("nytReadTime: " + nytReadTime);

    var nytHeadline = results.headline.main;
    // console.log(nytHeadline);

    var nytLink = results.web_url;

    return {
        wordCount: nytWordcount,
        readTime: nytReadTime,
        headline: nytHeadline,
        link: nytLink,
    }
}

function addArticletoPage(nyt) {

    var nytArticleText = $("<div>").attr("class", "nytSection");

    var nytHeadlineText = $("<p>").html("<a href='" + nyt.link + "'>" + nyt.headline + "</a>");

    var nytReadTimeText =
        $("<p>").text("Estimated read time: " + nyt.readTime + " min");

    nytArticleText.append(nytHeadlineText, nytReadTimeText);

    $("#nyt").append(nytArticleText);
}


function displayNYTArticles(input) {

    var nytResults = input.response.docs;

    for (i = 0; i < nytResults.length; i++) {

        var nyt = getNYTValues(nytResults[i]);

        console.log(nyt);

        nytTotalReadTime += nyt.readTime;

        if (nyt.readTime > 1 && nyt.readTime < 10 && nytTotalReadTime <= 25) {

            addArticletoPage(nyt);

        } else {
            nytTotalReadTime -= nyt.readTime
            return;
        }

        // console.log("Total NYT read time =" + nytTotalReadTime)
        // console.log("NYT index: " + nytIndex);
    }

}

$.ajax({
    url: nytQueryURL,
    method: 'GET'
}).then(function (input) {

    displayNYTArticles(input);
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
        // console.log(guardWordcount);

        var guardReadTime = Math.round(guardWordcount / 250);
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


        // var guardPic = guardResults[0].fields.thumbnail
        // $("#img2").html("<img src='https://media.guim.co.uk/8c7e29d7e1749e03bff6743e506e4189f1d056c4/0_384_5760_3456/500.jpg'>"); 
