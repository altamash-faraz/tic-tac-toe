# 🎮 Tic Tac Toe Game

A modern, responsive, and accessible Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript.

## 🚀 [Play Live Game](https://tic-tac-toe-simplegame.vercel.app/)

## 🌟 Features

- **Two-Player Gameplay**: Classic Tic Tac Toe for two human players
- **Custom Player Names**: Set personalized names (up to 12 characters each)
- **Score Tracking**: Keep track of wins for each player across multiple rounds
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility Features**:
  - Keyboard navigation support
  - Screen reader friendly
  - ARIA labels and semantic HTML
  - Focus indicators
- **Visual Feedback**:
  - Winning combination highlighting
  - Smooth hover animations
  - Game status updates
- **Modern UI**: Clean, gradient-based design with smooth transitions

## Getting Started

### Live Demo

🎮 **[Play the game now!](https://tic-tac-toe-simplegame.vercel.app/)**

### Local Development

#### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

#### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/altamash-faraz/tic-tac-toe-game.git
   cd tic-tac-toe-game
   ```

2. **Open the game**:
   - Double-click `index.html` to open in your default browser
   - Or serve with a local web server:

     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with live-server)
     npx live-server
     ```

3. **Play!**: Navigate to `http://localhost:8000` if using a local server

## 📁 Project Structure

```text
tic-tac-toe/
├── index.html          # Main HTML structure
├── style.css          # Styling and responsive design
├── script.js          # Game logic and interactions
├── README.md          # Project documentation
├── cross.png          # X symbol image
└── circle.png         # O symbol image
```

## 🎨 Design Features

### Color Scheme

- **Primary**: Green gradient background (`#04392e` to `#009966`)
- **Secondary**: Brown gradient for game board (`#633d00` to `#955d00`)
- **Accent**: Gold color for highlights (`#ffd900`)
- **UI Elements**: White backgrounds with dark borders

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Responsive Text**: Scales appropriately on different screen sizes

### Responsive Breakpoints

- **Desktop**: Full layout with side-by-side elements
- **Mobile** (`max-width: 1100px`): Stacked layout with adjusted sizing

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<aside>` elements
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full game playable without mouse
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: High contrast ratios for text readability

## 🔧 Technical Implementation

### Key JavaScript Features

- **Modular Code Structure**: Organized into logical sections
- **Event Management**: Proper event listener handling
- **State Management**: Centralized game state object
- **Input Validation**: Player name validation and error handling
- **Accessibility Support**: Keyboard event handling

### Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript Features**: ES6+ syntax (const/let, arrow functions, template literals)
- **CSS Features**: Grid, Flexbox, CSS custom properties

## 🔄 Game Rules

1. The game is played on a 3x3 grid
2. Player 1 is X (cross), Player 2 is O (circle)
3. Players take turns placing their mark in empty squares
4. First player to get 3 marks in a row (horizontal, vertical, or diagonal) wins
5. If all squares are filled with no winner, the game is a tie
6. Scores are tracked across multiple rounds
7. Games automatically reset after each round

## 🛠️ Customization

### Styling

- Modify CSS custom properties in `:root` to change colors
- Adjust grid size in `#grid` styles
- Update font family imports

### Game Logic

- Modify winning combinations in `winningCombinations` array
- Adjust player name length limits in HTML `maxlength` attribute
- Customize auto-reset timing in `setTimeout` calls

## 📱 Mobile Experience

The game is fully responsive and optimized for mobile devices:

- Touch-friendly button sizes
- Readable text on small screens
- Adjusted layout for portrait orientation
- Smooth touch interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

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
