// OPTIMIZED TIC TAC TOE GAME - CONCISE VERSION
// DOM Elements
const $ = id => document.getElementById(id);
const squares = Array.from({length: 9}, (_, i) => $(`grid__square-${i+1}`));

// Game State
const game = {
  players: [
    { name: "Player 1", wins: 0, symbol: "cross" },
    { name: "Player 2", wins: 0, symbol: "circle" }
  ],
  current: 0,
  move: 1,
  active: false,
  settings: { sound: true, animations: true }
};

// Utility Functions
const save = () => localStorage.setItem('ttt', JSON.stringify(game));
const load = () => {
  try {
    const data = JSON.parse(localStorage.getItem('ttt'));
    if (data) Object.assign(game, data);
  } catch (e) {}
};

const playSound = type => {
  if (!game.settings.sound) return;
  const ctx = new (AudioContext || webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain).connect(ctx.destination);
  
  const freq = type === 'win' ? 880 : type === 'move' ? 440 : 220;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
};

// Game Logic
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns  
  [0,4,8], [2,4,6]           // diagonals
];

const checkWin = () => {
  const symbol = game.players[game.current].symbol;
  return winPatterns.find(pattern => 
    pattern.every(i => squares[i].classList.contains(symbol))
  );
};

const checkTie = () => squares.every(sq => sq.classList.contains('cross') || sq.classList.contains('circle'));

const updateUI = () => {
  $('info__player__name1').textContent = game.players[0].name;
  $('info__player__name2').textContent = game.players[1].name;
  $('info__player__score1').textContent = game.players[0].wins;
  $('info__player__score2').textContent = game.players[1].wins;
  $('instructions__text').textContent = game.active 
    ? `${game.players[game.current].name}'s turn`
    : 'Click Start Game';
};

const resetBoard = () => {
  squares.forEach(sq => {
    sq.className = 'grid__square';
    sq.setAttribute('aria-label', `Square ${squares.indexOf(sq) + 1}`);
  });
  game.current = 0;
  game.move = 1;
  game.active = true;
  updateUI();
};

const makeMove = sq => {
  if (!game.active || sq.classList.contains('cross') || sq.classList.contains('circle')) return;
  
  const symbol = game.players[game.current].symbol;
  sq.classList.add(symbol);
  sq.setAttribute('aria-label', `Square ${squares.indexOf(sq) + 1} - ${symbol === 'cross' ? 'X' : 'O'}`);
  
  if (game.settings.animations) {
    sq.style.animation = 'fadeInUp 0.3s ease';
    setTimeout(() => sq.style.animation = '', 300);
  }
  
  playSound('move');
  
  const winPattern = checkWin();
  if (winPattern) {
    game.players[game.current].wins++;
    game.active = false;
    winPattern.forEach(i => squares[i].style.background = '#4ade80');
    $('instructions__text').textContent = `${game.players[game.current].name} wins!`;
    playSound('win');
    save();
    return;
  }
  
  if (checkTie()) {
    game.active = false;
    $('instructions__text').textContent = "It's a tie!";
    playSound('tie');
    save();
    return;
  }
  
  game.current = 1 - game.current;
  game.move++;
  updateUI();
};

// Modal Functions
const showModal = () => {
  $('modal').style.display = 'flex';
  $('player1').focus();
};

const hideModal = () => {
  $('modal').style.display = 'none';
};

// Settings Functions
const toggleSettings = () => {
  const panel = $('settings-panel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  playSound('button');
};

const toggleSound = () => {
  game.settings.sound = !game.settings.sound;
  $('sound-toggle').classList.toggle('active', game.settings.sound);
  save();
  if (game.settings.sound) playSound('button');
};

const toggleAnimations = () => {
  game.settings.animations = !game.settings.animations;
  $('animation-toggle').classList.toggle('active', game.settings.animations);
  document.body.classList.toggle('no-animations', !game.settings.animations);
  save();
  playSound('button');
};

const resetScores = () => {
  if (confirm('Reset all scores?')) {
    game.players.forEach(p => p.wins = 0);
    updateUI();
    save();
    playSound('button');
  }
};

// Dark Mode
const initDarkMode = () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  
  const toggle = $('themeToggle');
  if (!toggle) return;
  
  const updateIcon = () => {
    const current = document.documentElement.getAttribute('data-theme');
    toggle.textContent = current === 'dark' ? '☀️' : '🌙';
  };
  
  updateIcon();
  toggle.onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
    playSound('button');
  };
};

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
  load();
  updateUI();
  initDarkMode();
  
  // Hide settings panel initially
  $('settings-panel').style.display = 'none';
  
  // Game board events
  squares.forEach(sq => sq.onclick = () => makeMove(sq));
  
  // UI Events
  $('instructions__btn').onclick = showModal;
  $('close-modal-btn').onclick = hideModal;
  $('settings-toggle').onclick = toggleSettings;
  $('sound-toggle').onclick = toggleSound;
  $('animation-toggle').onclick = toggleAnimations;
  $('reset-scores').onclick = resetScores;
  $('clear-data').onclick = () => {
    if (confirm('Clear all data?')) {
      localStorage.removeItem('ttt');
      location.reload();
    }
  };
  
  // Form submission
  $('player-form').onsubmit = e => {
    e.preventDefault();
    const p1 = $('player1').value.trim();
    const p2 = $('player2').value.trim();
    
    if (!p1 || !p2 || p1.toLowerCase() === p2.toLowerCase()) {
      alert('Please enter valid, different player names');
      return;
    }
    
    game.players[0].name = p1.charAt(0).toUpperCase() + p1.slice(1).toLowerCase();
    game.players[1].name = p2.charAt(0).toUpperCase() + p2.slice(1).toLowerCase();
    
    resetBoard();
    hideModal();
    $('instructions__btn').textContent = 'New Game';
    $('player-form').reset();
    save();
  };
  
  // Keyboard support
  document.onkeydown = e => {
    if (e.key === 'Escape' && $('modal').style.display === 'flex') {
      hideModal();
    }
  };
  
  // Initialize settings UI
  $('sound-toggle').classList.toggle('active', game.settings.sound);
  $('animation-toggle').classList.toggle('active', game.settings.animations);
  document.body.classList.toggle('no-animations', !game.settings.animations);
});

// CSS Animation for moves
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);