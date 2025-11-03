
import { createNoise2D } from 'https://cdn.skypack.dev/simplex-noise@4.0.1';

// This worker receives parameters, calculates the terrain geometry vertices,
// and sends the result back to the main thread.

self.onmessage = function(e) {
    const params = e.data;
    const noise2D = createNoise2D();

    const vertices = new Float32Array((params.segments + 1) * (params.segments + 1) * 3);

    function fbm(x, y) {
        let total = 0;
        let frequency = 1.0;
        let amplitude = 1.0;
        let maxValue = 0;

        for (let i = 0; i < params.octaves; i++) {
            total += noise2D(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= params.persistence;
            frequency *= params.lacunarity;
        }
        return total / maxValue;
    }

    let vertexIndex = 0;
    for (let j = 0; j <= params.segments; j++) {
        const y = (j / params.segments - 0.5) * params.height;
        for (let i = 0; i <= params.segments; i++) {
            const x = (i / params.segments - 0.5) * params.width;
            
            const noiseVal = fbm(
                x / params.noiseScale,
                y / params.noiseScale
            );
            const z = noiseVal * params.terrainHeight;

            vertices[vertexIndex++] = x;
            vertices[vertexIndex++] = y;
            vertices[vertexIndex++] = z;
        }
    }

    // Post the result back to the main thread.
    // The vertices array is sent as a "transferable object" for performance.
    self.postMessage({ vertices }, [vertices.buffer]);
};
