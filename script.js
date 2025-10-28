// DOM ELEMENTS
const gameBoard = {
  squares: [
    document.getElementById("grid__square-1"),
    document.getElementById("grid__square-2"),
    document.getElementById("grid__square-3"),
    document.getElementById("grid__square-4"),
    document.getElementById("grid__square-5"),
    document.getElementById("grid__square-6"),
    document.getElementById("grid__square-7"),
    document.getElementById("grid__square-8"),
    document.getElementById("grid__square-9")
  ],
  allSquares: document.querySelectorAll(".grid__square")
};

const ui = {
  playerOneScore: document.getElementById("info__player__score1"),
  playerTwoScore: document.getElementById("info__player__score2"),
  playerOneName: document.getElementById("info__player__name1"),
  playerTwoName: document.getElementById("info__player__name2"),
  infoText: document.getElementById("instructions__text"),
  startGameBtn: document.getElementById("instructions__btn"),
  modal: document.getElementById("modal"),
  form: document.getElementById("player-form"),
  closeModalBtn: document.getElementById("close-modal-btn"),
  settingsToggle: document.getElementById("settings-toggle"),
  settingsPanel: document.getElementById("settings-panel"),
  soundToggle: document.getElementById("sound-toggle"),
  animationToggle: document.getElementById("animation-toggle"),
  resetScoresBtn: document.getElementById("reset-scores"),
  clearDataBtn: document.getElementById("clear-data"),
  totalGames: document.getElementById("total-games"),
  currentStreak: document.getElementById("current-streak"),
  tieCount: document.getElementById("tie-count")
};

// GAME STATE
const gameState = {
  players: {
    playerOne: { name: "Player 1", wins: 0, symbol: "cross" },
    playerTwo: { name: "Player 2", wins: 0, symbol: "circle" }
  },
  currentMove: 1,
  currentPlayer: null,
  previousPlayer: null,
  currentSymbol: "cross",
  isGameActive: false,
  hasWinner: false,
  settings: {
    soundEnabled: true,
    darkMode: false,
    animationsEnabled: true
  },
  statistics: {
    totalGames: 0,
    currentStreak: 0,
    currentStreakPlayer: null,
    tieCount: 0
  }
};

// Initialize current player
gameState.currentPlayer = gameState.players.playerOne;

// LOCAL STORAGE FUNCTIONS
function saveGameState() {
  try {
    const dataToSave = {
      players: gameState.players,
      settings: gameState.settings,
      statistics: gameState.statistics,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('ticTacToeGame', JSON.stringify(dataToSave));
  } catch (error) {
    console.warn('Could not save game state:', error);
  }
}

function loadGameState() {
  try {
    const savedData = localStorage.getItem('ticTacToeGame');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      gameState.players = parsed.players || gameState.players;
      gameState.settings = { ...gameState.settings, ...parsed.settings };
      gameState.statistics = { ...gameState.statistics, ...parsed.statistics };
      updateScores();
      updatePlayerNames();
      updateStatistics();
      updateSettingsUI();
      return true;
    }
  } catch (error) {
    console.warn('Could not load game state:', error);
  }
  return false;
}

function updatePlayerNames() {
  ui.playerOneName.textContent = gameState.players.playerOne.name;
  ui.playerTwoName.textContent = gameState.players.playerTwo.name;
}

function updateStatistics() {
  ui.totalGames.textContent = gameState.statistics.totalGames;
  ui.currentStreak.textContent = gameState.statistics.currentStreak;
  ui.tieCount.textContent = gameState.statistics.tieCount;
}

function updateSettingsUI() {
  // Update sound toggle
  if (gameState.settings.soundEnabled) {
    ui.soundToggle.classList.add('active');
    ui.soundToggle.setAttribute('aria-checked', 'true');
  } else {
    ui.soundToggle.classList.remove('active');
    ui.soundToggle.setAttribute('aria-checked', 'false');
  }
  
  // Update animation toggle
  if (gameState.settings.animationsEnabled) {
    ui.animationToggle.classList.add('active');
    ui.animationToggle.setAttribute('aria-checked', 'true');
    document.body.classList.remove('no-animations');
  } else {
    ui.animationToggle.classList.remove('active');
    ui.animationToggle.setAttribute('aria-checked', 'false');
    document.body.classList.add('no-animations');
  }
}

