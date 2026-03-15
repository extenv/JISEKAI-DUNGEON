/**
 * Jisekai Dungeon - Audio Module
 * Handles sound effects for the game
 */

const AudioModule = {
    audioContext: null,
    correctOscillator: null,
    correctGain: null,
    wrongOscillator: null,
    wrongGain: null,

    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Correct sound (higher pitch)
        this.correctOscillator = this.audioContext.createOscillator();
        this.correctGain = this.audioContext.createGain();
        this.correctOscillator.connect(this.correctGain);
        this.correctGain.connect(this.audioContext.destination);
        this.correctOscillator.frequency.value = 800;
        this.correctOscillator.type = 'sine';
        this.correctGain.gain.value = 0.3;

        // Wrong sound (lower pitch)
        this.wrongOscillator = this.audioContext.createOscillator();
        this.wrongGain = this.audioContext.createGain();
        this.wrongOscillator.connect(this.wrongGain);
        this.wrongGain.connect(this.audioContext.destination);
        this.wrongOscillator.frequency.value = 300;
        this.wrongOscillator.type = 'sawtooth';
        this.wrongGain.gain.value = 0.3;
    },

    playCorrectSound() {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.correctOscillator.start();
        this.correctGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
        setTimeout(() => this.correctOscillator.stop(), 300);
    },

    playWrongSound() {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.wrongOscillator.start();
        this.wrongGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
        setTimeout(() => this.wrongOscillator.stop(), 500);
    }
};
