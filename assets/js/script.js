var timerEl = document.querySelector(".countdown-num")
var startButton = document.querySelector(".start-button")
var question = document.querySelector(".question-box")
var answer = document.querySelector(".multiple-choice")
var answerUl = document.querySelector(".answer-ul")
var answerEl = document.querySelector(".answer-container")

var answerAlt = document.getElementById("answer-ul")

// array of questions to be displayed
var questionList = ["Inside which HTML element do we put the Javascript?", "How do you write 'Hello World' in an alert box?", "How do you declare a function named 'myFunction' in Javascript?", "How do you call a function named 'myFunction'?", "How to write an IF statement for executing some code if 'i' is NOT equal to 5?"];


// array of array of answers; correct answers are first in the secondary array
var answerList = [["<script>", "<button>", "<span>", "<h1>"], ["alert('Hello World')", "write alert('Hello World')", "print('Hello World')", "System.out.println('Hello World')"], ["function myFunction()", "myFunction()", "var myFunction()", "new function = myFunction()"], ["myFunction()", "function myFunction()", "myFunction", "call myFunction()"], ["if (i != 5)", "if (i = 5)", "if ('i' not equal to 5)", "if (i >= 5)"]];


// array of correct answers? idk if this will get used
var rightAnswers = ["<script>", "alert('Hello World')", "function myFunction()", "myFunciton()", "if (i != 5)"];

// used in calculation of score
var questionsRight = 0;
var questionsWrong = 0;
var questionsAnswered = 0;

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
    while (answerEl.hasChildNodes()){
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
    console.log(index)
    question.innerHTML = questionList[index];
}

function score() {

}

// starts the timer and contains quiz logic
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
            timerEl
            // calculate score
            score();
        }
    }, 1000)

    // render first question
    renderQuestion();

    // clear opening message in answer container, then load answers
    answerEl.innerHTML = "";
    renderAnswers();

    
    // add event listenert to answer container
    answerEl.addEventListener("click", function(e){
        // if the target clicked was an answer button
        if (e.target.classList.contains("answer-button")){
            // take the html of the button
            var userAnswer = e.target.innerHTML;

            // < and > replace their codes
            var userAnswerParsedlt = userAnswer.replace("&lt;", '<');
            var userAnswerParsedgt = userAnswerParsedlt.replace("&gt;", ">")

            // compare it to the correct answer
            if ((userAnswerParsedgt.includes(rightAnswers[index])) && userAnswerParsedgt.length === rightAnswers[index].length){
                // if right, increment questionsRight and display an alert
                questionsRight++;
                alert("correct!")

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
            else{
                // if wrong, increment questionsWrong and subtract 2s from timer
                // and display wrong
                questionsWrong++;
                timeLeft = timeLeft - 2
                alert("wrong")

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
    })

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