// SOUND EFFECTS
function playSound(type) {
  if (!gameState.settings.soundEnabled) return;
  
  // Create audio context for web audio API (more reliable than HTML5 audio)
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
      case 'move':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        break;
      case 'win':
        // Play a victory tune
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, i) => {
          setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            osc.start();
            osc.stop(audioContext.currentTime + 0.3);
          }, i * 150);
        });
        return; // Don't play the default sound
      case 'button':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.warn('Could not play sound:', error);
  }
}
function enableGameBoard() {
  gameBoard.allSquares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
    square.addEventListener("keydown", handleKeyPress);
    square.disabled = false;
  });
  gameState.isGameActive = true;
}

function disableGameBoard() {
  gameBoard.allSquares.forEach((square) => {
    square.removeEventListener("click", handleSquareClick);
    square.removeEventListener("keydown", handleKeyPress);
    square.disabled = true;
  });
  gameState.isGameActive = false;
}

function handleSquareClick(event) {
  if (!gameState.isGameActive || gameState.hasWinner) return;
  makeMove(event.target);
}

function handleKeyPress(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (!gameState.isGameActive || gameState.hasWinner) return;
    makeMove(event.target);
  }
}

function makeMove(square) {
  // Prevent moves if game has ended
  if (gameState.hasWinner || !gameState.isGameActive) {
    return;
  }
  
  if (square.classList.contains("cross") || square.classList.contains("circle")) {
    return; // Square already occupied
  }
  
  square.classList.add(gameState.currentSymbol);
  square.setAttribute('aria-label', `Square ${square.id.split('-')[1]} - ${gameState.currentSymbol === 'cross' ? 'X' : 'O'}`);
  
  // Add animation if enabled
  if (gameState.settings.animationsEnabled) {
    square.classList.add('fade-in-up');
    setTimeout(() => square.classList.remove('fade-in-up'), 300);
  }
  
  playSound('move');
  incrementMove();
}

// MOVE MANAGEMENT
function incrementMove() {
  // Check for win with current player (who just made the move)
  const playerWhoJustMoved = gameState.currentPlayer;
  
  if (checkForWin()) {
    return; // Game ended with a win, don't continue
  }
  
  if (checkForTie()) {
    return; // Game ended with a tie, don't continue
  }
  
  // Only increment and switch if game continues
  gameState.currentMove += 1;
  gameState.previousPlayer = gameState.currentPlayer;
  
  if (gameState.currentMove % 2 !== 0) {
    gameState.currentPlayer = gameState.players.playerOne;
    gameState.currentSymbol = "cross";
  } else {
    gameState.currentPlayer = gameState.players.playerTwo;
    gameState.currentSymbol = "circle";
  }
  
  updateGameStatus();
}

function updateGameStatus() {
  if (!gameState.hasWinner && gameState.isGameActive) {
    ui.infoText.textContent = `${gameState.currentPlayer.name}'s turn`;
  } else if (!gameState.isGameActive && !gameState.hasWinner) {
    ui.infoText.textContent = "Click the button to start";
  }
}

// WIN DETECTION
function checkForWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const squares = gameBoard.squares;
    
    if (squares[a].classList.contains("cross") && 
        squares[b].classList.contains("cross") && 
        squares[c].classList.contains("cross")) {
      handleWin(gameState.players.playerOne, combination);
      return true;
    }
    
    if (squares[a].classList.contains("circle") && 
        squares[b].classList.contains("circle") && 
        squares[c].classList.contains("circle")) {
      handleWin(gameState.players.playerTwo, combination);
      return true;
    }
  }
  return false;
}

