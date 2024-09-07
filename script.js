const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('wordDisplay');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resultDiv = document.getElementById('result');

let words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
let chosenWord;
let guessedLetters = [];
let tries = 6;

function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    tries = 6;
    updateWordDisplay();
    drawHangmanBase();
    clearResult();
}

function updateWordDisplay() {
    let displayWord = '';
    for (let i = 0; i < chosenWord.length; i++) {
        displayWord += guessedLetters.includes(chosenWord[i]) ? chosenWord[i] : '_';
    }
    wordDisplay.textContent = displayWord.split('').join(' ');
}

function drawHangmanBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(300, 350);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 350);
    ctx.lineTo(200, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(350, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(350, 50);
    ctx.lineTo(350, 70);
    ctx.stroke();
}

function drawHangmanPart(part) {
    switch (part) {
        case 1:
            // Head
            ctx.beginPath();
            ctx.arc(350, 90, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2:
            // Body
            ctx.beginPath();
            ctx.moveTo(350, 110);
            ctx.lineTo(350, 170);
            ctx.stroke();
            break;
        case 3:
            // Left arm
            ctx.beginPath();
            ctx.moveTo(350, 120);
            ctx.lineTo(320, 140);
            ctx.stroke();
            break;
        case 4:
            // Right arm
            ctx.beginPath();
            ctx.moveTo(350, 120);
            ctx.lineTo(380, 140);
            ctx.stroke();
            break;
        case 5:
            // Left leg
            ctx.beginPath();
            ctx.moveTo(350, 170);
            ctx.lineTo(320, 190);
            ctx.stroke();
            break;
        case 6:
            // Right leg
            ctx.beginPath();
            ctx.moveTo(350, 170);
            ctx.lineTo(380, 190);
            ctx.stroke();
            break;
    }
}

function checkWin() {
    return chosenWord.split('').every(letter => guessedLetters.includes(letter));
}

function checkLoss() {
    return tries === 0;
}

function showResult(message) {
    resultDiv.textContent = message;
}

function clearResult() {
    resultDiv.textContent = '';
}

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert('Please enter a single letter.');
        return;
    }

    if (guessedLetters.includes(guess)) {
        alert('You already guessed this letter!');
        return;
    }

    guessedLetters.push(guess);

    if (!chosenWord.includes(guess)) {
        tries--;
        drawHangmanPart(7 - tries);
    }

    updateWordDisplay();

    if (checkWin()) {
        showResult('Congratulations! You won!');
        setTimeout(startGame, 3000);
    } else if (checkLoss()) {
        showResult(`Sorry, you lost! The word was ${chosenWord}.`);
        setTimeout(startGame, 3000);
    }
});

startGame();