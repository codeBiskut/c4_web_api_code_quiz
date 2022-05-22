var timerEl = document.querySelector(".countdown-num");
var startButton = document.querySelector(".start-button");
var question = document.querySelector(".question-box");


// array of questions to be displayed
var questionList = ["Inside which HTML element do we put the Javascript?", "How do you write 'Hello World' in an alert box?", "How do you declare a function named 'myFunction' in Javascript?", "How do you call a function named 'myFunction'?", "How to write an IF statement for executing some code if 'i' is NOT equal to 5?"]


// array of array of answers; correct answers are first in the secondary array
var AnswerList = [["<script>", "<button>", "<span>", "<h1>"], ["alert('Hello World')", "write alert('Hello World')", "print('Hello World')", "System.out.println('Hello World')"], ["function myFunction()", "myFunction()", "var myFunction()", "new function = myFunction()"], ["myFunction()", "function myFunction()", "myFunction", "call myFunction()"], ["if (i != 5)","if (i = 5)", "if ('i' not equal to 5)", "if (i >= 5)"]]

var rightAnswers = ["<script>", "alert('Hello World')", "function myFunction()", "myFunciton()", "if (i != 5)"]

var questionsRight = 0;
var questionsWrong = 0;
var questionsAnswered = 0;
var timeLeft = 30;
var timer;
var index;


// page startup
function init() {
    timerEl.textContent = timeLeft;
}
// starts the game
function startGame() {
    // disables start button once game starts?

    // start timer
    startTimer();
}

function renderQuestion(){
    question.innerHTML = questionList
}

function score() {

}

function checkAnswer(){

}

function startTimer() {
    //sets timer
    timer = setInterval(function () {
        // decrement timeLeft and update time left on page
        timeLeft--;
        timerEl.textContent = timeLeft;
        console.log(timeLeft)

        // test win conditions (time out or finished with quesitons)
        if (timeLeft === 0 || questionsAnswered === questionList.length) {
            // stop timer and clear interval
            clearInterval(timer);

            // calculate score
            score();
        }
    }, 1000)
    };

// listens for click on start button, runs startGame on click
startButton.addEventListener("click", startGame);

init();
//timer (60s timer) DONE
//start button (starts quiz) DONE
//question list (multiple choice and short response)
//answer list (multiple choice and short response)
//show right/wrong (wrong subtracts 5s)
//game over (all questions answered or time ran out)
//save high scores in local storage with initials