function handleWin(winner, winningCombination) {
  winner.wins += 1;
  gameState.hasWinner = true;
  
  // Update statistics
  gameState.statistics.totalGames += 1;
  if (gameState.statistics.currentStreakPlayer === winner.name) {
    gameState.statistics.currentStreak += 1;
  } else {
    gameState.statistics.currentStreak = 1;
    gameState.statistics.currentStreakPlayer = winner.name;
  }
  
  // Highlight winning combination
  winningCombination.forEach(index => {
    gameBoard.squares[index].style.backgroundColor = '#90EE90';
    if (gameState.settings.animationsEnabled) {
      gameBoard.squares[index].classList.add('winning-square');
    }
  });
  
  // Celebrate animation
  if (gameState.settings.animationsEnabled) {
    ui.infoText.classList.add('celebrate');
    setTimeout(() => ui.infoText.classList.remove('celebrate'), 600);
  }
  
  updateScores();
  updateStatistics();
  ui.infoText.textContent = `🎉 ${winner.name} wins! 🎉`;
  
  playSound('win');
  disableGameBoard();
  
  // Save game state and auto-restart after showing winner
  saveGameState();
  setTimeout(() => {
    resetBoard();
  }, 2500);
}

function updateScores() {
  ui.playerOneScore.textContent = gameState.players.playerOne.wins;
  ui.playerTwoScore.textContent = gameState.players.playerTwo.wins;
  updateStatistics();
  saveGameState();
}

// TIE DETECTION
function checkForTie() {
  const allSquaresFilled = gameBoard.squares.every((square) => {
    return square.classList.contains("cross") || square.classList.contains("circle");
  });

  if (allSquaresFilled && !gameState.hasWinner) {
    gameState.statistics.totalGames += 1;
    gameState.statistics.tieCount += 1;
    gameState.statistics.currentStreak = 0;
    gameState.statistics.currentStreakPlayer = null;
    
    updateStatistics();
    ui.infoText.textContent = "🤝 It's a tie! 🤝";
    disableGameBoard();
    
    // Save game state
    saveGameState();
    setTimeout(() => {
      resetBoard();
    }, 2500);
    return true;
  }
  return false;
}

// GAME RESET
function resetBoard() {
  gameBoard.allSquares.forEach((square, index) => {
    square.classList.remove("cross", "circle");
    square.style.backgroundColor = "";
    square.setAttribute('aria-label', `Square ${index + 1}`);
  });
  
  gameState.currentMove = 1;
  gameState.currentPlayer = gameState.players.playerOne;
  gameState.currentSymbol = "cross";
  gameState.hasWinner = false;
  
  enableGameBoard();
  updateGameStatus();
}

function resetGame() {
  resetBoard();
  gameState.players.playerOne.wins = 0;
  gameState.players.playerTwo.wins = 0;
  updateScores();
}

// MODAL AND GAME INITIALIZATION
function showModal() {
  ui.modal.style.display = "flex";
  ui.modal.setAttribute('aria-hidden', 'false');
  document.getElementById("player1").focus();
}

function hideModal() {
  ui.modal.style.display = "none";
  ui.modal.setAttribute('aria-hidden', 'true');
}

function validatePlayerNames(name1, name2) {
  const errors = [];
  
  if (!name1.trim()) {
    errors.push("Player 1 name is required");
  }
  if (!name2.trim()) {
    errors.push("Player 2 name is required");
  }
  if (name1.trim().toLowerCase() === name2.trim().toLowerCase()) {
    errors.push("Player names must be different");
  }
  
  return errors;
}

function formatPlayerName(name) {
  return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
}

