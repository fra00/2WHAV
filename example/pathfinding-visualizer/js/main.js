import { Grid } from './grid.js';
import { findPath } from './astar.js';

// --- DOM Elements ---
const canvas = document.getElementById('grid-canvas');
const visualizeBtn = document.getElementById('visualize-btn');
const resetBtn = document.getElementById('reset-btn');
const clearWallsBtn = document.getElementById('clear-walls-btn');
const pathLengthEl = document.getElementById('path-length');
const nodesVisitedEl = document.getElementById('nodes-visited');

// --- Grid Configuration ---
const COLS = 50;
const ROWS = 30;
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = (ROWS / COLS) * CANVAS_WIDTH;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// --- State ---
let grid = new Grid(COLS, ROWS, canvas);
grid.draw();

let isMouseDown = false;
let isVisualizing = false;

// --- Functions ---

function getSelectedTool() {
    return document.querySelector('input[name="tool"]:checked').value;
}

function animateVisualization(visitedNodes, path) {
    isVisualizing = true;
    visualizeBtn.disabled = true;

    const animationSpeed = 10; // ms per node
    let i = 0;

    function animateVisited() {
        if (i < visitedNodes.length) {
            const node = visitedNodes[i];
            grid.drawNode(node, 'rgba(100, 100, 100, 0.3)'); // Closed set color
            i++;
            setTimeout(animateVisited, animationSpeed);
        } else {
            animatePath();
        }
    }

    function animatePath() {
        let j = 0;
        function drawPathNode() {
            if (j < path.length) {
                const node = path[j];
                grid.drawNode(node, '#f5a623'); // Path color
                j++;
                setTimeout(drawPathNode, animationSpeed * 2);
            } else {
                isVisualizing = false;
                visualizeBtn.disabled = false;
            }
        }
        drawPathNode();
    }

    animateVisited();
}

function handleCanvasInteraction(e) {
    if (isVisualizing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = grid.getNodeFromCoords(x, y);
    if (!node) return;

    const tool = getSelectedTool();

    if (tool === 'wall') {
        if (node !== grid.startNode && node !== grid.endNode) {
            node.isWall = !node.isWall;
        }
    } else if (tool === 'start') {
        if (!node.isWall && node !== grid.endNode) {
            grid.startNode = node;
        }
    } else if (tool === 'end') {
        if (!node.isWall && node !== grid.startNode) {
            grid.endNode = node;
        }
    }
    grid.draw();
}

// --- Event Listeners ---

visualizeBtn.addEventListener('click', () => {
    if (isVisualizing) return;
    grid.reset(true); // Reset previous path/visited nodes, but keep walls
    grid.draw();

    const result = findPath(grid, grid.startNode, grid.endNode);

    nodesVisitedEl.textContent = result.visited.length;
    pathLengthEl.textContent = result.path.length > 0 ? result.path.length : 'N/A';

    if (result.error) {
        alert(result.error);
    }

    animateVisualization(result.visited, result.path);
});

resetBtn.addEventListener('click', () => {
    if (isVisualizing) return;
    grid.init();
    grid.draw();
    nodesVisitedEl.textContent = 'N/A';
    pathLengthEl.textContent = 'N/A';
});

clearWallsBtn.addEventListener('click', () => {
    if (isVisualizing) return;
    for (const row of grid.nodes) {
        for (const node of row) {
            node.isWall = false;
        }
    }
    grid.draw();
});

canvas.addEventListener('mousedown', e => {
    isMouseDown = true;
    handleCanvasInteraction(e);
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('mousemove', e => {
    if (isMouseDown && getSelectedTool() === 'wall') {
        handleCanvasInteraction(e);
    }
});

canvas.addEventListener('mouseleave', () => {
    isMouseDown = false;
});
