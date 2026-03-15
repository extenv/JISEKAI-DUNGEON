/**
 * Jisekai Dungeon - Storage Module
 * Handles player data persistence using localStorage
 */

const StorageModule = {
    STORAGE_KEY: 'jisekaiDungeonPlayer',

    // Default player data
    getDefaultPlayerData() {
        return {
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
        };
    },

    // Load player data from localStorage
    loadPlayerData() {
        const savedData = localStorage.getItem(this.STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
        return this.getDefaultPlayerData();
    },

    // Save player data to localStorage
    savePlayerData(playerData) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playerData));
    },

    // Change player name
    changeName(newName) {
        if (newName.trim() === '') return false;
        
        const playerData = this.loadPlayerData();
        playerData.name = newName.trim();
        this.savePlayerData(playerData);
        return true;
    }
};
