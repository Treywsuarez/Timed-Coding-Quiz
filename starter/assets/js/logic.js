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


