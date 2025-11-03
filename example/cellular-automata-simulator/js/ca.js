// js/ca.js

export class CellularAutomata {
    constructor(width, height, rule = "B3/S23") {
        this.width = width;
        this.height = height;
        this.grid = new Uint8Array(width * height);
        this.nextGrid = new Uint8Array(width * height);
        this.setRule(rule);
        this.clearGrid();
    }

    static parseRule(ruleString) {
        const parts = ruleString.toUpperCase().split('/');
        let birth = [];
        let survival = [];

        for (const part of parts) {
            if (part.startsWith('B')) {
                birth = part.substring(1).split('').map(Number);
            } else if (part.startsWith('S')) {
                survival = part.substring(1).split('').map(Number);
            }
        }

        if (birth.some(isNaN) || survival.some(isNaN)) {
            throw new Error("Invalid rule format: contains non-numeric characters.");
        }
        return { birth, survival };
    }

    setRule(ruleString) {
        try {
            const { birth, survival } = CellularAutomata.parseRule(ruleString);
            this.birthRules = new Set(birth);
            this.survivalRules = new Set(survival);
        } catch (error) {
            console.error("Failed to set rule, using default B3/S23:", error.message);
            this.birthRules = new Set([3]);
            this.survivalRules = new Set([2, 3]);
        }
    }

    clearGrid() {
        this.grid.fill(0);
    }

    randomFill() {
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = Math.random() > 0.5 ? 1 : 0;
        }
    }

    toggleCell(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            const index = y * this.width + x;
            this.grid[index] = 1 - this.grid[index];
        }
    }

    setCell(x, y, state) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            const index = y * this.width + x;
            this.grid[index] = state;
        }
    }

    countNeighbors(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;

                const nx = (x + dx + this.width) % this.width;
                const ny = (y + dy + this.height) % this.height;

                count += this.grid[ny * this.width + nx];
            }
        }
        return count;
    }

    nextGeneration() {
        this.nextGrid.set(this.grid); // Copy current grid to nextGrid

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const index = y * this.width + x;
                const currentState = this.grid[index];
                const liveNeighbors = this.countNeighbors(x, y);

                if (currentState === 1) {
                    // Cell is alive
                    if (!this.survivalRules.has(liveNeighbors)) {
                        this.nextGrid[index] = 0; // Dies
                    }
                } else {
                    // Cell is dead
                    if (this.birthRules.has(liveNeighbors)) {
                        this.nextGrid[index] = 1; // Becomes alive
                    }
                }
            }
        }
        // Swap grids
        const temp = this.grid;
        this.grid = this.nextGrid;
        this.nextGrid = temp;
    }
}
