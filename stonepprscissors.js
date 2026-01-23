let userScore = 0;
let computerScore = 0;
let numberOfMatches = 0;

// DOM elements
const choices = document.querySelectorAll('#rock, #paper, #scissors');
const resetButton = document.getElementById('reset');
const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const resultPanel = document.querySelector('.result');
const numberOfMatchesDisplay = document.getElementById('noofmatches');

// Computer choice
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// Update number of matches
function updateNumberOfMatches() {
    numberOfMatches++;
    numberOfMatchesDisplay.textContent = `Number of matches: ${numberOfMatches}`;
}
// Win animation helper
function playWinAnimation() {
    if (!resultPanel) return;
    resultPanel.classList.remove('win-animate');
    // Force reflow so animation can retrigger even on consecutive wins
    void resultPanel.offsetWidth;
    resultPanel.classList.add('win-animate');
}

// Clean up the class after animation ends
if (resultPanel) {
    resultPanel.addEventListener('animationend', () => {
        resultPanel.classList.remove('win-animate');
    });
}
// Choice text generators
function userChoiceText(userChoice) {
    return `You chose ${userChoice}.`;
}

function computerChoiceText(computerChoice) {
    return `Computer chose ${computerChoice}.`;
}
// Result handlers
function drawCondition(userChoice, computerChoice) {
    resultText.textContent = `${computerChoiceText(computerChoice)} It's a tie!`;
    updateNumberOfMatches();
}

function winCondition(userChoice, computerChoice) {
    userScore++;
    userScoreDisplay.textContent = `Your score: ${userScore}`;
    resultText.textContent = `${userChoiceText(userChoice)} ${computerChoiceText(computerChoice)} You win!`;
    updateNumberOfMatches();
    playWinAnimation();
}

function loseCondition(userChoice, computerChoice) {
    computerScore++;
    computerScoreDisplay.textContent = `Computer score: ${computerScore}`;
    resultText.textContent = `${computerChoiceText(computerChoice)} ${userChoiceText(userChoice)} You lose!`;
    updateNumberOfMatches();
}

// Game logic
function game(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        drawCondition(userChoice, computerChoice);
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        winCondition(userChoice, computerChoice);
    } else {
        loseCondition(userChoice, computerChoice);
    }
}

// User input handling
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        const computerChoice = getComputerChoice();
        game(userChoice, computerChoice);
    });
});

// Reset game
resetButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreDisplay.textContent = 'User Score: 0';
    computerScoreDisplay.textContent = 'Computer Score: 0';
    resultText.textContent = 'Make your move!';
    numberOfMatches = 0;
    numberOfMatchesDisplay.textContent = `Number of matches: 0`;
    if (resultPanel) resultPanel.classList.remove('win-animate');
    
});


