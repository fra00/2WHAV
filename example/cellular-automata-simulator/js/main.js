// js/main.js

import { CellularAutomata } from './ca.js';
import { RLEParser, PRESET_PATTERNS } from './patterns.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const playPauseBtn = document.getElementById('play-pause');
const stepBtn = document.getElementById('step');
const speedSlider = document.getElementById('speed');
const speedValueSpan = document.getElementById('speed-value');
const clearBtn = document.getElementById('clear');
const randomFillBtn = document.getElementById('random-fill');
const gridSizeSelect = document.getElementById('grid-size');
const ruleInput = document.getElementById('rule-input');
const rulePreview = document.getElementById('rule-preview');
const presetPatternsSelect = document.getElementById('preset-patterns-select');
const loadPatternBtn = document.getElementById('load-pattern');
const pencilToolBtn = document.getElementById('pencil-tool');
const dragToolBtn = document.getElementById('drag-tool');

let ca;
let animationFrameId;
let lastUpdateTime = 0;
let simulationInterval = 1000 / 10; // Default 10 steps per second
let isPlaying = false;
let currentTool = 'pencil'; // 'pencil' or 'drag'
let isDragging = false;
let dragState = 1; // 1 for alive, 0 for dead

// Web Worker setup
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

worker.onmessage = (event) => {
    const { type, payload } = event.data;
    console.log('main.js: Received message from worker:', type, payload);
    if (type === 'gridUpdate') {
        drawGrid(payload.grid, payload.width, payload.height);
    }
};

function initSimulator(size) {
    console.log('main.js: initSimulator called with size:', size);
    const initialRule = ruleInput.value;
    ca = new CellularAutomata(size, size, initialRule);
    canvas.width = size * 5; // Scale for better visibility
    canvas.height = size * 5;
    drawGrid(ca.grid, ca.width, ca.height);
    worker.postMessage({ type: 'init', payload: { width: ca.width, height: ca.height, rule: initialRule } });
    console.log('main.js: Sent init message to worker.');
}

function drawGrid(grid, width, height) {
    // console.log('main.js: drawGrid called.'); // Too frequent, only log if needed
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellSize = canvas.width / width;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cellState = grid[y * width + x];
            if (cellState === 1) {
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

function updateSimulation(timestamp) {
    if (!isPlaying) return;

    if (timestamp - lastUpdateTime > simulationInterval) {
        worker.postMessage({ type: 'step' });
        // console.log('main.js: Sent step message to worker.'); // Too frequent
        lastUpdateTime = timestamp;
    }
    animationFrameId = requestAnimationFrame(updateSimulation);
}

// Event Listeners
playPauseBtn.addEventListener('click', () => {
    console.log('main.js: Play/Pause button clicked.');
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) {
        animationFrameId = requestAnimationFrame(updateSimulation);
    } else {
        cancelAnimationFrame(animationFrameId);
    }
});

stepBtn.addEventListener('click', () => {
    console.log('main.js: Step button clicked.');
    if (!isPlaying) {
        worker.postMessage({ type: 'step' });
        console.log('main.js: Sent step message to worker (manual step).');
    }
});

speedSlider.addEventListener('input', (e) => {
    console.log('main.js: Speed slider changed to:', e.target.value);
    const speed = parseInt(e.target.value, 10);
    speedValueSpan.textContent = speed;
    simulationInterval = 1000 / speed;
});

clearBtn.addEventListener('click', () => {
    console.log('main.js: Clear button clicked.');
    worker.postMessage({ type: 'clear' });
    console.log('main.js: Sent clear message to worker.');
});

randomFillBtn.addEventListener('click', () => {
    console.log('main.js: Random Fill button clicked.');
    worker.postMessage({ type: 'randomFill' });
    console.log('main.js: Sent randomFill message to worker.');
});

gridSizeSelect.addEventListener('change', (e) => {
    console.log('main.js: Grid size changed to:', e.target.value);
    const newSize = parseInt(e.target.value, 10);
    initSimulator(newSize);
});

ruleInput.addEventListener('input', (e) => {
    console.log('main.js: Rule input changed to:', e.target.value);
    const newRule = e.target.value;
    try {
        const { birth, survival } = CellularAutomata.parseRule(newRule);
        rulePreview.textContent = `Birth: ${birth.join(', ')}, Survival: ${survival.join(', ')}`;
        worker.postMessage({ type: 'updateRule', payload: newRule });
        console.log('main.js: Sent updateRule message to worker.');
    } catch (error) {
        rulePreview.textContent = `Invalid Rule: ${error.message}`;
        rulePreview.style.color = 'red';
        console.error('main.js: Invalid rule input:', error);
    }
});

loadPatternBtn.addEventListener('click', () => {
    console.log('main.js: Load Pattern button clicked.');
    const selectedPatternKey = presetPatternsSelect.value;
    if (selectedPatternKey) {
        const rleString = PRESET_PATTERNS[selectedPatternKey];
        if (rleString) {
            try {
                const { width, height, pattern } = RLEParser.parse(rleString);
                // For now, we'll just send the pattern data. The worker will need to handle grid resizing if necessary.
                worker.postMessage({ type: 'loadPattern', payload: { pattern, patternWidth: width, patternHeight: height } });
                console.log('main.js: Sent loadPattern message to worker.');
            } catch (error) {
                console.error("main.js: Error parsing RLE pattern:", error);
                alert("Error loading pattern: " + error.message);
            }
        }
    }
});

pencilToolBtn.addEventListener('click', () => {
    console.log('main.js: Pencil tool selected.');
    currentTool = 'pencil';
    pencilToolBtn.classList.add('active');
    dragToolBtn.classList.remove('active');
});

dragToolBtn.addEventListener('click', () => {
    console.log('main.js: Drag tool selected.');
    currentTool = 'drag';
    dragToolBtn.classList.add('active');
    pencilToolBtn.classList.remove('active');
});

canvas.addEventListener('mousedown', (e) => {
    console.log('main.js: Mouse down on canvas.');
    if (currentTool === 'pencil') {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / (canvas.width / ca.width));
        const y = Math.floor((e.clientY - rect.top) / (canvas.height / ca.height));
        worker.postMessage({ type: 'toggleCell', payload: { x, y } });
        console.log(`main.js: Sent toggleCell message for (${x}, ${y}).`);
    } else if (currentTool === 'drag') {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / (canvas.width / ca.width));
        const y = Math.floor((e.clientY - rect.top) / (canvas.height / ca.height));
        // Determine if we're setting alive or dead based on the first cell clicked
        dragState = ca.grid[y * ca.width + x] === 0 ? 1 : 0;
        worker.postMessage({ type: 'setCell', payload: { x, y, state: dragState } });
        console.log(`main.js: Sent setCell message for (${x}, ${y}) with state ${dragState}.`);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && currentTool === 'drag') {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / (canvas.width / ca.width));
        const y = Math.floor((e.clientY - rect.top) / (canvas.height / ca.height));
        worker.postMessage({ type: 'setCell', payload: { x, y, state: dragState } });
        // console.log(`main.js: Sent setCell message for (${x}, ${y}) with state ${dragState} (drag).`); // Too frequent
    }
});

canvas.addEventListener('mouseup', () => {
    console.log('main.js: Mouse up on canvas. Dragging stopped.');
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    console.log('main.js: Mouse leave canvas. Dragging stopped.');
    isDragging = false;
});

// Initial setup
console.log('main.js: Initial setup.');
initSimulator(parseInt(gridSizeSelect.value, 10));

worker.onerror = (error) => {
    console.error('main.js: Worker error:', error);
};
