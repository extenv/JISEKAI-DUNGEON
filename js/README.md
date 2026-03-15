# Jisekai Dungeon - Code Structure

## Project Structure

```
JISEKAI-DUNGEON/
├── index.html          # Main HTML file (entry point)
├── css/
│   └── styles.css      # All CSS styles
├── js/
│   ├── data.js         # Character data (Hiragana, Katakana, Kanji, Phrases)
│   ├── audio.js        # Sound effects module
│   ├── storage.js      # LocalStorage management
│   ├── quiz.js         # Quiz generation logic
│   ├── canvas.js       # Writing/drawing canvas functionality
│   └── game.js         # Main Alpine.js game component
├── docs/               # Documentation files
└── GIF/                # Character GIF images
```

## Module Descriptions

### `js/data.js`
Contains all character data:
- `HIRAGANA` - 46 basic Hiragana characters
- `KATAKANA` - 46 Katakana characters
- `KANJI` - 20 basic Kanji characters
- `DAILY_PHRASES` - 10 common Japanese phrases

### `js/audio.js`
Audio module for sound effects:
- `AudioModule.init()` - Initialize Web Audio API
- `AudioModule.playCorrectSound()` - Play correct answer sound
- `AudioModule.playWrongSound()` - Play wrong answer sound

### `js/storage.js`
LocalStorage management:
- `StorageModule.loadPlayerData()` - Load saved player progress
- `StorageModule.savePlayerData()` - Save player progress
- `StorageModule.changeName()` - Update player name

### `js/quiz.js`
Quiz generation and logic:
- `QuizModule.generateQuiz()` - Generate quiz questions
- `QuizModule.checkAnswer()` - Validate answers
- `QuizModule.generateDungeonChallenge()` - Create dungeon challenges
- `QuizModule.shuffleArray()` - Shuffle array elements

### `js/canvas.js`
Writing canvas functionality:
- `WritingModule.setupCanvas()` - Initialize drawing canvas
- `WritingModule.clearCanvas()` - Clear the canvas
- `WritingModule.getWritingTitle()` - Get screen title
- Mouse and touch event handlers for drawing

### `js/game.js`
Main game component (Alpine.js):
- Game state management
- Screen navigation
- Player progression system
- Integrates all modules

### `css/styles.css`
All custom CSS styles:
- Retro font styling
- Pixel border effects
- Button animations
- Background patterns
- Keyframe animations

## Adding New Features

### New Character Type
1. Add data to `js/data.js`
2. Update `game.js` with new state and methods
3. Add UI in `index.html`

### New Screen
1. Add screen HTML in `index.html`
2. Add navigation method in `js/game.js`
3. Add styles in `css/styles.css` if needed

### New Module
1. Create new file in `js/` folder
2. Export functionality as an object
3. Import in `index.html` before `game.js`

## Dependencies

- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **Alpine.js** (CDN) - Lightweight JavaScript framework
- **Press Start 2P** (Google Fonts) - Retro gaming font

## Browser Support

Modern browsers with support for:
- ES6+ JavaScript
- Web Audio API
- Canvas API
- LocalStorage