function initializeGame() {
  // Load saved data first
  loadGameState();
  
  // Ensure modal is hidden initially
  hideModal();
  
  // Start game button event
  ui.startGameBtn.addEventListener("click", () => {
    playSound('button');
    showModal();
  });
  
  // Settings panel events
  ui.settingsToggle.addEventListener("click", () => {
    playSound('button');
    const isVisible = ui.settingsPanel.style.display === 'block';
    ui.settingsPanel.style.display = isVisible ? 'none' : 'block';
  });
  
  // Sound toggle
  ui.soundToggle.addEventListener("click", () => {
    gameState.settings.soundEnabled = !gameState.settings.soundEnabled;
    updateSettingsUI();
    saveGameState();
    if (gameState.settings.soundEnabled) {
      playSound('button');
    }
  });
  
  // Animation toggle
  ui.animationToggle.addEventListener("click", () => {
    playSound('button');
    gameState.settings.animationsEnabled = !gameState.settings.animationsEnabled;
    updateSettingsUI();
    saveGameState();
  });
  
  // Reset scores button
  ui.resetScoresBtn.addEventListener("click", () => {
    playSound('button');
    if (confirm('Are you sure you want to reset all scores?')) {
      gameState.players.playerOne.wins = 0;
      gameState.players.playerTwo.wins = 0;
      gameState.statistics.totalGames = 0;
      gameState.statistics.currentStreak = 0;
      gameState.statistics.currentStreakPlayer = null;
      gameState.statistics.tieCount = 0;
      updateScores();
      updateStatistics();
      saveGameState();
    }
  });
  
  // Clear data button
  ui.clearDataBtn.addEventListener("click", () => {
    playSound('button');
    if (confirm('Are you sure you want to clear all saved data? This will reset everything.')) {
      localStorage.removeItem('ticTacToeGame');
      location.reload();
    }
  });
  
  // Close modal button event
  ui.closeModalBtn.addEventListener("click", () => {
    playSound('button');
    hideModal();
  });
  
  // Form submission event
  ui.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const player1Input = document.getElementById("player1").value;
    const player2Input = document.getElementById("player2").value;
    
    const errors = validatePlayerNames(player1Input, player2Input);
    
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Set player names
    gameState.players.playerOne.name = formatPlayerName(player1Input);
    gameState.players.playerTwo.name = formatPlayerName(player2Input);
    
    // Update UI
    ui.playerOneName.textContent = gameState.players.playerOne.name;
    ui.playerTwoName.textContent = gameState.players.playerTwo.name;

    // Reset the board and start the game (but keep scores)
    resetBoard();
    
    hideModal();
    ui.startGameBtn.textContent = "New Game";
    
    // Save the current state
    saveGameState();
    
    // Clear form
    ui.form.reset();
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && ui.modal.style.display === 'flex') {
      hideModal();
    }
  });
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
  
  // Initialize UI with saved data
  updateSettingsUI();
  updateStatistics();
  updatePlayerNames();
  updateScores();
  
  // Important: Initialize the game board state but don't enable it until players are set
  if (gameState.players.playerOne.name !== "Player 1" && gameState.players.playerTwo.name !== "Player 2") {
    enableGameBoard();
    updateGameStatus();
  }
  
  // Initialize dark mode after DOM is ready
  initializeDarkMode();
  
  // Initialize stats modal
  initializeStatsModal();
});

// Dark Mode Toggle Functionality
function initializeDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (!themeToggle) {
    console.error('Dark mode toggle button not found!');
    return;
  }

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  
  console.log('Dark mode initialized with theme:', currentTheme);

  // Update button icon based on theme
  function updateThemeIcon() {
    const theme = html.getAttribute('data-theme');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    console.log('Theme icon updated to:', themeToggle.textContent, 'for theme:', theme);
  }

  // Initialize theme icon
  updateThemeIcon();

  // Theme toggle event listener
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Toggling theme from', currentTheme, 'to', newTheme);
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Force a style recalculation
    document.body.style.display = 'none';
    document.body.offsetHeight; // trigger reflow
    document.body.style.display = '';
  });
}

// Stats Modal Functionality
function initializeStatsModal() {
  const statsModal = document.getElementById('statsModal');
  const statsToggle = document.getElementById('statsToggle');
  const closeStats = document.getElementById('closeStats');
  const exportStats = document.getElementById('exportStats');
  const resetStats = document.getElementById('resetStats');

  // Show stats modal
  statsToggle.addEventListener('click', () => {
    playSound('button');
    populateStatsGrid();
    statsModal.style.display = 'block';
  });

  // Close stats modal
  closeStats.addEventListener('click', () => {
    playSound('button');
    statsModal.style.display = 'none';
  });

  // Close modal when clicking outside
  statsModal.addEventListener('click', (e) => {
    if (e.target === statsModal) {
      statsModal.style.display = 'none';
    }
  });

  // Export stats functionality
  exportStats.addEventListener('click', () => {
    const data = {
      players: gameState.players,
      statistics: gameState.statistics,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tic-tac-toe-stats.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Reset stats functionality
  resetStats.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
      gameState.players.playerOne.wins = 0;
      gameState.players.playerTwo.wins = 0;
      gameState.statistics.totalGames = 0;
      gameState.statistics.currentStreak = 0;
      gameState.statistics.currentStreakPlayer = null;
      gameState.statistics.tieCount = 0;
      updateScores();
      updateStatistics();
      populateStatsGrid();
      saveGameState();
    }
  });
}

