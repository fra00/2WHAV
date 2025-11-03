// test/patterns.test.js

import { RLEParser, PRESET_PATTERNS } from '../js/patterns.js';
import { expect } from 'chai';

describe('RLEParser', () => {
    it('should parse a simple RLE string for Glider', () => {
        const rleString = PRESET_PATTERNS.glider;
        const { width, height, pattern } = RLEParser.parse(rleString);

        expect(width).to.equal(3);
        expect(height).to.equal(3);
        expect(pattern.length).to.equal(9);

        // Expected pattern for Glider: 010, 001, 111
        // Flattened: 0,1,0,0,0,1,1,1,1
        expect(Array.from(pattern)).to.deep.equal([
            0, 1, 0,
            0, 0, 1,
            1, 1, 1
        ]);
    });

    it('should parse a simple RLE string for Lightweight Spaceship (LWSS)', () => {
        const rleString = PRESET_PATTERNS.lwss;
        const { width, height, pattern } = RLEParser.parse(rleString);

        expect(width).to.equal(5);
        expect(height).to.equal(4);
        expect(pattern.length).to.equal(20);

        // Expected pattern for LWSS: 00110, 10001, 10010, 01111
        expect(Array.from(pattern)).to.deep.equal([
            0, 0, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 1, 0,
            0, 1, 1, 1, 1
        ]);
    });

    it('should handle run counts correctly', () => {
        const rleString = "x = 5, y = 1, rule = B3/S23\n2bo2b!"; // 00100
        const { width, height, pattern } = RLEParser.parse(rleString);

        expect(width).to.equal(5);
        expect(height).to.equal(1);
        expect(Array.from(pattern)).to.deep.equal([0, 0, 1, 0, 0]);
    });

    it('should handle multiple lines and padding with $', () => {
        const rleString = "x = 3, y = 3, rule = B3/S23\no$bo$o!"; // 100, 010, 100
        const { width, height, pattern } = RLEParser.parse(rleString);

        expect(width).to.equal(3);
        expect(height).to.equal(3);
        expect(Array.from(pattern)).to.deep.equal([
            1, 0, 0,
            0, 1, 0,
            1, 0, 0
        ]);
    });

    it('should handle empty run counts (default to 1)', () => {
        const rleString = "x = 3, y = 1, rule = B3/S23\nob!"; // 10
        const { width, height, pattern } = RLEParser.parse(rleString);

        expect(width).to.equal(3);
        expect(height).to.equal(1);
        expect(Array.from(pattern)).to.deep.equal([1, 0, 0]);
    });

    it('should handle comments and header lines', () => {
        const rleString = "#C comment\nx = 2, y = 2, rule = B3/S23\no$o!"; // 10, 10
        const { width, height, pattern } = RLEParser.parse(rleString);

        expect(width).to.equal(2);
        expect(height).to.equal(2);
        expect(Array.from(pattern)).to.deep.equal([
            1, 0,
            1, 0
        ]);
    });
});