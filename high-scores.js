const highScoresUl = document.getElementById("high-scores");

const jsonScores = localStorage.getItem("scores");
console.log(jsonScores);
const scoresObj = JSON.parse(jsonScores);

const scoresKeys = Object.keys(scoresObj);

for (let i = 0; i < scoresKeys.length; i++) {
    const initials = scoresKeys[i];
    const score = scoresObj[initials];

    const scoreEl = document.createElement("li");
    scoreEl.textContent = initials + ": " + score;

    highScoresUl.appendChild(scoreEl);
}