"use strict";

async function greedyBfs(start, end, t) {
	let q = [start];

	grid.setAlgo(greedyBfs);

	for (let row of grid.nodes) {
		for (let node of row) {
			node.previous = null;
			node.visited = false;
			node.h = Infinity;
			node.removeColor();
		}
	}

	if (t != 0) {
		console.log(t);
		while (q.length !== 0) {
			let v = q.pop();
			v.visited = true;
			v.setColour("GREEN");
			if (v === end) {
				await retracePath(v, t);
				break;
				return;
			}

			calculateNeighbourH(v);

			for (let neighbour of v.neighbors) {
				if (!neighbour.visited && !neighbour.obstacle) {
					neighbour.visited = true;
					neighbour.previous = v;
					q.push(neighbour);
					q.sort((a, b) => b.h - a.h);
					await sleep(t);
				}
			}
		}
	} else {
		while (q.length !== 0) {
			let v = q.pop();
			v.visited = true;
			v.setColour("GREEN", true);
			if (v === end) {
				await retracePath(v, t);
				break;
				return;
			}

			calculateNeighbourH(v);

			for (let neighbour of v.neighbors) {
				if (!neighbour.visited && !neighbour.obstacle) {
					neighbour.visited = true;
					neighbour.previous = v;
					q.push(neighbour);
					q.sort((a, b) => b.h - a.h);
					// await sleep(t);
				}
			}
		}
	}

	function calculateNeighbourH(node) {
		for (let neighbour of node.neighbors) {
			if (!neighbour.obstacle && !neighbour.visited) neighbour.h = heruistic(neighbour, end);
		}
		node.neighbors.sort((a, b) => b.h - a.h)
	}

	function heruistic(current, end) {
        return Math.abs(current.x - end.x) + Math.abs(current.y - end.y);
        // return Math.sqrt(((current.x - end.x) * (current.x - end.x)) + ((current.y - end.y) * (current.y - end.y)))
    }
}