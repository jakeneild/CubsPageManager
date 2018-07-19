//I want to radically change the functionality of this projects
//because of the restrictions FB has, but I don't want to delete my old
//code, so I'm keeping it and starting this new file


window.fbAsyncInit = function () {
    FB.init({
        appId: '225023618130869',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.0'
    });

    console.log("check")

    newsFunction();
    setTimeout(login(), 3000);


};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";  //or use "https://connect.facebook.net/en_US/sdk/debug.js"
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


let newsFunction = function () {
    newObj = {};

    let newsApiKey = "1b6bb48e27d347cebbc57acd57f7bb3d";

    $("#content").append(
        $("<br>"),
        $("<input>").attr("type", "text").attr("id", "searchField").attr("placeholder", "Search Key words"),
        $("<button>").attr("type", "button").text("Search").attr("id", "searchButton").on("click", function () {
            $("#resultsDiv").html("")
            newsObj = {};

            let query = $("#searchField").val();
            query = query.split(" ").join("-")


            $.ajax({
                url: `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${newsApiKey}`,
                method: "GET",
            }).then(results => {
                console.log("search results: ", results)
                newsObj = results;
                for (let i = 0; i < results.articles.length; i++) {

                    $("#content").append(
                        $("<article>").attr("id", `article${i}`).append(
                            $("<h2>").text(`Author: ${results.articles[i].title}`),
                            $("<p>").text(`Author: ${results.articles[i].author}`),
                            $("<p>").text(`Description: ${results.articles[i].description}`),
                            $("<p>").text(`Pubdate: ${results.articles[i].publishedAt}`),
                            $("<p>").text(`Source: ${results.articles[i].source.name}`),
                            $("<p>").text(`URL: ${results.articles[i].url}`),
                            $("<img>").attr("src", `${results.articles[i].urlToImage}`),
                            $("<button>").attr("id", i).text("Post").on("click", function () {
                                postToFeed(newsObj.articles[event.target.id]),
                                    $(`#article${event.target.id}`).remove();
                            })

                        )
                    )
                }




            })
        }),
        $("<br>"),
        $("<br>")
    )
}

let myAccessToken = "";


let login = function () {

    FB.login(function (response) {
        myAccessToken = response.authResponse.accessToken
    },
        {
            scope: 'user_friends, user_posts, groups_access_member_info, publish_to_groups',
            return_scopes: true
        });
}


let postToFeed = function (article) {
    console.log(article)
    $.ajax({
        url: `https://graph.facebook.com/766394103749626/feed
        ?message=${article.title}

        ${article.description}

        &link=${article.url}

        &access_token=${myAccessToken}`,
        method: "POST"
    })
    .then(results =>{
        console.log(results)
    })

}