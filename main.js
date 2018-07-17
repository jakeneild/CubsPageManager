/*------------------------------------------------------------------------
  Thanks for using my utility :)
  Trying to make more pure functions
  ------------------------------------------------------------------------*/

//Library

let accountList = [];
let recycleBin = {
    bin: [],
    isInRecycleBin(query){
        for(item in recycleBin.bin){
            if(recycleBin.bin[item].url == query.url){
                return true
            }
        }
        return false
    }
}

let loadLocal = function () {
    if (localStorage.getItem('myCubsAccountList') !== null) {
        accountList = JSON.parse(localStorage.getItem('myCubsAccountList'));
    }
}

let saveLocal = function (accountList) {
    localStorage.setItem('myCubsAccountList', JSON.stringify(accountList));
}

let makeNewAccountPrompt = function () {
    var text;
    var username = prompt("New account username");
    var password = prompt("New account password");

    accountList.push({ username, password })
    saveLocal(accountList);
    displayAccounts();
}

let displayAccounts = function () {
    if ($("#accountsDiv")[0] === undefined) {
        $("#content").append($("<div>").attr("id", "accountsDiv"))
    }

    $("#accountsDiv").html("");

    for (let i = 0; i < accountList.length; i++) {
        $("#accountsDiv").append(
            $("<div>").attr("id", `accountDiv${i}`).addClass("accountDiv").append(
                $("<p>").text(`${accountList[i].username}`).addClass("accountName"),
                $("<p>").attr("id", i).text("X").addClass("accountDelete").on("click", function () {
                    deleteAccount(event.target.id);
                    displayAccounts();
                })
            )
        )
    }
}

let deleteAccount = function (index) {
    accountList.splice(parseInt(index), 1);
    saveLocal(accountList);
}

let addRunButton = function () {
    $("#content").append(
        $("<button>").attr("type", "button").text("run").on("click", run)
    )
}

let run = function () {
    //check if logged out
    //if not logs out

    let getNewsArticles = function () {
        // return $.ajax({
        //     url: `https://newsapi.org/v2/everything?q=chicag-cubs&sortBy=publishedAt&apiKey=1b6bb48e27d347cebbc57acd57f7bb3d`,
        //     method: "GET",
        // })
    }

    let getGroupPosts = function (myAccessToken) {
        // return $.ajax({
        //     url: `https://graph.facebook.com/766394103749626/feed/?redirect=false&access_token=${myAccessToken}`,
        //     method: "GET",
        // })
    }

    let selectPost = function () {
        for (let i = 0; i < myNewsArticles.length; i++) {
            let match = false;
            for (let j = 0; j < myGroupPosts.length; j++) {
                if (myNewsArticles[i].description.includes(myGroupPosts[j].description) ||myGroupPosts[j].description.includes(myNewsArticles[i].description)) {
                    match = true
                }
            }
            if(recycleBin.isInRecycleBin(myNewsArticles[i])){
                match = true;
            }
            if (match == false) {
                return myNewsArticles[i]
            }
        }

    }

    let formatPost = function (postObj) {
        let formattedPost = "";

        formattedPost = {
            message: postObj.description,
            url: postObj.url,
        }

        return formattedPost;
    }

    let makePost = function (myPost) {
        console.log("post", myPost);
        // return $.ajax({
        //     url: `https://graph.facebook.com/766394103749626/feed/?redirect=false&access_token=${myAccessToken}`,
        //     method: "POST",
        //     data: {
        //     message: myPost.description,
        //     url: myPost.URL
        // }
        // })
        //recycleBin.bin.push(myPost)
    }

    let myNewsArticles = [];
    let myGroupPosts = [];
    Promise.all([getNewsArticles(), getGroupPosts()]).then((newsArticles, groupPosts) => {
        console.log("Call returned: ", newsArticles, groupPosts)
        //myNewsArticles = newsArticles[0].articles;
        //myGroupPosts = groupPosts;
        /*-----Dummy data-------*/
        myNewsArticles = [
            {
                author: "Origo",
                description: "Exkluzív vetítést hirdetett az Uránia.",
                publishedAt: "2017-10-20T15:52:00Z",
                source: { id: null, name: "Origo.hu" },
                title: "Örülhetnek a Pearl Jam rajongók",
                url: "http://www.origo.hu/filmklub/20171020-exkluziv-vetitest-hirdetett-az-urania.html",
                urlToImage: "http://static.origos.hu/s/img/share_default_images/o_origo.png"
            },
            {
                author: "Malikae",
                description: "zippy do",
                publishedAt: "2017-10-11T22:50:37Z",
                source: { id: null, name: "Ibm.com" },
                title: "Nationals vs Cubs Live Stream, watch Nationals vs Cubs Free online MLB TV Reddit",
                url: "https://www.ibm.com/developerworks/community/blogs/Wce085e09749a_4650_a064_bb3f3b738fa3/entry/df736fdhs7383df",
                urlToImage: null
            }
        ]
        myGroupPosts = [
            {
                description: "Exkluzív vetítést hirdetett"
            }
        ]
        /*----------------------*/

        for (let i = 0; i < accountList.length; i++) {
            //login();

            makePost(selectPost())

            //logout();
        }
    })



    isComplete();
}

let addNewAccountButton = function () {
    $("#content").append(
        $("<button>").attr("type", "button").text("Add new account").on("click", makeNewAccountPrompt)
    )
}

let isComplete = function () {
    $("#content").append(
        $("<p>").text("Complete!")
    )
}

//Body

loadLocal();

if (accountList[0] === undefined) {
    makeNewAccountPrompt();
}

displayAccounts(accountList);

addNewAccountButton();

addRunButton();