function populateStatsGrid() {
  const statsGrid = document.getElementById('statsGrid');
  const stats = gameState.statistics;
  const players = gameState.players;
  
  statsGrid.innerHTML = `
    <div class="stat-item">
      <span>Total Games:</span>
      <span>${stats.totalGames}</span>
    </div>
    <div class="stat-item">
      <span>${players.playerOne.name} Wins:</span>
      <span>${players.playerOne.wins}</span>
    </div>
    <div class="stat-item">
      <span>${players.playerTwo.name} Wins:</span>
      <span>${players.playerTwo.wins}</span>
    </div>
    <div class="stat-item">
      <span>Ties:</span>
      <span>${stats.tieCount}</span>
    </div>
    <div class="stat-item">
      <span>Current Streak:</span>
      <span>${stats.currentStreak} (${stats.currentStreakPlayer || 'None'})</span>
    </div>
  `;
}

// Game Timer and Move Counter
let gameTimer = {
  startTime: null,
  elapsedTime: 0,
  isRunning: false,
  isPaused: false,
  intervalId: null
};

let moveCount = 0;

const timerDisplay = document.getElementById('timerDisplay');
const moveCounter = document.getElementById('moveCounter');
const pauseBtn = document.getElementById('pauseBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const currentTime = gameTimer.isRunning && !gameTimer.isPaused 
    ? gameTimer.elapsedTime + Math.floor((Date.now() - gameTimer.startTime) / 1000)
    : gameTimer.elapsedTime;
  timerDisplay.textContent = formatTime(currentTime);
}

function startTimer() {
  if (!gameTimer.isRunning) {
    gameTimer.isRunning = true;
    gameTimer.startTime = Date.now();
    gameTimer.intervalId = setInterval(updateTimerDisplay, 1000);
  } else if (gameTimer.isPaused) {
    gameTimer.isPaused = false;
    gameTimer.startTime = Date.now();
  }
}

function pauseTimer() {
  if (gameTimer.isRunning && !gameTimer.isPaused) {
    gameTimer.isPaused = true;
    gameTimer.elapsedTime += Math.floor((Date.now() - gameTimer.startTime) / 1000);
    pauseBtn.textContent = '▶️ Resume';
  } else if (gameTimer.isPaused) {
    startTimer();
    pauseBtn.textContent = '⏸️ Pause';
  }
}

function resetTimer() {
  clearInterval(gameTimer.intervalId);
  gameTimer = {
    startTime: null,
    elapsedTime: 0,
    isRunning: false,
    isPaused: false,
    intervalId: null
  };
  moveCount = 0;
  timerDisplay.textContent = '00:00';
  moveCounter.textContent = 'Moves: 0';
  pauseBtn.textContent = '⏸️ Pause';
}

function incrementMoveCount() {
  moveCount++;
  moveCounter.textContent = `Moves: ${moveCount}`;
  
  // Start timer on first move
  if (moveCount === 1) {
    startTimer();
  }
}

// Event listeners
pauseBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// Integrate with existing game logic
const originalPlaceMarker = placeMarker;
function placeMarker(event) {
  const result = originalPlaceMarker(event);
  if (result) {
    incrementMoveCount();
  }
  return result;
}

// Undo Move Feature
let gameHistory = [];
let gameStatesHistory = [];

const undoBtn = document.getElementById('undoBtn');

function saveGameState() {
  const state = {
    boardState: [...board],
    currentPlayer: currentPlayer,
    gameState: { ...gameState },
    moveCount: moveCount,
    timerElapsed: gameTimer.elapsedTime + (gameTimer.isRunning && !gameTimer.isPaused ? 
      Math.floor((Date.now() - gameTimer.startTime) / 1000) : 0)
  };
  
  gameStatesHistory.push(state);
  gameHistory.push({
    squareIndex: null, // Will be set when move is made
    player: currentPlayer
  });
  
  // Limit history to last 10 moves
  if (gameStatesHistory.length > 10) {
    gameStatesHistory.shift();
    gameHistory.shift();
  }
  
  updateUndoButton();
}

