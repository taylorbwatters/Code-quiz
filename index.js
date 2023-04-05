const startQuizBtn = document.getElementById("start-quiz");
const buttonsSection = document.getElementById("buttons");
const rightWrongEl = document.getElementById("right-wrong"); 

const questions = [
    {
        questionText: "The condition in an if/else statement is enclosed with __________.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctIndex: 2, 
    }
]

function appendButtons(questionIndex) {
    const question = questions[questionIndex];
    
    const buttonList = question.answers;

    const correctIndex = question.correctIndex;
    
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
            }
        });
    }
}

startQuizBtn.addEventListener("click", function () {
    startQuizBtn.style.display = "none";
    appendButtons(0);
});

