let sets = [];
function ellerMaze(animationTime) {
	let nodes = grid.nodes;
	for (let row of nodes) {
		for (let node of row) {
			if (!node.start && !node.end)
			node.setWall();
		}
	}

	for (let i = 0; i < nodes[0].length; i += 2) {
		sets.push([nodes[0][i]]);
	}

	for (let i = 0; i < sets.length - 1; i++) {
		let set = sets[i];
		let merge = Math.random() > 0.5;
		if (merge) {
			console.log("asd");
			set[i].push(...sets[i + 1]);
			sets.splice(i + 1, 1);
		}
	}
}