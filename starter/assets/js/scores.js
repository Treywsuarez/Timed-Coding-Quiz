// HTML SELECTION // 
 
var highscoreElements = document.querySelector("#highscores");
var clear = document.querySelector("#clear");

var highscores = [];

// LOCAL STORAGE //

// check local storage at the start of the game

function getScores() {
    var storedScores = localStorage.getItem("scores")
    // if no score stored, return nothing
    if (storedScores === null){
        return;
    }else{
        // if there are scores convert to objects
        highscores = JSON.parse(storedScores);
        // sort scores from highest to lowest
        highscores.sort(function (a, b){
            return b.score - a.score;
        })
    }

    // show only top 5 scores
    highscores.forEach(function (scoreObject, index){
        if (index > 4){
            return;
        }
        // list each score
        let listScores = document.createElement("li");
        listScores.textContent = scoreObject.initials + "" + scoreObject.score;
        highscoreElements.appendChild(listScores);
    })
}

// button to clear high scores
clear.addEventListener("click", function(){
    localStorage.clear();
    highscoreElements.innerHTML = "";
})

// check storage for scores
getScores();