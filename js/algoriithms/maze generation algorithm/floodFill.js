"use strict";

let next = false;	

async function floodFill(animationTime) {
	let nodes = grid.nodes;
	let currentNode = nodes[1][1];
	let stack = [currentNode];
	let visited = [currentNode];

	for (let node of grid.getAllNodes()) {
		if (!node.obj.start && !node.obj.end) {
			node.obj.setWall();
			// await sleep(0);
			node.obj.visited = false;
		}
	}

	while (stack.length > 0) {
		let neighbours = getNeighbours(currentNode);
		// console.log(neighbours);
		currentNode.removeColor();
		if (neighbours.length > 0) {
			currentNode.removeWall();
			let index = Math.floor(Math.random() * neighbours.length);
			let neighbour = neighbours[index];
			stack.push(currentNode);
			visited.push(neighbour);
			removeWall(currentNode, neighbour);
			currentNode = neighbour;
			currentNode.removeWall();
			currentNode.visited = true;
			// console.log(currentNode.node);
		} else if (stack.length > 0) {
			currentNode = stack.pop();
		}
		currentNode.setColour("green");
		await sleep(animationTime);
	}

	for (let node of grid.getAllNodes()) {
		if (!node.obj.start && !node.obj.end) {
			node.obj.visited = false;
		}
	}
}

