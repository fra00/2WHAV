/**
 * Represents a single node in the grid.
 */
export class Node {
    /**
     * @param {number} x - The x-coordinate (column) of the node in the grid.
     * @param {number} y - The y-coordinate (row) of the node in the grid.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;

        // A* properties
        this.g = 0; // Cost from start to this node
        this.h = 0; // Heuristic cost from this node to end
        this.f = 0; // g + h

        this.isWall = false;
        this.parent = null;
        this.neighbors = [];
    }

    /**
     * Finds and stores the valid neighbors of this node.
     * @param {Grid} grid - The grid object to find neighbors in.
     */
    addNeighbors(grid) {
        const x = this.x;
        const y = this.y;

        // Cardinal directions (no diagonals for simplicity)
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }  // Left
        ];

        for (const dir of directions) {
            const newX = x + dir.x;
            const newY = y + dir.y;

            if (newX >= 0 && newX < grid.cols && newY >= 0 && newY < grid.rows) {
                this.neighbors.push(grid.nodes[newY][newX]);
            }
        }
    }

    /**
     * Resets the node to its default state, keeping wall status.
     */
    reset() {
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }
}
