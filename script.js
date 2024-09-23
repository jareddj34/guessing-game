//Selecting all buttons on page
let buttons = document.querySelectorAll("button");

//Select first html elemtn with class score
let scoreElements = document.querySelectorAll(".score");

let score = 0;

let finalMessage = document.querySelector(".final-message");
finalMessage.style.display = "none";

let two = finalMessage.querySelector(".two");
let three = finalMessage.querySelector(".three");
two.style.display = "none";
three.style.display = "none";

// Total number of questions
let totalQuestions = document.querySelectorAll(".question").length;
let answeredQuestions = 0;

// Audio Stuff
// const audio1 = new Audio();
// audio1.src = "ocarina.mp3";

// function playAudio() {
//     audio1.play();
// }

function check(event) {
    let button = event.target;

    let name = button.className;

    let question = button.closest(".question");
    let questionButtons = question.querySelectorAll("button");

    for (let button of questionButtons) {
        button.disabled = true;
        button.style.backgroundColor = "gray";
    }

    if (name == "correct") {
        button.style.backgroundColor = "green";
        let explanation = question.querySelector(".explanation");
        explanation.style.display = "block";
        let gotit = question.querySelector(".gotit");
        gotit.textContent = "Correct! ";

        let buttonContent = button.textContent;
        console.log(buttonContent);

        let audio = new Audio(`sounds/${buttonContent}.wav`);
        audio.play();

        score++;
        for (let scoreElement of scoreElements) {
            scoreElement.textContent = score;
        }
    } else {
        button.style.backgroundColor = "red";
        let explanation = question.querySelector(".explanation");
        explanation.style.display = "block";
        let gotit = question.querySelector(".gotit");
        gotit.textContent = "Wrong... ";
    }

    answeredQuestions++;

    if (answeredQuestions === totalQuestions) {
        finalMessage.style.display = "block";

        if (score <= 2) {
            two.style.display = "block";
        } else {
            three.style.display = "block";
        }
    }
}

for (let button of buttons) {
    button.onclick = check;
}
