// js/worker.js

import { CellularAutomata } from './ca.js';

let ca;
let gridWidth;
let gridHeight;

onmessage = (event) => {
    const { type, payload } = event.data;
    console.log('worker.js: Received message from main:', type, payload);

    switch (type) {
        case 'init':
            gridWidth = payload.width;
            gridHeight = payload.height;
            ca = new CellularAutomata(gridWidth, gridHeight, payload.rule);
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            console.log('worker.js: Sent initial gridUpdate to main.');
            break;
        case 'step':
            ca.nextGeneration();
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            // console.log('worker.js: Sent gridUpdate after step to main.'); // Too frequent
            break;
        case 'clear':
            ca.clearGrid();
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            console.log('worker.js: Sent gridUpdate after clear to main.');
            break;
        case 'randomFill':
            ca.randomFill();
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            console.log('worker.js: Sent gridUpdate after randomFill to main.');
            break;
        case 'toggleCell':
            ca.toggleCell(payload.x, payload.y);
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            console.log(`worker.js: Sent gridUpdate after toggleCell (${payload.x}, ${payload.y}) to main.`);
            break;
        case 'setCell':
            ca.setCell(payload.x, payload.y, payload.state);
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            // console.log(`worker.js: Sent gridUpdate after setCell (${payload.x}, ${payload.y}) to main.`); // Too frequent
            break;
        case 'updateRule':
            ca.setRule(payload);
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            console.log('worker.js: Sent gridUpdate after updateRule to main.');
            break;
        case 'loadPattern':
            const { pattern, patternWidth, patternHeight } = payload;
            const startX = Math.floor((gridWidth - patternWidth) / 2);
            const startY = Math.floor((gridHeight - patternHeight) / 2);

            // Clear the grid first
            ca.clearGrid();

            for (let y = 0; y < patternHeight; y++) {
                for (let x = 0; x < patternWidth; x++) {
                    const patternIndex = y * patternWidth + x;
                    const gridX = startX + x;
                    const gridY = startY + y;
                    if (pattern[patternIndex] === 1 && gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
                        ca.setCell(gridX, gridY, 1);
                    }
                }
            }
            postMessage({ type: 'gridUpdate', payload: { grid: ca.grid, width: gridWidth, height: gridHeight } });
            console.log('worker.js: Sent gridUpdate after loadPattern to main.');
            break;
    }
};
