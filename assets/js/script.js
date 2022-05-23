var timerEl = document.querySelector(".countdown-num")
var startButton = document.querySelector(".start-button")
var question = document.querySelector(".question-box")
var answerEl = document.querySelector(".answer-container")
var gradeDisplay = document.querySelector(".grade-display")
var quizUI = document.querySelector(".quiz-interface")

// array of questions to be displayed
var questionList = ["Inside which HTML element do we put the Javascript?", "How do you write 'Hello World' in an alert box?", "How do you declare a function named 'myFunction' in Javascript?", "How do you call a function named 'myFunction'?", "How to write an IF statement for executing some code if 'i' is NOT equal to 5?"];


// array of array of answers; correct answers are first in the secondary array
var answerList = [["<script>", "<button>", "<span>", "<h1>"], ["alert('Hello World')", "write alert('Hello World')", "print('Hello World')", "System.out.println('Hello World')"], ["function myFunction()", "myFunction()", "var myFunction()", "new function = myFunction()"], ["myFunction()", "function myFunction()", "myFunction", "call myFunction()"], ["if (i != 5)", "if (i = 5)", "if ('i' not equal to 5)", "if (i >= 5)"]];


// array of correct answers
var rightAnswers = ["<script>", "alert('Hello World')", "function myFunction()", "myFunciton()", "if (i != 5)"];

// used in calculation of score
var score;
var questionsRight = 0;
var questionsWrong = 0;
var questionsAnswered = 0;

// variable for win
var isWin;

// timer variables
var timeLeft = 30;
var timer;

// index for q/a arrays
var index = Math.floor(Math.random() * questionList.length);

// page startup
function init() {
    timerEl.textContent = timeLeft;
}

// starts the game
function startGame() {
    // disables start button once game starts?
    startButton.disabled = true;

    // start timer
    startTimer();
}

// renders answers to the page
function renderAnswers() {
    // cleans the answer slate
    while (answerEl.hasChildNodes()) {
        answerEl.removeChild(answerEl.firstChild);
    }

    // for every answer to the question (4)
    for (var i = 0; i < answerList[index].length; i++) {
        // create a li tag w/ answer and append to answer-ul (also adds id to tag)
        var tag = document.createElement("button");
        tag.textContent = answerList[index][i];
        tag.classList.add("answer-button");
        answerEl.appendChild(tag);
    }
}

// renders questions to the page
function renderQuestion() {
    question.innerHTML = questionList[index];
}

// calculates score
function calculateScore() {
    // calculate score; 5 points for every correct answer
    score = questionsRight * 5;

}

function renderHighscore{
    // clears quiz ui
    while (quizUI.hasChildNodes()) {
        quizUI.removeChild(quizUI.firstChild);
    }

    
}

// calculates score and renders scorecard
function renderScore() {
    // removes question box, answer container, and grade display from quiz ui
    while (quizUI.hasChildNodes()) {
        quizUI.removeChild(quizUI.firstChild);
    }

    // calculate the score
    calculateScore();

    // create elements needed to display scorecard
    var scorecardContainer = document.createElement("div");
    var scorecard = document.createElement("div");
    var scoretext = document.createElement("div");
    var timeRemText = document.createElement("div");
    var timeRem = document.createElement("div");
    var addIniForm = document.createElement("form");
    var addIniLabel = document.createElement("label");
    var addIniInput = document.createElement("input");
    var submit = document.createElement("input")

    // assign attributes to created elements
    scorecardContainer.classList.add("scorecard-container");
    scorecard.classList.add("scorecard");
    scorecard.innerHTML = score;
    scoretext.innerHTML = "Your score is:";
    timeRemText.innerHTML = "Time remaining:";
    timeRem.innerHTML = timeLeft;
    addIniForm.classList.add("input-form");
    addIniForm.setAttribute("id", "initials");
    addIniLabel.innerHTML = "Enter your initials:";
    addIniInput.classList.add("input-box");
    addIniInput.setAttribute("type", "text");
    submit.setAttribute("type", "submit");

    // append elements
    quizUI.appendChild(scorecardContainer);
    var scoreContainer = document.querySelector(".scorecard-container")
    scoreContainer.appendChild(scoretext);
    scoreContainer.appendChild(scorecard);
    scoreContainer.appendChild(timeRemText);
    scoreContainer.appendChild(timeRem);
    scoreContainer.appendChild(addIniForm);
    scoreContainer.appendChild(addIniLabel);
    scoreContainer.appendChild(addIniInput);
    scoreContainer.appendChild(submit);

    var userIni = document.getElementById("initials").value;
    localStorage.setItem("winner-ini", userIni);
}

// check if the win conditions are met
function checkWin() {
    // if wincons are met
    if (timeLeft === 0 || questionList.length === 0) {
        // stop timer and clear interval
        clearInterval(timer);
        // return true
        return true;
    }
    else {
        // return false
        return false;
    }
}

// starts the timer and contains quiz logic
function startTimer() {
    //sets timer
    timer = setInterval(function () {
        // decrement timeLeft and update time left on page
        timeLeft--;
        timerEl.textContent = timeLeft;

        // if it is a dub, render the scoreboard
        isWin = checkWin();
        console.log(isWin)
        if (checkWin() === true) {
            clearInterval(timer);
            renderScore();
        }
    }, 1000)

    // render first question
    renderQuestion();

    // clear opening message in answer container, then load answers
    answerEl.innerHTML = "";
    renderAnswers();


    // add event listenert to answer container
    answerEl.addEventListener("click", function (e) {
        // if the target clicked was an answer button
        if (e.target.classList.contains("answer-button")) {
            // take the html of the button
            var userAnswer = e.target.innerHTML;

            // < and > replace their codes
            var userAnswerParsedlt = userAnswer.replace("&lt;", '<');
            var userAnswerParsedgt = userAnswerParsedlt.replace("&gt;", ">")

            // compare it to the correct answer
            if ((userAnswerParsedgt.includes(rightAnswers[index])) && userAnswerParsedgt.length === rightAnswers[index].length) {
                // if right, increment questionsRight and display correct
                questionsRight++;
                gradeDisplay.innerHTML = "Correct!";

                // splice current selection from q/a arrays
                rightAnswers.splice(index, 1);
                questionList.splice(index, 1);
                answerList.splice(index, 1);

                // update index
                index = Math.floor(Math.random() * questionList.length);

                // cycle to next question/answer
                renderQuestion();
                renderAnswers();
            }
            else {
                // if wrong, increment questionsWrong and subtract 2s from timer
                // and display wrong
                questionsWrong++;
                timeLeft = timeLeft - 2
                gradeDisplay.innerHTML = "Wrong";

                // splice current selection from q/a arrays
                rightAnswers.splice(index, 1);
                questionList.splice(index, 1);
                answerList.splice(index, 1);

                // update index
                index = Math.floor(Math.random() * questionList.length);

                // cycle to next question/answer
                renderQuestion();
                renderAnswers();
            }
        }

        // if it is a dub, render the scoreboard
        isWin = checkWin();
        if (checkWin() === true) {
            renderScore();
        }
    })

};

// listens for click on start button, runs startGame on click
startButton.addEventListener("click", startGame);

init();