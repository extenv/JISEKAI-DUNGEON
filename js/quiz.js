/**
 * Jisekai Dungeon - Quiz Module
 * Handles quiz generation and answer checking
 */

const QuizModule = {
    // Generate quiz questions
    generateQuiz(currentLearningType, characters, dailyPhrases) {
        let charList = [];
        let prompt = 'What is the reading of this character?';

        if (currentLearningType === 'phrases') {
            charList = dailyPhrases;
            prompt = 'What is the meaning of this phrase?';
        } else {
            charList = characters;
        }

        const questions = [];

        // Create 5 random questions
        for (let i = 0; i < 5; i++) {
            const randomChar = charList[Math.floor(Math.random() * charList.length)];
            let answer, options;

            if (currentLearningType === 'phrases') {
                answer = randomChar.meaning;
                options = [randomChar.meaning];

                // Add 3 random incorrect options
                while (options.length < 4) {
                    const randomOption = charList[Math.floor(Math.random() * charList.length)].meaning;
                    if (!options.includes(randomOption)) {
                        options.push(randomOption);
                    }
                }
            } else {
                answer = randomChar.romaji;
                options = [randomChar.romaji];

                // Add 3 random incorrect options
                while (options.length < 4) {
                    const randomOption = charList[Math.floor(Math.random() * charList.length)].romaji;
                    if (!options.includes(randomOption)) {
                        options.push(randomOption);
                    }
                }
            }

            // Shuffle options
            this.shuffleArray(options);

            questions.push({
                japanese: randomChar.japanese,
                answer: answer,
                options: options,
                prompt: prompt,
                meaning: randomChar.meaning
            });
        }

        return questions;
    },

    // Check answer
    checkAnswer(selected, correctAnswer) {
        return selected === correctAnswer;
    },

    // Generate dungeon challenge
    generateDungeonChallenge(player, hiragana, katakana, kanji, dailyPhrases) {
        const allCharacters = [];
        const allPhrases = [];

        if (player.hiraganaLearned > 0) {
            allCharacters.push(...hiragana.slice(0, Math.min(10, player.hiraganaLearned)));
        }

        if (player.katakanaLearned > 0) {
            allCharacters.push(...katakana.slice(0, Math.min(10, player.katakanaLearned)));
        }

        if (player.kanjiLearned > 0) {
            allCharacters.push(...kanji.slice(0, Math.min(5, player.kanjiLearned)));
        }

        if (player.phrasesLearned > 0) {
            allPhrases.push(...dailyPhrases.slice(0, Math.min(5, player.phrasesLearned)));
        }

        // Decide whether to use a character or phrase
        const usePhrase = allPhrases.length > 0 && Math.random() > 0.7;

        let randomItem, options, answer, prompt;

        if (usePhrase && allPhrases.length > 0) {
            randomItem = allPhrases[Math.floor(Math.random() * allPhrases.length)];
            answer = randomItem.meaning;
            options = [randomItem.meaning];
            prompt = 'What is the meaning of this phrase?';

            // Add 3 random incorrect options
            while (options.length < 4) {
                const randomOption = allPhrases[Math.floor(Math.random() * allPhrases.length)].meaning;
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }
        } else {
            if (allCharacters.length === 0) {
                // If nothing learned yet, use first 5 hiragana
                allCharacters.push(...hiragana.slice(0, 5));
            }

            randomItem = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            answer = randomItem.romaji;
            options = [randomItem.romaji];
            prompt = 'Defeat the enemy by selecting the correct reading!';

            // Add 3 random incorrect options
            while (options.length < 4) {
                const randomOption = allCharacters[Math.floor(Math.random() * allCharacters.length)].romaji;
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }
        }

        // Shuffle options
        this.shuffleArray(options);

        return {
            japanese: randomItem.japanese,
            answer: answer,
            options: options,
            prompt: prompt
        };
    },

    // Utility function to shuffle array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};
