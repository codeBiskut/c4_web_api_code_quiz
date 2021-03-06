var timerEl = document.getElementById("countdown-num")
var startButtonEl = document.getElementById("start-button")
var questionBoxEl = document.getElementById("question-box")
var answerBoxEl = document.getElementById("answer-container")
var answerCheckEl = document.getElementById("answer-check")
var quizInterfaceEl = document.getElementById("quiz-interface")
var landingMessageEl = document.getElementById("landing-message")
var scorecardEl = document.getElementById("scorecard")
var highscoreEl = document.getElementById("highscores")
var highscoreListEl = document.getElementById("highScoreList")


// array of questions to be displayed
var questionList = ["Inside which HTML element do we put the Javascript?", "How do you write 'Hello World' in an alert box?", "How do you declare a function named 'myFunction' in Javascript?", "How do you call a function named 'myFunction'?", "How to write an IF statement for executing some code if 'i' is NOT equal to 5?"];


// array of array of answers; correct answers are first in the secondary array
var answerList = [["<script>", "<button>", "<span>", "<h1>"], ["alert('Hello World')", "write alert('Hello World')", "print('Hello World')", "System.out.println('Hello World')"], ["function myFunction()", "myFunction()", "var myFunction()", "new function = myFunction()"], ["myFunction()", "function myFunction()", "myFunction", "call myFunction()"], ["if (i != 5)", "if (i = 5)", "if ('i' not equal to 5)", "if (i >= 5)"]];


// array of correct answers
var rightAnswers = ["<script>", "alert('Hello World')", "function myFunction()", "myFunction()", "if (i != 5)"];

// used in calculation of score
var score;
var questionsRight = 0;
var questionsWrong = 0;
var questionsAnswered = 0;

// used in user input of initials
var userInputEl;
var userIni;

// highscore storage
var noHighscores = 5;
var HIGH_SCORES = "highScores";
var highScoreString = localStorage.getItem(HIGH_SCORES);
var highScores = JSON.parse(highScoreString) ?? [];
var lowestScore = highScores[noHighscores - 1]?.score ?? 0;

// variable for win
var isWin;

// timer variables
var timeLeft = 30;
var timer;

// index for q/a arrays
var index = Math.floor(Math.random() * (questionList.length - 1));

// page startup
function init() {
    timerEl.textContent = timeLeft;
}

// starts the game
function startGame() {
    // disables start button once game starts?
    startButtonEl.disabled = true;

    // hides landing message
    landingMessageEl.setAttribute("class", "hide");

    // start timer
    startTimer();
}

// renders answers to the page
function renderAnswers() {
    // cleans the answer slate
    while (answerBoxEl.hasChildNodes()) {
        answerBoxEl.removeChild(answerBoxEl.firstChild);
    }

    // if it is a dub, render the scoreboard
    isWin = checkWin();
    if (checkWin() === true || index >= questionList.length) {
        showScore();
        return;
    }

    // for every answer to the questionBoxEl (4)
    for (var i = 0; i < answerList[index].length; i++) {
        // create a li tag w/ answer and append to answer-ul (also adds id to tag)
        var tag = document.createElement("button");
        tag.textContent = answerList[index][i];
        tag.classList.add("answer-button");
        answerBoxEl.appendChild(tag);
    }
}

// renders questions to the page
function renderQuestion() {
    questionBoxEl.innerHTML = questionList[index];
}

function saveHighScore(newScore) {
    // add the highscore to the score array
    highScores.push(newScore);

    // sort the array from highest score to lowest
    highScores.sort(function (a, b) {
        return b[0] - a[0];
    });

    // remove the extra score (only five highscores)
    highScores.splice(noHighscores);

    // save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

function showHighScore() {
    // hide scorecard and show the high score list
    scorecardEl.classList.add("hide");
    highscoreEl.classList.remove("hide");

    // grab high scores from local storage
    highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];

    // for every high score
    for (var i = 0; i < noHighscores; i++) {
        // create a list element, take the first high score from the string
        var highscoreLi = document.createElement("li");
        var retreivedElement = highScores.shift();

        // display score and name from retreived element
        highscoreLi.textContent = retreivedElement[0] + " - " + retreivedElement[1]

        // append the list element
        highscoreListEl.appendChild(highscoreLi);

    }
}

