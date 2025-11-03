import { Node } from './node.js';

// --- Constants for drawing ---
const COLORS = {
    background: '#1a1a1a',
    gridLines: '#333',
    wall: '#444',
    start: '#4a90e2',
    end: '#d0021b',
    open: 'rgba(74, 144, 226, 0.2)',
    closed: 'rgba(100, 100, 100, 0.3)',
    path: '#f5a623'
};

/**
 * Manages the grid of nodes and all drawing operations on the canvas.
 */
export class Grid {
    /**
     * @param {number} cols - Number of columns in the grid.
     * @param {number} rows - Number of rows in the grid.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     */
    constructor(cols, rows, canvas) {
        this.cols = cols;
        this.rows = rows;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodeSize = this.canvas.width / this.cols;

        this.nodes = [];
        this.startNode = null;
        this.endNode = null;

        this.init();
    }

    /**
     * Initializes the grid by creating all the Node objects.
     */
    init() {
        this.nodes = [];
        for (let y = 0; y < this.rows; y++) {
            const row = [];
            for (let x = 0; x < this.cols; x++) {
                row.push(new Node(x, y));
            }
            this.nodes.push(row);
        }

        // After creating all nodes, find their neighbors
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[y][x].addNeighbors(this);
            }
        }

        // Set default start and end nodes
        this.startNode = this.nodes[Math.floor(this.rows / 2)][Math.floor(this.cols / 4)];
        this.endNode = this.nodes[Math.floor(this.rows / 2)][Math.floor(this.cols * 3 / 4)];
    }

    /**
     * Resets the grid to its initial state, optionally keeping walls.
     * @param {boolean} keepWalls - If true, walls will not be cleared.
     */
    reset(keepWalls = false) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const node = this.nodes[y][x];
                node.reset();
                if (!keepWalls) {
                    node.isWall = false;
                }
            }
        }
        this.draw();
    }

    /**
     * Draws the entire grid, including nodes and lines.
     */
    draw() {
        this.ctx.fillStyle = COLORS.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.drawNode(this.nodes[y][x]);
            }
        }

        this.drawGridLines();
    }

    /**
     * Draws a single node on the grid based on its state.
     * @param {Node} node - The node to draw.
     * @param {string} [colorOverride] - An optional color to force-draw the node with.
     */
    drawNode(node, colorOverride = null) {
        const x = node.x * this.nodeSize;
        const y = node.y * this.nodeSize;

        let color = colorOverride;
        if (!color) {
            if (node === this.startNode) color = COLORS.start;
            else if (node === this.endNode) color = COLORS.end;
            else if (node.isWall) color = COLORS.wall;
            else color = COLORS.background; // Default empty
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.nodeSize, this.nodeSize);
    }

    /**
     * Draws the grid lines.
     */
    drawGridLines() {
        this.ctx.strokeStyle = COLORS.gridLines;
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= this.cols; i++) {
            const x = i * this.nodeSize;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let i = 0; i <= this.rows; i++) {
            const y = i * this.nodeSize;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    /**
     * Gets the node at a specific pixel coordinate on the canvas.
     * @param {number} pixelX - The x-coordinate on the canvas.
     * @param {number} pixelY - The y-coordinate on the canvas.
     * @returns {Node|null} The node at that position, or null if out of bounds.
     */
    getNodeFromCoords(pixelX, pixelY) {
        const col = Math.floor(pixelX / this.nodeSize);
        const row = Math.floor(pixelY / this.nodeSize);

        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.nodes[row][col];
        }
        return null;
    }
}
