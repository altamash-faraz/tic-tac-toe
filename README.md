# 🎮 Enhanced Tic Tac Toe Game# 🎮 Tic Tac Toe Game



A modern, feature-rich Tic Tac Toe game with advanced functionality, dark mode, keyboard navigation, and comprehensive statistics tracking.A modern, responsive, and accessible Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript.



## 🌟 Features## 🚀 [Play Live Game](https://tic-tac-toe-simplegame.vercel.app/)



### Core Game Features## 🌟 Features

- **Two-Player Gameplay**: Classic Tic Tac Toe for two human players

- **Custom Player Names**: Set personalized names (up to 12 characters each)- **Two-Player Gameplay**: Classic Tic Tac Toe for two human players

- **Score Tracking**: Keep track of wins for each player across multiple rounds- **Custom Player Names**: Set personalized names (up to 12 characters each)

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices- **Score Tracking**: Keep track of wins for each player across multiple rounds

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Enhanced Features- **Accessibility Features**:

- **🌙 Dark Mode Toggle**: Switch between light and dark themes with persistence  - Keyboard navigation support

- **⏱️ Game Timer**: Track game duration with pause/resume functionality  - Screen reader friendly

- **🎯 Move Counter**: Monitor the number of moves made in each game  - ARIA labels and semantic HTML

- **↶ Undo Feature**: Undo up to 10 previous moves with full state restoration  - Focus indicators

- **⌨️ Keyboard Navigation**: Complete keyboard control with arrow keys and shortcuts- **Visual Feedback**:

- **📊 Advanced Statistics**: Comprehensive game analytics and data export  - Winning combination highlighting

  - Smooth hover animations

### Accessibility Features  - Game status updates

- **Keyboard Navigation**: Full game playable without mouse- **Modern UI**: Clean, gradient-based design with smooth transitions

  - Arrow keys for navigation

  - Space/Enter to place markers## Getting Started

  - U for undo, R for reset, P for pause/resume

- **Screen Reader Friendly**: ARIA labels and semantic HTML### Live Demo

- **Focus Indicators**: Clear visual focus states

