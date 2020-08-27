"use strict";

async function randomMaze(animationTime) {
	for (let node of grid.getAllNodes()) {
		if (Math.random() < 0.4 && !node.obj.start && !node.obj.end) {
			node.obj.setWall();
			await sleep(animationTime);
		}
	}
}