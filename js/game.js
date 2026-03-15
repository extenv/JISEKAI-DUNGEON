/**
 * Jisekai Dungeon - Main Game Application
 * Alpine.js component for game state management
 */

function gameApp() {
    return {
        // Game state
        currentScreen: 'main',
        currentLearningType: '',
        profileOpen: false,
        newName: '',

        // Quiz state
        quizQuestions: [],
        currentQuestionIndex: 0,
        currentQuestion: {},
        quizScore: 0,
        answerChecked: false,
        answerCorrect: false,
        selectedAnswer: '',

        // Dungeon state
        dungeonChallenge: {},
        dungeonAnswerChecked: false,
        dungeonAnswerCorrect: false,
        selectedDungeonAnswer: '',

        // Writing state
        writingCharacterIndex: 0,
        isDrawing: false,
        ctx: null,
        lastX: 0,
        lastY: 0,

        // Player data
        player: {
            name: 'Adventurer',
            level: 1,
            exp: 0,
            expToNextLevel: 100,
            hiraganaLearned: 0,
            katakanaLearned: 0,
            kanjiLearned: 0,
            phrasesLearned: 0,
            kanjiGoal: 10,
            dungeonFloor: 1
        },

        // Character data (loaded from data.js)
        hiragana: HIRAGANA,
        katakana: KATAKANA,
        kanji: KANJI,
        dailyPhrases: DAILY_PHRASES,

        // Initialize the game
        init() {
            this.player = StorageModule.loadPlayerData();
            this.newName = this.player.name;
            AudioModule.init();
        },

        // Start learning a character type
        startLearning(type) {
            this.currentLearningType = type;
            this.currentScreen = 'learning';
        },

        // Start writing practice
        startWriting(type) {
            this.currentLearningType = type;
            this.writingCharacterIndex = 0;
            this.currentScreen = 'writing';
            // Initialize canvas after screen is shown
            setTimeout(() => this.initCanvas(), 50);
        },

        // Initialize canvas for writing screen
        initCanvas() {
            WritingModule.setupCanvas(this);
            WritingModule.clearCanvas(this);
        },

        // Get characters for current learning type
        getCurrentCharacters() {
            if (this.currentLearningType === 'hiragana') return this.hiragana;
            if (this.currentLearningType === 'katakana') return this.katakana;
            if (this.currentType === 'kanji') return this.kanji;
            return [];
        },

        // Check if character is learned
        isCharacterLearned(char) {
            if (this.currentLearningType === 'hiragana') {
                return this.player.hiraganaLearned > 0;
            } else if (this.currentLearningType === 'katakana') {
                return this.player.katakanaLearned > 0;
            } else if (this.currentLearningType === 'kanji') {
                return this.player.kanjiLearned > 0;
            } else if (this.currentLearningType === 'phrases') {
                return this.player.phrasesLearned > 0;
            }
            return false;
        },

        // Get learning progress
        getLearningProgress() {
            if (this.currentLearningType === 'hiragana') {
                return `${this.player.hiraganaLearned}/${this.hiragana.length}`;
            } else if (this.currentLearningType === 'katakana') {
                return `${this.player.katakanaLearned}/${this.katakana.length}`;
            } else if (this.currentLearningType === 'kanji') {
                return `${this.player.kanjiLearned}/${this.player.kanjiGoal}`;
            } else if (this.currentLearningType === 'phrases') {
                return `${this.player.phrasesLearned}/${this.dailyPhrases.length}`;
            }
            return '0/0';
        },

        // Get learning title
        getLearningTitle() {
            if (this.currentLearningType === 'hiragana') return 'HIRAGANA TRAINING';
            if (this.currentLearningType === 'katakana') return 'KATAKANA TRAINING';
            if (this.currentLearningType === 'kanji') return 'KANJI TRAINING';
            if (this.currentLearningType === 'phrases') return 'DAILY PHRASES';
            return '';
        },

        // Get learning description
        getLearningDescription() {
            if (this.currentLearningType === 'hiragana') return 'Learn the basic Japanese syllabary';
            if (this.currentLearningType === 'katakana') return 'Learn the syllabary used for foreign words';
            if (this.currentLearningType === 'kanji') return 'Learn Chinese characters used in Japanese';
            if (this.currentLearningType === 'phrases') return 'Learn useful everyday Japanese phrases';
            return '';
        },

        // Get quiz title
        getQuizTitle() {
            if (this.currentLearningType === 'hiragana') return 'HIRAGANA QUIZ';
            if (this.currentLearningType === 'katakana') return 'KATAKANA QUIZ';
            if (this.currentLearningType === 'kanji') return 'KANJI QUIZ';
            if (this.currentLearningType === 'phrases') return 'PHRASES QUIZ';
            return '';
        },

        // Get writing title
        getWritingTitle() {
            return WritingModule.getWritingTitle(this.currentLearningType);
        },

        // Start quiz for current learning type
        startQuiz() {
            const characters = this.getCurrentCharacters();
            this.quizQuestions = QuizModule.generateQuiz(
                this.currentLearningType,
                characters,
                this.dailyPhrases
            );

            this.currentQuestionIndex = 0;
            this.quizScore = 0;
            this.currentQuestion = this.quizQuestions[0];
            this.currentScreen = 'quiz';
            this.answerChecked = false;
        },

        // Check answer in quiz
        checkAnswer(selected) {
            this.selectedAnswer = selected;
            this.answerChecked = true;
            this.answerCorrect = QuizModule.checkAnswer(selected, this.currentQuestion.answer);

            if (this.answerCorrect) {
                AudioModule.playCorrectSound();
                this.quizScore++;
            } else {
                AudioModule.playWrongSound();
            }
        },

        // Move to next question
        nextQuestion() {
            this.currentQuestionIndex++;

            if (this.currentQuestionIndex < this.quizQuestions.length) {
                this.currentQuestion = this.quizQuestions[this.currentQuestionIndex];
                this.answerChecked = false;
            } else {
                // Quiz completed
                this.awardExp(this.quizScore * 10);

                // Update learned count if this was the first successful quiz
                if (this.quizScore >= 3) {
                    if (this.currentLearningType === 'hiragana' && this.player.hiraganaLearned === 0) {
                        this.player.hiraganaLearned = 10;
                    } else if (this.currentLearningType === 'katakana' && this.player.katakanaLearned === 0) {
                        this.player.katakanaLearned = 10;
                    } else if (this.currentLearningType === 'kanji' && this.player.kanjiLearned === 0) {
                        this.player.kanjiLearned = 5;
                    } else if (this.currentLearningType === 'phrases' && this.player.phrasesLearned === 0) {
                        this.player.phrasesLearned = 5;
                    }
                    StorageModule.savePlayerData(this.player);
                }

                this.currentScreen = 'learning';
            }
        },

        // Start dungeon challenge
        startChallenge() {
            this.currentScreen = 'challenge';
            this.generateDungeonChallenge();
        },

        // Generate a dungeon challenge
        generateDungeonChallenge() {
            this.dungeonChallenge = QuizModule.generateDungeonChallenge(
                this.player,
                this.hiragana,
                this.katakana,
                this.kanji,
                this.dailyPhrases
            );
            this.dungeonAnswerChecked = false;
        },

        // Check dungeon answer
        checkDungeonAnswer(selected) {
            this.selectedDungeonAnswer = selected;
            this.dungeonAnswerChecked = true;
            this.dungeonAnswerCorrect = selected === this.dungeonChallenge.answer;

            if (this.dungeonAnswerCorrect) {
                AudioModule.playCorrectSound();
                this.awardExp(20);
                this.player.dungeonFloor++;
                StorageModule.savePlayerData(this.player);
            } else {
                AudioModule.playWrongSound();
            }
        },

        // Move to next dungeon challenge
        nextDungeonChallenge() {
            this.generateDungeonChallenge();
        },

        // Award experience points
        awardExp(amount) {
            this.player.exp += amount;

            // Level up if enough exp
            while (this.player.exp >= this.player.expToNextLevel) {
                this.player.exp -= this.player.expToNextLevel;
                this.player.level++;
                this.player.expToNextLevel = Math.floor(this.player.expToNextLevel * 1.5);
            }

            StorageModule.savePlayerData(this.player);
        },

        // Change player name
        changeName() {
            if (this.newName.trim() !== '') {
                this.player.name = this.newName.trim();
                StorageModule.savePlayerData(this.player);
                this.profileOpen = false;
            }
        },

        // Canvas drawing methods (delegated to WritingModule)
        startDrawing(e) {
            WritingModule.startDrawing(e, this);
        },

        draw(e) {
            WritingModule.draw(e, this);
        },

        stopDrawing() {
            WritingModule.stopDrawing(this);
        },

        startDrawingTouch(e) {
            WritingModule.startDrawingTouch(e, this);
        },

        drawTouch(e) {
            WritingModule.drawTouch(e, this);
        },

        clearCanvas() {
            WritingModule.clearCanvas(this);
        },

        nextCharacter() {
            const chars = this.getCurrentCharacters();
            if (this.writingCharacterIndex < chars.length - 1) {
                this.writingCharacterIndex++;
                setTimeout(() => this.clearCanvas(), 50);
            }
        },

        prevCharacter() {
            if (this.writingCharacterIndex > 0) {
                this.writingCharacterIndex--;
                setTimeout(() => this.clearCanvas(), 50);
            }
        }
    };
}
