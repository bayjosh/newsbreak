//THE NEW YORK TIMES

var nytQueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2&q=obama";

var nytTotalReadTime = 0;

function getNYTData(results) {

    var nytWordcount = results.word_count;

    // console.log("nytWordcount: " + nytWordcount);

    var nytReadTime = Math.round(nytWordcount / 250);

    // console.log("nytReadTime: " + nytReadTime);

    var nytHeadline = results.headline.main;
    // console.log(nytHeadline);

    var nytLink = results.web_url;

    return {
        wordCount:nytWordcount,
        readTime: nytReadTime,
        headline: nytHeadline,
        link: nytLink,
    }
}

function addNYTArticles(nyt) {

    var nytArticleText = $("<div>").attr("class", "nytSection");

    var nytHeadlineText = $("<p>").html("<a href='" + nyt.link + "' target='_blank'>" + nyt.headline + "</a>");

    var nytReadTimeText =
        $("<p>").text("Estimated read time: " + nyt.readTime + " min");

    nytArticleText.append(nytHeadlineText, nytReadTimeText);

    $("#nyt").append(nytArticleText);
}


function displayNYTArticles(input) {

    var nytResults = input.response.docs;

    for (var i = 0; i < nytResults.length; i++) {

        var nyt = getNYTData(nytResults[i]);

        console.log(nyt);

        nytTotalReadTime += nyt.readTime;

        if (nyt.readTime > 1 && nyt.readTime < 10 && nytTotalReadTime <= 25) {

            addNYTArticles(nyt);

        } else {
            nytTotalReadTime -= nyt.readTime
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





//THE GUARDIAN

var guardQueryURL = "https://content.guardianapis.com/search?q=trump&show-fields=all&page-size=200&api-key=ee30fe53-cc69-4403-802d-998ba44e8fa7";

var guardTotalReadTime = 0;

function getGuardData(results) {

    var guardWordcount = results.fields.wordcount;
    console.log(guardWordcount);

    var guardReadTime = Math.round(guardWordcount / 250);
    // console.log (guardReadTime);

    var guardHeadline = results.webTitle;
    // console.log(guardHeadline);

    var guardLink = results.webUrl;

    return {
        wordCount: guardWordcount,
        readTime: guardReadTime,
        headline: guardHeadline,
        link: guardLink,
    }

}

function addGuardArticles(guard) {

    var guardArticleText = $("<div>").attr("class", "guardSection");

    var guardHeadlineText = $("<p>").html("<a href='" + guard.link + "' target='_blank'>" + guard.headline + "</a>");

    // console.log("headline + link =" + guardHeadlineText)

    var guardReadTimeText =
        $("<p>").text("Estimated read time: " + guard.readTime + " min");

    guardArticleText.append(guardHeadlineText, guardReadTimeText);

    $("#guardian").append(guardArticleText);

    // console.log("Total read time =" + guardTotalReadTime)
    // console.log("Guard index: " + guardIndex);

}

function displayGuardArticles(input) {

    var guardResults = input.response.results;

    for (var i = 0; i < guardResults.length; i++) {

        var guard = getGuardData(guardResults[i]);

        console.log(guardResults[i]);

        console.log(guard.readTime);

        console.log(guard);

        guardTotalReadTime += guard.readTime;

        if (guard.readTime > 5 && guard.readTime < 10 && guardTotalReadTime <= 25) {

            addGuardArticles(guard);

        } else {
            guardTotalReadTime -= guard.readTime;
        }

    }

};

$.ajax({
    url: guardQueryURL,
    method: 'GET'
}).then(function (input) {

    displayGuardArticles(input);
    $("#guardian").append("Total read time: " + guardTotalReadTime + "min");

});