// calculates score and renders scorecard
function showScore() {
    // removes questionBoxEl box, answer container, and grade display from quiz ui
    answerBoxEl.classList.add("hide");
    questionBoxEl.classList.add("hide");
    answerCheckEl.classList.add("hide");
    scorecardEl.classList.remove("hide");

    // calculate the score
    score = timeLeft;

    // create elements needed to display scorecard
    var scoretext = document.createElement("div");
    var addIniForm = document.createElement("form");
    var addIniLabel = document.createElement("label");
    var addIniInput = document.createElement("input");
    var submit = document.createElement("input")

    // assign attributes to created elements
    scoretext.innerHTML = "Your score is: " + score;
    addIniForm.setAttribute("id", "input-form");
    addIniForm.setAttribute("id", "initials");
    addIniLabel.innerHTML = "Enter your initials:";
    addIniInput.setAttribute("id", "input-box");
    addIniInput.setAttribute("type", "text");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "formSubmitButton");

    // append elements
    scorecardEl.appendChild(scoretext);
    scorecardEl.appendChild(addIniForm);
    scorecardEl.appendChild(addIniLabel);
    scorecardEl.appendChild(addIniInput);
    scorecardEl.appendChild(submit);

    // event listener for submit button
    submit.addEventListener("click", function () {

        // get user's input and add to local storage
        userIni = document.getElementById("input-box").value;
        var newScore = [timeLeft, userIni];

        // check for new high score
        highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];

        // if user's score is greater than the lowest score
        if (timeLeft > lowestScore) {
            // save the high score, then show all high scores
            saveHighScore(newScore);
            showHighScore();
        }
        else {
            // otherwise just display high scores
            showHighScore();
        }
    });
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
        if (checkWin() === true) {
            clearInterval(timer);
            showScore();
        }
    }, 1000)

    // show right/wrong
    answerCheckEl.classList.remove("hide");

    // render first questionBoxEl
    questionBoxEl.classList.remove("hide");
    renderQuestion();

    // clear opening message in answer container, then load answers
    answerBoxEl.classList.remove("hide");
    answerBoxEl.innerHTML = "";
    renderAnswers();


    // add event listenert to answer container
    answerBoxEl.addEventListener("click", function (e) {
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
                answerCheckEl.innerHTML = "Correct!";

                // refresh timer on screen
                timerEl.textContent = timeLeft;

                // if it is a dub, render the scoreboard
                isWin = checkWin();
                if (checkWin() === true || index >= questionList.length) {
                    showScore();
                    alert("end")
                    return;
                }

                // splice current selection from q/a arrays
                rightAnswers.splice(index, 1);
                questionList.splice(index, 1);
                answerList.splice(index, 1);

                // update index
                index = Math.floor(Math.random() * (questionList.length - 1));

                // cycle to next questionBoxEl/answer
                renderQuestion();
                renderAnswers();
            }
            else {
                // if wrong, increment questionsWrong and subtract 5s from timer
                // and display wrong
                questionsWrong++;
                timeLeft = timeLeft - 5
                answerCheckEl.innerHTML = "Wrong";

                // if it is a dub, render the scoreboard
                isWin = checkWin();
                if (checkWin() === true || index >= questionList.length) {
                    showScore();
                    alert("end")
                    return;
                }

                // splice current selection from q/a arrays
                rightAnswers.splice(index, 1);
                questionList.splice(index, 1);
                answerList.splice(index, 1);

                // update index
                index = Math.floor(Math.random() * (questionList.length - 1));

                // cycle to next questionBoxEl/answer
                renderQuestion();
                renderAnswers();
            }
        }


    })

};

// listens for click on start button, runs startGame on click
startButtonEl.addEventListener("click", startGame);

// inital function ran on page load
init();