- **High Contrast**: Optimized color ratios for readability🎮 **[Play the game now!](https://tic-tac-toe-simplegame.vercel.app/)**



### Statistics & Analytics### Local Development

- **Game Tracking**: Total games, wins, draws, and streaks

- **Performance Metrics**: Best times, fastest wins, average moves per game#### Prerequisites

- **Data Export**: Download statistics as JSON file

- **Persistent Storage**: All data saved locally- A modern web browser (Chrome, Firefox, Safari, Edge)

- No additional software installation required

## 🚀 Getting Started

#### Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)1. **Clone the repository**:

- No additional software installation required

   ```bash

### Installation   git clone https://github.com/altamash-faraz/tic-tac-toe-game.git

1. **Clone the repository**:   cd tic-tac-toe-game

   ```bash   ```

   git clone https://github.com/altamash-faraz/enhanced-tic-tac-toe.git

   cd enhanced-tic-tac-toe2. **Open the game**:

   ```   - Double-click `index.html` to open in your default browser

   - Or serve with a local web server:

2. **Open the game**:

   - Double-click `index.html` to open in your default browser     ```bash

   - Or serve with a local web server for better experience     # Python 3

     python -m http.server 8000

3. **Play!**: Enjoy the enhanced Tic Tac Toe experience     

     # Python 2

## 🎮 How to Play     python -m SimpleHTTPServer 8000

     

### Basic Controls     # Node.js (with live-server)

- **Mouse**: Click on empty squares to place your marker     npx live-server

- **Touch**: Tap on empty squares (mobile devices)     ```



### Keyboard Controls3. **Play!**: Navigate to `http://localhost:8000` if using a local server

- **Arrow Keys**: Navigate between squares

- **Space/Enter**: Place marker on selected square## 📁 Project Structure

- **U**: Undo last move

- **R**: Reset game and timer```text

- **P**: Pause/Resume timertic-tac-toe/

- **Escape**: Exit keyboard navigation mode├── index.html          # Main HTML structure

├── style.css          # Styling and responsive design

### Game Features├── script.js          # Game logic and interactions

- **Timer**: Automatically starts with the first move├── README.md          # Project documentation

- **Move Counter**: Tracks moves made in current game├── cross.png          # X symbol image

- **Undo**: Go back up to 10 moves (disabled after game ends)└── circle.png         # O symbol image

- **Statistics**: View detailed analytics by clicking the 📊 button```

- **Dark Mode**: Toggle with the 🌙 button

## 🎨 Design Features

## 📁 Project Structure

### Color Scheme

```text

enhanced-tic-tac-toe/- **Primary**: Green gradient background (`#04392e` to `#009966`)

├── index.html              # Main HTML structure- **Secondary**: Brown gradient for game board (`#633d00` to `#955d00`)

├── style.css              # Core game styling- **Accent**: Gold color for highlights (`#ffd900`)

├── dark-mode.css          # Dark mode theme styles- **UI Elements**: White backgrounds with dark borders

├── timer-styles.css       # Timer and controls styling

├── stats-modal.css        # Statistics modal styling### Typography

├── script.js              # Complete game logic and features

├── cross.png              # X symbol image- **Font Family**: Poppins (Google Fonts)

├── circle.png             # O symbol image- **Responsive Text**: Scales appropriately on different screen sizes

├── README.md              # Project documentation

├── LICENSE                # MIT License### Responsive Breakpoints

└── .gitignore            # Git ignore rules

```- **Desktop**: Full layout with side-by-side elements

- **Mobile** (`max-width: 1100px`): Stacked layout with adjusted sizing

## 🎨 Themes

## ♿ Accessibility Features

### Light Mode (Default)

- Clean, bright interface with green gradients- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<aside>` elements

- High contrast for excellent readability- **ARIA Labels**: Comprehensive labeling for screen readers

- Professional appearance- **Keyboard Navigation**: Full game playable without mouse

- **Focus Management**: Clear focus indicators and logical tab order

### Dark Mode- **Color Contrast**: High contrast ratios for text readability

- Modern dark theme with blue accents

- Reduced eye strain for extended play## 🔧 Technical Implementation

- Automatic theme persistence

### Key JavaScript Features

## 📊 Statistics Tracked

- **Modular Code Structure**: Organized into logical sections

- **Total Games Played**- **Event Management**: Proper event listener handling

- **Individual Player Wins**- **State Management**: Centralized game state object

- **Number of Draws**- **Input Validation**: Player name validation and error handling

- **Best Overall Time**- **Accessibility Support**: Keyboard event handling

- **Fastest Win Time**

- **Longest Win Streak**### Browser Compatibility

- **Average Moves Per Game**

- **Session Statistics**- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

- **JavaScript Features**: ES6+ syntax (const/let, arrow functions, template literals)

## 🛠️ Technical Features- **CSS Features**: Grid, Flexbox, CSS custom properties



### Performance## 🔄 Game Rules

- **Lightweight**: Vanilla JavaScript, no frameworks

- **Fast Loading**: Optimized assets and code1. The game is played on a 3x3 grid

- **Smooth Animations**: Hardware-accelerated transitions2. Player 1 is X (cross), Player 2 is O (circle)

- **Memory Efficient**: Clean state management3. Players take turns placing their mark in empty squares

4. First player to get 3 marks in a row (horizontal, vertical, or diagonal) wins

### Browser Compatibility5. If all squares are filled with no winner, the game is a tie

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+6. Scores are tracked across multiple rounds

- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet7. Games automatically reset after each round

- **Progressive Enhancement**: Graceful degradation on older browsers

## 🛠️ Customization

### Storage

- **Local Storage**: Game preferences and statistics### Styling

- **Data Persistence**: Settings maintained across sessions

- **Export/Import**: JSON format for data portability- Modify CSS custom properties in `:root` to change colors

- Adjust grid size in `#grid` styles

## 🤝 Contributing- Update font family imports



1. Fork the repository### Game Logic

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)- Modify winning combinations in `winningCombinations` array

4. Push to the branch (`git push origin feature/amazing-feature`)- Adjust player name length limits in HTML `maxlength` attribute

5. Open a Pull Request- Customize auto-reset timing in `setTimeout` calls



## 📄 License## 📱 Mobile Experience



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.The game is fully responsive and optimized for mobile devices:



## 🙏 Acknowledgments- Touch-friendly button sizes

- Readable text on small screens

- Original Tic Tac Toe concept- Adjusted layout for portrait orientation

- Modern web development practices- Smooth touch interactions

- Accessibility guidelines (WCAG 2.1)

- User experience best practices## 🤝 Contributing



## 📧 Contact1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

Project Link: [https://github.com/altamash-faraz/enhanced-tic-tac-toe](https://github.com/altamash-faraz/enhanced-tic-tac-toe)3. Commit your changes (`git commit -m 'Add amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)

---5. Open a Pull Request



**Enjoy the enhanced gaming experience! 🎉**## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons from custom assets
- Poppins font from Google Fonts
- Inspiration from classic Tic Tac Toe gameplay

## 📧 Contact

Project Link: [https://github.com/altamash-faraz/tic-tac-toe-game](https://github.com/altamash-faraz/tic-tac-toe-game)

Live Demo: [https://tic-tac-toe-simplegame.vercel.app/](https://tic-tac-toe-simplegame.vercel.app/)

---

Enjoy playing! 🎉