function undoLastMove() {
  if (gameStatesHistory.length === 0) return;
  
  const lastState = gameStatesHistory.pop();
  const lastMove = gameHistory.pop();
  
  // Restore game state
  board = [...lastState.boardState];
  currentPlayer = lastState.currentPlayer;
  gameState = { ...lastState.gameState };
  moveCount = lastState.moveCount - 1;
  
  // Restore timer
  gameTimer.elapsedTime = lastState.timerElapsed;
  updateTimerDisplay();
  
  // Update UI
  squares.forEach((square, index) => {
    square.textContent = board[index];
    square.classList.remove('winning-square');
  });
  
  // Update displays
  moveCounter.textContent = `Moves: ${moveCount}`;
  gameStatus.textContent = currentPlayer === 'X' ? 
    `${gameState.player1Name}'s turn` : `${gameState.player2Name}'s turn`;
  
  // Update score display
  updateScoreDisplay();
  
  updateUndoButton();
}

function updateUndoButton() {
  undoBtn.disabled = gameStatesHistory.length === 0 || gameState.gameActive === false;
}

// Event listener
undoBtn.addEventListener('click', undoLastMove);

// Integrate with existing move function
const originalPlaceMarkerWithHistory = placeMarker;
function placeMarker(event) {
  if (gameState.gameActive) {
    saveGameState();
    // Set the square index for the current move
    const squareIndex = event.target.getAttribute('data-square-index');
    if (gameHistory.length > 0) {
      gameHistory[gameHistory.length - 1].squareIndex = parseInt(squareIndex);
    }
  }
  
  const result = originalPlaceMarkerWithHistory(event);
  updateUndoButton();
  return result;
}

// Initialize undo button state
updateUndoButton();

// Keyboard Navigation Support
let currentFocusIndex = 4; // Start at center square
let keyboardMode = false;

function updateSquareFocus() {
  squares.forEach((square, index) => {
    square.classList.remove('focused');
    if (index === currentFocusIndex) {
      square.classList.add('focused');
      square.focus();
    }
  });
}

function moveGridFocus(direction) {
  const row = Math.floor(currentFocusIndex / 3);
  const col = currentFocusIndex % 3;
  
  switch(direction) {
    case 'ArrowUp':
      if (row > 0) currentFocusIndex -= 3;
      break;
    case 'ArrowDown':
      if (row < 2) currentFocusIndex += 3;
      break;
    case 'ArrowLeft':
      if (col > 0) currentFocusIndex -= 1;
      break;
    case 'ArrowRight':
      if (col < 2) currentFocusIndex += 1;
      break;
  }
  
  updateSquareFocus();
}

function handleKeyboardInput(event) {
  if (!gameState.gameActive && !['KeyR', 'KeyP', 'KeyU'].includes(event.code)) {
    return;
  }
  
  keyboardMode = true;
  document.body.classList.add('keyboard-active');
  
  switch(event.code) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      event.preventDefault();
      moveGridFocus(event.key);
      break;
      
    case 'Space':
    case 'Enter':
      event.preventDefault();
      if (squares[currentFocusIndex] && squares[currentFocusIndex].textContent === '') {
        squares[currentFocusIndex].click();
      }
      break;
      
    case 'KeyU':
      event.preventDefault();
      if (!undoBtn.disabled) {
        undoBtn.click();
      }
      break;
      
    case 'KeyR':
      event.preventDefault();
      resetTimerBtn.click();
      currentFocusIndex = 4;
      updateSquareFocus();
      break;
      
    case 'KeyP':
      event.preventDefault();
      pauseBtn.click();
      break;
      
    case 'Escape':
      keyboardMode = false;
      document.body.classList.remove('keyboard-active');
      squares.forEach(square => square.classList.remove('focused'));
      break;
  }
}

// Mouse interaction disables keyboard mode
function handleMouseEnter() {
  if (keyboardMode) {
    keyboardMode = false;
    document.body.classList.remove('keyboard-active');
    squares.forEach(square => square.classList.remove('focused'));
  }
}

