/**
 * Implements the A* pathfinding algorithm.
 * @param {Grid} grid The grid object.
 * @param {Node} start The start node.
 * @param {Node} end The end node.
 * @returns {{path: Node[], visited: Node[], error: string}} An object containing the path, the list of visited nodes for animation, and an error message if applicable.
 */
export function findPath(grid, start, end) {
    const openSet = [start];
    const closedSet = [];
    const visitedForAnim = []; // Order of nodes visited, for animation

    start.h = heuristic(start, end);
    start.f = start.h;

    while (openSet.length > 0) {
        // Find the node in the open set with the lowest F score
        let lowestIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }

        let current = openSet[lowestIndex];

        // If we reached the end, reconstruct the path and return
        if (current === end) {
            return { path: reconstructPath(current), visited: visitedForAnim, error: '' };
        }

        // Move current node from open to closed set
        openSet.splice(lowestIndex, 1);
        closedSet.push(current);
        if (current !== start) {
            visitedForAnim.push(current);
        }

        // Check neighbors
        for (const neighbor of current.neighbors) {
            // Skip if neighbor is in closed set or is a wall
            if (closedSet.includes(neighbor) || neighbor.isWall) {
                continue;
            }

            const tempG = current.g + 1; // Assuming cost of 1 between adjacent nodes

            let newPath = false;
            if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                    neighbor.g = tempG;
                    newPath = true;
                }
            } else {
                neighbor.g = tempG;
                openSet.push(neighbor);
                newPath = true;
            }

            if (newPath) {
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
            }
        }
    }

    // If we get here, no path was found
    return { path: [], visited: visitedForAnim, error: 'No path found!' };
}

/**
 * Heuristic function (Manhattan distance).
 * @param {Node} a
 * @param {Node} b
 * @returns {number}
 */
function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * Reconstructs the path from the end node back to the start.
 * @param {Node} current The end node.
 * @returns {Node[]}
 */
function reconstructPath(current) {
    const path = [];
    let temp = current;
    while (temp.parent) {
        path.push(temp);
        temp = temp.parent;
    }
    return path.reverse();
}
