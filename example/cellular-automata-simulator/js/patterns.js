// js/patterns.js

export class RLEParser {
    static parse(rleString) {
        const lines = rleString.split('\n');
        let width = 0;
        let height = 0;
        let patternData = [];
        let currentLineLength = 0; // Track cells in current line

        for (const line of lines) {
            if (line.startsWith('#')) {
                continue;
            }
            if (line.startsWith('x')) {
                const header = line.split(',').map(s => s.trim());
                width = parseInt(header[0].split('=')[1]);
                height = parseInt(header[1].split('=')[1]);
                continue;
            }

            let run = '';
            for (const char of line) {
                console.log(`Processing char: ${char}, current run: ${run}, patternData.length: ${patternData.length}, currentLineLength: ${currentLineLength}`);
                if (char >= '0' && char <= '9') {
                    run += char;
                } else {
                    const count = run === '' ? 1 : parseInt(run);
                    run = ''; // Reset run count

                    if (char === 'o') {
                        for (let i = 0; i < count; i++) {
                            patternData.push(1);
                            currentLineLength++;
                        }
                        console.log(`  Added ${count} 'o'. patternData: ${patternData.slice(-5)}, currentLineLength: ${currentLineLength}`);
                    } else if (char === 'b') {
                        for (let i = 0; i < count; i++) {
                            patternData.push(0);
                            currentLineLength++;
                        }
                        console.log(`  Added ${count} 'b'. patternData: ${patternData.slice(-5)}, currentLineLength: ${currentLineLength}`);
                    } else if (char === '$') {
                        console.log(`  Handling '$'. count: ${count}`);
                        // Pad with dead cells to fill the current line
                        while (currentLineLength < width) {
                            patternData.push(0);
                            currentLineLength++;
                        }
                        console.log(`  Padded line. patternData: ${patternData.slice(-5)}, currentLineLength: ${currentLineLength}`);
                        currentLineLength = 0; // Reset for the new line
                        // If count > 1, it means multiple empty lines
                        for (let i = 1; i < count; i++) {
                            for (let j = 0; j < width; j++) {
                                patternData.push(0);
                            }
                            console.log(`  Added empty line ${i}. patternData.length: ${patternData.length}`);
                        }
                    } else if (char === '!') {
                        console.log(`  End of pattern '!'`);
                        break; // End of pattern
                    }
                }
            }
        }
        // Final padding for the last line if it's not full
        while (currentLineLength < width && currentLineLength !== 0) {
            patternData.push(0);
            currentLineLength++;
        }
        console.log(`Final patternData.length: ${patternData.length}, width*height: ${width*height}`);
        return { width, height, pattern: new Uint8Array(patternData) };
    }
}

export const PRESET_PATTERNS = {
    glider: `#N Glider
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`, // 010, 001, 111
    lwss: `#N Lightweight Spaceship
x = 5, y = 4, rule = B3/S23
2b2o$o3bo$o2bo$b4o!`, // 00110, 10001, 10010, 01100
    gosper: `#N Gosper Glider Gun
x = 36, y = 9, rule = B3/S23
24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14bo$2o8bo3bobo4bobo12b2o$10bo5bo7bo$11bo3bo$12b2o!`
};
