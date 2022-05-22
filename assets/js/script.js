var timerEl = document.querySelector(".countdown-num");
var startButton = document.querySelector(".start-button");
var question = document.querySelector(".question-box");

var questionList = ["Inside which HTML element do we put the Javascript?", ""]

var answerList = ["<script>", ]

function timer(){
    var timeLeft = 60;
    
    var timeInterval = setInterval(function(){
        if(timeLeft > 1){
            timeLeft--;
            timerEl.textContent = timeLeft;
            console.log(timeLeft)
        }
        else{
            clearInterval(timeInterval);
            timerEl.textContent = "GAME OVER";
        }
    }, 1000);
}

startButton.addEventListener("click", timer);

//timer (60s timer) DONE
//start button (starts quiz) DONE
//question list (multiple choice and short response)
//answer list (multiple choice and short response)
//show right/wrong (wrong subtracts 5s)
//game over (all questions answered or time ran out)
//save high scores in local storage with initials