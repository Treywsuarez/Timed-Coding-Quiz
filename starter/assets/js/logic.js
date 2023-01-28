// HTML SELECTIONS //

// buttons for quiz
var startbtn = document.querySelector("#Start");
var submitbtn = document.querySelector("#submit");

// user Initials input logic
var initialsInput = document.querySelector("#initials")

// final score logic
var finalScore = document.querySelector("#final-score");

// quiz screen logic
var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

// quiz question elements 
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");

// TIMER CODE //

// Timer code logic
var interval;
var time = document.querySelector("#time");
var startTime = 60;
// question number starts at -1 no questions are being displayed yet
var questionNumber = -1;
var score = 0;


// SFX Audio Files
var correctSfxaudio = new Audio("starter/assets/sfx/correct.wav");
var incorrectSfxaudio = new Audio("starter/assets/sfx/incorrect.wav");

// Fisher-Yates shuffle function to shuffle
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remains elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // swaps arrays index's to shuffle 
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;

    }
    return array;
}

// shuffles questions and stores in an array
let shuffledQuestions = shuffle(choices);
// -1 to match arrays index number
let choicesLength = choices.length - 1;


// function to display current time 
function getdisplayTime() {
    return Number(time.textContent);
}

// function to set time and display it 
function setDisplayTime(newTime) {
    time.textContent = newTime;
}

// function to decrease time by value
function descreaseTime(value) {
    var currentTime = getDisplayTime();
    var newValue = currentTime - value;

    if (newValue <= 0) {
        clearInterval(interval);
        setDisplayTime("Time is up!");
        gameOver();
    } else {
        // display new time 
        setDisplayTime(newValue);
    }
}

// function to decrease time by 1 
function decreaseTimeByOne() {
    decreaseTimeByOne(1);
}

// QUESTIONS CODE //

function removeMessage() {
    var messageElements = document.querySelectorAll(".message");

    messageElements.forEach(function (element) {
        element.remove();
    });
}

// wrong answer message 
function wrongAnswerMessages() {
    removeMessage();
    // display the message
    var wrongAnswerMessage = document.createElement("p");
    wrongAnswerMessage.textContent = "Incorrect!";
    wrongAnswerMessage.classList.add("message", "incorrect");
    questionChoices.appendChild(wrongAnswerMessage);

    // timer for message to disappear after 2.5 seconds
    setTimeout(function () {
        wrongAnswerMessage.style.display = "none";
    }, 2500);
}

// function to check answers and match to choices
function isTheAnswerCorrect() {
    let optionButtons = document.querySelectorAll(".option-button");
    // convert each option into a button
    optionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var currentQuestion = choices[questionNumber];
            // check for correct answer
            if (this.textContent === currentQuestion.correctAnswer) {
                correctSfxaudio.play();
                score++;
                // hide current choices before moving to next question
                optionButtons.forEach(function (choices) {
                    choices.style.display = "none";
                });
                showNextQuestion();
            } else {
                incorrectSfxaudio.play();
                wrongAnswerMessages();
                // take 10 secs off the timer
                decreaseTimeByOne(10);
                score--;
            }
        })

    })
}

// move to the next question
function showNextQuestion(){
    // end game when all questions answered 
    if (questionNumber < choicesLength){
        // remove message before next question is displayed
        removeMessage();

        // add 1 to to index to return next question
        questionNumber += 1;
        console.log(questionNumber);

        shuffle(choice.options).forEach(function (item) {
            let optionButton = document.createElement("button");
            optionButton.textContent = item;
            optionButton.classList.add("option-button");
            choicesElement.appendChild(optionButton);
        });
        // runs function to check if correct answer was selected
        isTheAnswerCorrect();
    } else {
        gameOver();
    }
}

// END GAME CODE //


function gameOver() {
    questionsScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = score;
}


// START GAME CODE //

start.addEventListener("click", function (event) {
    event.preventDefault();
    setDisplayTime(startTime);
    // decrease time by 1 every second
    interval = setInterval(decreaseTimeByOne, 1000);
    // hide the start screen 
    startScreen.classList.add("hide");
    // removes the class hide from the question screen to display the question screen
    questionsScreen.classList.remove("hide");
    showNextQuestion();
})

