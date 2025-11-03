# AI-Driven Web Applications (2WHAV Examples)

This directory contains a collection of interactive web applications developed by an AI agent (Gemini Code Assist) following a structured, quality-driven iterative process called **2WHAV**.

## The 2WHAV Framework

The 2WHAV (What, Where, How, Augment, Verify) framework is an iterative methodology designed to guide AI agents in generating production-ready code. It emphasizes clear design, architectural quality, continuous verification, and incremental improvement.

Each project in this folder serves as a practical example of this process, demonstrating how an AI can build complex, functional, and tested applications from a high-level objective.

For a complete and detailed explanation of the iterative process, please see the `llm-agent.md` file in the parent directory.

## Projects as Case Studies

Here's a brief overview of the included examples:

### 1. Cellular Automata Simulator
*   **Description:** A feature-rich simulator for exploring 2D cellular automata, including Conway's Game of Life.
*   **AI Development Showcase:** This project highlights the AI's ability to manage complex state, implement algorithms from specifications (rule parsing), and offload heavy computation to a Web Worker for a responsive UI.
*   **Technologies:** HTML, CSS, JavaScript (ES6 Modules), Web Workers.
*   **To Run:** Open `cellular-automata-simulator/index.html` in your browser.
*   **Testing:** This project includes unit tests. To run them, navigate to the `cellular-automata-simulator` directory and run:
    ```bash
    npm install
    npm test
    ```

### 2. A* Pathfinding Visualizer
*   **Description:** An interactive tool that demonstrates how the A* pathfinding algorithm works.
*   **AI Development Showcase:** This example demonstrates the AI's capability to implement a classic graph traversal algorithm, manage a 2D grid state, and create a clear visual representation of the algorithm's execution.
*   **Technologies:** HTML, CSS, JavaScript (ES6 Modules).
*   **To Run:** Open `pathfinding-visualizer/index.html` in your browser.

### 3. Pixel Art Editor
*   **Description:** A simple but functional pixel art editor built with web technologies.
*   **AI Development Showcase:** This project showcases the AI's ability to implement more complex UI features like a layer management system, an undo/redo stack using the Command Pattern, and handling user input for drawing. It also includes an AI-generated test suite using Puppeteer.
*   **Technologies:** HTML, CSS, JavaScript (ES6 Modules), OffscreenCanvas.
*   **To Run:** Open `pixel-art-editor/index.html` in your browser.
*   **Testing:** This project includes visual and integration tests. To run them, navigate to the `pixel-art-editor` directory and run:
    ```bash
    npm install
    npm test
    ```

### 4. Procedural Terrain Generator
*   **Description:** A 3D procedural terrain generator that creates landscapes using noise algorithms.
*   **AI Development Showcase:** This example demonstrates the AI's ability to work with 3D graphics libraries (Three.js), integrate with UI libraries (dat.GUI), and use Web Workers for performance-critical tasks like noise generation.
*   **Technologies:** HTML, Three.js, dat.GUI, Web Workers.
*   **To Run:** Open `procedural-terrain-generator/index.html` in your browser. You may need to run a local server for the Three.js modules to load correctly.