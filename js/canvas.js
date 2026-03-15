/**
 * Jisekai Dungeon - Canvas/Writing Module
 * Handles drawing functionality for character writing practice
 */

const WritingModule = {
    // Initialize canvas
    setupCanvas(ctxRef, canvasId = 'writingCanvas') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Clear canvas
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Store context reference
        ctxRef.ctx = ctx;

        // Mouse events
        canvas.addEventListener('mousedown', (e) => this.startDrawing(e, ctxRef));
        canvas.addEventListener('mousemove', (e) => this.draw(e, ctxRef));
        canvas.addEventListener('mouseup', () => this.stopDrawing(ctxRef));
        canvas.addEventListener('mouseout', () => this.stopDrawing(ctxRef));

        // Touch events
        canvas.addEventListener('touchstart', (e) => this.startDrawingTouch(e, ctxRef));
        canvas.addEventListener('touchmove', (e) => this.drawTouch(e, ctxRef));
        canvas.addEventListener('touchend', () => this.stopDrawing(ctxRef));

        return ctx;
    },

    startDrawing(e, ctxRef) {
        ctxRef.isDrawing = true;
        const rect = e.target.getBoundingClientRect();
        ctxRef.lastX = e.clientX - rect.left;
        ctxRef.lastY = e.clientY - rect.top;
    },

    draw(e, ctxRef) {
        if (!ctxRef.isDrawing || !ctxRef.ctx) return;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctxRef.ctx.beginPath();
        ctxRef.ctx.moveTo(ctxRef.lastX, ctxRef.lastY);
        ctxRef.ctx.lineTo(x, y);
        ctxRef.ctx.stroke();

        ctxRef.lastX = x;
        ctxRef.lastY = y;
    },

    stopDrawing(ctxRef) {
        ctxRef.isDrawing = false;
    },

    startDrawingTouch(e, ctxRef) {
        e.preventDefault();
        ctxRef.isDrawing = true;
        const rect = e.target.getBoundingClientRect();
        const touch = e.touches[0];
        ctxRef.lastX = touch.clientX - rect.left;
        ctxRef.lastY = touch.clientY - rect.top;
    },

    drawTouch(e, ctxRef) {
        if (!ctxRef.isDrawing || !ctxRef.ctx) return;
        e.preventDefault();
        const rect = e.target.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ctxRef.ctx.beginPath();
        ctxRef.ctx.moveTo(ctxRef.lastX, ctxRef.lastY);
        ctxRef.ctx.lineTo(x, y);
        ctxRef.ctx.stroke();

        ctxRef.lastX = x;
        ctxRef.lastY = y;
    },

    clearCanvas(ctxRef, canvasId = 'writingCanvas') {
        if (!ctxRef.ctx) return;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        ctxRef.ctx.fillStyle = '#fff';
        ctxRef.ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    nextCharacter(ctxRef, getCurrentCharacters, writingCharacterIndexRef) {
        const chars = getCurrentCharacters();
        if (writingCharacterIndexRef.value < chars.length - 1) {
            writingCharacterIndexRef.value++;
            setTimeout(() => this.clearCanvas(ctxRef), 50);
            return true;
        }
        return false;
    },

    prevCharacter(ctxRef, writingCharacterIndexRef) {
        if (writingCharacterIndexRef.value > 0) {
            writingCharacterIndexRef.value--;
            setTimeout(() => this.clearCanvas(ctxRef), 50);
            return true;
        }
        return false;
    },

    getWritingTitle(currentLearningType) {
        if (currentLearningType === 'hiragana') return 'WRITE HIRAGANA';
        if (currentLearningType === 'katakana') return 'WRITE KATAKANA';
        return 'WRITE';
    }
};