// Event listeners
document.addEventListener('keydown', handleKeyboardInput);
squares.forEach(square => {
  square.addEventListener('mouseenter', handleMouseEnter);
  square.setAttribute('tabindex', '0');
});

// Initialize keyboard help visibility
document.getElementById('keyboardHelp').style.display = 
  window.innerWidth > 768 ? 'block' : 'none';

window.addEventListener('resize', () => {
  document.getElementById('keyboardHelp').style.display = 
    window.innerWidth > 768 ? 'block' : 'none';
});

// Advanced Game Statistics
let gameStats = {
  totalGames: 0,
  wins: { player1: 0, player2: 0 },
  draws: 0,
  totalMoves: 0,
  totalTime: 0,
  bestTime: null,
  fastestWin: null,
  currentStreak: { player: null, count: 0 },
  longestStreak: { player: null, count: 0 },
  averageMovesPerGame: 0,
  gamesThisSession: 0
};

// Load stats from localStorage
function loadStats() {
  const saved = localStorage.getItem('ticTacToeStats');
  if (saved) {
    gameStats = { ...gameStats, ...JSON.parse(saved) };
  }
}

// Save stats to localStorage
function saveStats() {
  localStorage.setItem('ticTacToeStats', JSON.stringify(gameStats));
}

// Update stats when game ends
function updateGameStats(winner, gameTime, moves) {
  gameStats.totalGames++;
  gameStats.gamesThisSession++;
  gameStats.totalMoves += moves;
  gameStats.totalTime += gameTime;
  
  if (winner === 'tie') {
    gameStats.draws++;
    gameStats.currentStreak = { player: null, count: 0 };
  } else {
    const player = winner === 'X' ? 'player1' : 'player2';
    gameStats.wins[player]++;
    
    // Update streak
    if (gameStats.currentStreak.player === player) {
      gameStats.currentStreak.count++;
    } else {
      gameStats.currentStreak = { player, count: 1 };
    }
    
    // Check longest streak
    if (gameStats.currentStreak.count > gameStats.longestStreak.count) {
      gameStats.longestStreak = { ...gameStats.currentStreak };
    }
    
    // Update fastest win
    if (!gameStats.fastestWin || gameTime < gameStats.fastestWin) {
      gameStats.fastestWin = gameTime;
    }
  }
  
  // Update best time (overall)
  if (!gameStats.bestTime || gameTime < gameStats.bestTime) {
    gameStats.bestTime = gameTime;
  }
  
  // Calculate averages
  gameStats.averageMovesPerGame = Math.round(gameStats.totalMoves / gameStats.totalGames * 10) / 10;
  
  saveStats();
}

// Display statistics
function displayStats() {
  const statsGrid = document.getElementById('statsGrid');
  const avgTime = gameStats.totalGames > 0 ? Math.round(gameStats.totalTime / gameStats.totalGames) : 0;
  
  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${gameStats.totalGames}</div>
      <div class="stat-label">Total Games</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.wins.player1}</div>
      <div class="stat-label">Player 1 Wins</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.wins.player2}</div>
      <div class="stat-label">Player 2 Wins</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.draws}</div>
      <div class="stat-label">Draws</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.bestTime ? formatTime(gameStats.bestTime) : '--'}</div>
      <div class="stat-label">Best Time</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.fastestWin ? formatTime(gameStats.fastestWin) : '--'}</div>
      <div class="stat-label">Fastest Win</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.longestStreak.count || 0}</div>
      <div class="stat-label">Longest Win Streak</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${gameStats.averageMovesPerGame || 0}</div>
      <div class="stat-label">Avg Moves/Game</div>
    </div>
  `;
}

// Export statistics
function exportStats() {
  const data = {
    ...gameStats,
    exportDate: new Date().toISOString(),
    version: '2.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tic-tac-toe-stats-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Reset all statistics
function resetAllStats() {
  if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
    gameStats = {
      totalGames: 0,
      wins: { player1: 0, player2: 0 },
      draws: 0,
      totalMoves: 0,
      totalTime: 0,
      bestTime: null,
      fastestWin: null,
      currentStreak: { player: null, count: 0 },
      longestStreak: { player: null, count: 0 },
      averageMovesPerGame: 0,
      gamesThisSession: 0
    };
    saveStats();
    displayStats();
  }
}
