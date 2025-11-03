// test/ca.test.js

import { CellularAutomata } from '../js/ca.js';
import { expect } from 'chai';

describe('CellularAutomata', () => {
    let ca;

    beforeEach(() => {
        ca = new CellularAutomata(10, 10); // Default 10x10 grid
    });

    it('should initialize with a clear grid', () => {
        expect(ca.grid.every(cell => cell === 0)).to.be.true;
    });

    it('should parse default rule B3/S23 correctly', () => {
        expect(Array.from(ca.birthRules)).to.deep.equal([3]);
        expect(Array.from(ca.survivalRules)).to.deep.equal([2, 3]);
    });

    it('should parse custom rule B36/S23 correctly', () => {
        ca.setRule("B36/S23");
        expect(Array.from(ca.birthRules)).to.deep.equal([3, 6]);
        expect(Array.from(ca.survivalRules)).to.deep.equal([2, 3]);
    });

    it('should throw error for invalid rule format', () => {
        expect(() => CellularAutomata.parseRule("B3X/S23")).to.throw("Invalid rule format: contains non-numeric characters.");
    });

    it('should clear the grid', () => {
        ca.randomFill();
        ca.clearGrid();
        expect(ca.grid.every(cell => cell === 0)).to.be.true;
    });

    it('should random fill the grid', () => {
        ca.randomFill();
        const hasAlive = ca.grid.some(cell => cell === 1);
        const hasDead = ca.grid.some(cell => cell === 0);
        expect(hasAlive).to.be.true; // Should have some alive cells
        expect(hasDead).to.be.true;  // Should have some dead cells
    });

    it('should toggle a cell', () => {
        ca.toggleCell(0, 0);
        expect(ca.grid[0]).to.equal(1);
        ca.toggleCell(0, 0);
        expect(ca.grid[0]).to.equal(0);
    });

    it('should set a cell', () => {
        ca.setCell(1, 1, 1);
        expect(ca.grid[1 * ca.width + 1]).to.equal(1);
        ca.setCell(1, 1, 0);
        expect(ca.grid[1 * ca.width + 1]).to.equal(0);
    });

    it('should count neighbors correctly for a central cell', () => {
        // Create a 3x3 block of live cells in the center
        ca.setCell(4, 4, 1); ca.setCell(5, 4, 1); ca.setCell(6, 4, 1);
        ca.setCell(4, 5, 1); ca.setCell(5, 5, 1); ca.setCell(6, 5, 1);
        ca.setCell(4, 6, 1); ca.setCell(5, 6, 1); ca.setCell(6, 6, 1);

        // Cell (5,5) should have 8 neighbors
        expect(ca.countNeighbors(5, 5)).to.equal(8);
        // Cell (4,4) should have 3 neighbors (5,4), (4,5), (5,5)
        expect(ca.countNeighbors(4, 4)).to.equal(3);
    });

    it('should count neighbors correctly for an edge cell (with wrap-around)', () => {
        // Set (0,0), (9,0), (0,9), (9,9) to 1
        ca.setCell(0, 0, 1);
        ca.setCell(9, 0, 1);
        ca.setCell(0, 9, 1);
        ca.setCell(9, 9, 1);

        // Cell (0,0) should have neighbors (9,9), (0,9), (1,9), (9,0), (1,0), (9,1), (0,1), (1,1)
        // Based on the set cells, (0,0) should have 3 neighbors: (9,9), (9,0), (0,9)
        expect(ca.countNeighbors(0, 0)).to.equal(3);
    });

    it('should apply Game of Life rules correctly (B3/S23) with a blinker', () => {
        ca = new CellularAutomata(5, 5);
        ca.setRule("B3/S23");

        // Initial blinker pattern (vertical)
        ca.setCell(2, 1, 1);
        ca.setCell(2, 2, 1);
        ca.setCell(2, 3, 1);

        ca.nextGeneration();

        // Expected blinker pattern after one generation (horizontal)
        const expectedGrid = new Uint8Array(5 * 5);
        expectedGrid[1 * 5 + 2] = 0; // (2,1) should be dead
        expectedGrid[2 * 5 + 1] = 1; // (1,2) should be alive
        expectedGrid[2 * 5 + 2] = 1; // (2,2) should be alive
        expectedGrid[2 * 5 + 3] = 1; // (3,2) should be alive
        expectedGrid[3 * 5 + 2] = 0; // (2,3) should be dead

        expect(ca.grid[2 * 5 + 1]).to.equal(1); // Cell (1,2) becomes alive
        expect(ca.grid[2 * 5 + 2]).to.equal(1); // Cell (2,2) stays alive
        expect(ca.grid[2 * 5 + 3]).to.equal(1); // Cell (3,2) becomes alive
        expect(ca.grid[1 * 5 + 2]).to.equal(0); // Cell (2,1) dies
        expect(ca.grid[3 * 5 + 2]).to.equal(0); // Cell (2,3) dies
    });
});