let currentSeconds = 99;
let timerInterval;

const startQuizBtn = document.getElementById("start-quiz");
const buttonsSection = document.getElementById("buttons");
const rightWrongEl = document.getElementById("right-wrong"); 
const instructionsParagrapgh = document.getElementById("instructions");
const h1El = document.getElementsByTagName("h1")[0];
const saveScoreForm = document.getElementById("save-score");
const timerEl = document.getElementById("timer");

const QUESTIONS = [
    {
        questionText: "Which team did the USWNT beat in order to secure its first World Cup title in 1991?",
        answers: ["Brazil", "Italy", "Norway", "Japan"],
        correctIndex: 2,
    }, 

    {
        questionText: "Who has the most goals in USWNT history?",
        answers: ["Mia Hamm", "Alex Morgan", "Abby Wambach", "Carli Lloyd"],
        correctIndex: 2,
    }, 

    {
        questionText: "What was the last year the USWNT won the World Cup title?",
        answers: ["2021", "2016", "2009", "2019"],
        correctIndex: 3,
    }, 

    {
        questionText: "Where is the next FIFA Women's World Cup being held?",
        answers: ["Italy", "Canada", "New Zealand", "Seattle"],
        correctIndex: 2,
    },

    {
        questionText: "Who is the current head coach of the USWNT?",
        answers: ["Jill Ellis", "Alex Morgan", "Mia Hamm", "Vlatko Andonoski"],
        correctIndex: 3,
    },
];

function clearAnswerButtons() {
    const buttons = buttonsSection.childNodes;

    for (let i = buttons.length - 1; i > 0; i--) {
        const button = buttons[i];
        
        if (button.id !== "start-quiz") {
            buttonsSection.removeChild(button);
        }
    } 
}

function displayAllDoneView() {
    clearAnswerButtons();

    clearInterval(timerInterval);

    timerEl.textContent = "Timer: " + currentSeconds;
    h1El.textContent = "All Done!";
    instructionsParagrapgh.textContent = "Your final score is: " + currentSeconds;

    saveScoreForm.style.display = "block";
}


function setNextQuestion(questionIndex) {
    const question = QUESTIONS[questionIndex];

    if (!question) {
        return displayAllDoneView();
    }

    clearAnswerButtons();
    
    const buttonList = question.answers;
    const correctIndex = question.correctIndex;
    const questionText = question.questionText;

    instructionsParagrapgh.textContent = questionText;
    
    for (let i = 0; i < buttonList.length; i++) {
        const buttonStr = buttonList[i];
        const buttonEl = document.createElement("button");

        buttonEl.textContent = buttonStr;
        buttonsSection.appendChild(buttonEl);

        buttonEl.addEventListener("click", function () {
            if (i === correctIndex) {
                rightWrongEl.textContent = "Correct";
            } else {
                rightWrongEl.textContent = "Wrong";
                currentSeconds -= 5;
            }
            setNextQuestion(questionIndex + 1);
        });
    }
}

startQuizBtn.addEventListener("click", function () {
    currentSeconds = 99;
    timerEl.textContent = "Timer: " + currentSeconds;

    timerInterval = setInterval(() => {
        currentSeconds--;
        timerEl.textContent = "Timer: " + currentSeconds;
    }, 1000);

    startQuizBtn.style.display = "none";
    setNextQuestion(0);
});

saveScoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const initials = event.target[0].value;

    const jsonScores = localStorage.getItem("scores") || "{}";
    
    const scores = JSON.parse(jsonScores);

    if (scores[initials] === undefined) {
        scores[initials] = currentSeconds;
    } else if (currentSeconds > scores[initials]) {
        scores[initials] = currentSeconds;
    }

    localStorage.setItem("scores", JSON.stringify(scores));
});

