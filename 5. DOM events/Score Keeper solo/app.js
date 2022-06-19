const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Score")
}

const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Score")
}

const resetButton = document.querySelector("#resetButton");
const roundKeeper = document.querySelector("#numOfRounds");
let roundsTotal = 3;
let isGameOver = false;



function updateScore(player,opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === roundsTotal) {
            player.display.style.color = "green";
            opponent.display.style.color = "red";
            player.button.disabled = true;
            opponent.button.disabled = true;
            isGameOver = true;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click',  () => { updateScore(p1,p2) });
p2.button.addEventListener('click', () => { updateScore(p2,p1) });

roundKeeper.addEventListener('change', function () {
    roundsTotal = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [p1,p2]) {
        p.score = 0;
        p.display.style.color = "black";
        p.display.textContent = p.score;
        p.button.disabled = false;
    }
    
    // p1.score = 0;
    // p2.score = 0;
    // p1.display.style.color = "black";
    // p2.display.style.color = "black";
    // p1.display.textContent = p1.score;
    // p2.display.textContent = p2.score;
    // p1.button.disabled = false;
    // p2.button.disabled = false;
}


