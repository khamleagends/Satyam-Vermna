// ==========================================
// 1. CHARACTER RUNNING LOGIC
// ==========================================
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const runner = document.getElementById('runner');
const glowBar = document.getElementById('glowBar');

// Calculate progress based on input length
function updateRunnerPosition() {
    // Let's say typing 8 characters fills a section
    const userLen = Math.min(usernameInput.value.length, 8);
    const passLen = Math.min(passwordInput.value.length, 8);
    
    // Calculate percentage (User = 0-50%, Pass = 50-100%)
    let progress = (userLen / 8) * 50; 
    progress += (passLen / 8) * 50;

    // Ensure it doesn't run off the right edge (cap at 100%)
    let safeProgress = Math.min(progress, 100);

    // Update CSS positions
    runner.style.left = `${safeProgress}%`;
    glowBar.style.width = `${safeProgress}%`;

    // Add bounce class while typing, remove it after a short delay
    runner.classList.add('running-anim');
    clearTimeout(runner.bounceTimeout);
    runner.bounceTimeout = setTimeout(() => {
        runner.classList.remove('running-anim');
    }, 300);
}

usernameInput.addEventListener('input', updateRunnerPosition);
passwordInput.addEventListener('input', updateRunnerPosition);


// ==========================================
// 2. LOGIN & POP-UP LOGIC
// ==========================================
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = usernameInput.value;
    const pass = passwordInput.value;
    const errorDiv = document.getElementById('errorMessage');

    errorDiv.textContent = '';

    if (user === "admin" && pass === "password123") {
        // SUCCESS: Trigger Animation Sequence!
        
        // 1. Hide the main form slightly
        document.getElementById('mainWrapper').style.opacity = '0';
        document.getElementById('mainWrapper').style.transform = 'scale(0.9)';

        // 2. Show the Welcome Pop-up
        const popup = document.getElementById('welcomePopup');
        popup.classList.remove('hidden');
        
        // Slight delay to allow display:block to apply before adding opacity class
        setTimeout(() => {
            popup.classList.add('show');
        }, 50);

        // 3. Redirect to dashboard after the animation finishes (3 seconds)
        setTimeout(() => {
            // Replace with your actual redirect URL
            window.location.href = 'buggy1.html'; 
            
            // For demo purposes, we'll just reset the page so you can see it again
            alert("This is where it redirects to your dashboard!");
            location.reload(); 
        }, 3000);

    } else {
        errorDiv.textContent = 'Access Denied. Try admin / password123';
        // Reset runner if failed
        passwordInput.value = '';
        updateRunnerPosition();
    }
});


// ==========================================
// 3. TIC-TAC-TOE LOGIC (Same as before)
// ==========================================
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetGameBtn');

let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const PLAYER_X = "X";
const PLAYER_O = "O";

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (gameState[index] !== "" || !gameActive || statusText.textContent.includes("AI")) return; 

        makeMove(index, PLAYER_X);
        if (gameActive) {
            statusText.textContent = "AI's turn...";
            setTimeout(computerMove, 500);
        }
    });
});

function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    checkResult();
}

function computerMove() {
    if (!gameActive) return;
    let emptyCells = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") emptyCells.push(i);
    }
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        makeMove(emptyCells[randomIndex], PLAYER_O);
        if (gameActive) statusText.textContent = "Your turn (X)";
    }
}

function checkResult() {
    let roundWon = false;
    let winningPlayer = "";
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true; winningPlayer = gameState[a]; break;
        }
    }

    if (roundWon) {
        statusText.textContent = winningPlayer === PLAYER_X ? "Victory! 🎉" : "Defeat! 🤖";
        statusText.style.color = winningPlayer === PLAYER_X ? "#58a6ff" : "#ff7b72";
        gameActive = false; return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "Stalemate! 🤝";
        statusText.style.color = "#8b949e";
        gameActive = false; return;
    }
}

resetBtn.addEventListener('click', () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Your turn (X)";
    statusText.style.color = "#58a6ff";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
});

