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
