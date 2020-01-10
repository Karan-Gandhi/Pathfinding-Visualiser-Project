// /**
//  * @author Karan Gandhi
//  * @email karangandhi.programming@gmail.com
//  * @create date 2019-12-27 15:52:43
//  * @modify date 2019-12-27 15:52:43
//  * @desc Randomized Prim's algorithm
//  */
// "use strict";
// /**
//  * Generate a maze in the given grid
//  *
//  * @param {Grid} grid
//  */
// function generate_pym_algorithm(grid) {
//     // // Add all the point neighbours for maze
//     // grid.addNodeMN();
//     // // add all the walls of the cells
//     // grid.addNodeMW();
//     // // Make the grid full of walls
//     grid = grid.nodes;
//     // for (var row in grid) {
//     //     for (var node in grid[row]) {
//     //         for (var wall in grid[row][node].mwalls) {
//     //             grid[row][node].mwalls[wall].setWall();
//     //         }
//     //     }
//     // }

//     // var current = grid[2][2];
//     // var visited = [];

//     // while (current.mwalls.length != 0) {
//     //     if (current.mwalls.length > 2 && !visited.includes(current)) {
//     //         // current wall
//     //         var cw = current.mwalls[Math.ceil(Math.random() * current.mwalls.length) - 1];
//     //         cw.removeWall();
//     //         current.mwalls.splice(current.mwalls.indexOf(cw), 1);
//     //         visited.push(current);
//     //     } else {
//     //         current = current.mneighbours[Math.ceil(Math.random() * current.mneighbours.length) - 1];
//     //     }
//     // }

//     var list = [];

//     for (var i = 0; i < grid.length; i++) {
//         for (var x = 0; x < grid[i].length; x++) {
//             grid[i][x].setWall();
//         }
//     }

//     for (var i = 0; i < grid.length; i += 2) {
//         for (var x = 0; x < grid[i].length; x += 2) {
//             grid[i][x].removeWall();
//             list.push(grid[i][x]);
//         }
//     }
//     var current = list[0];
//     current.visited = true;
//     var stack = [current];

//     while (stack.length > 0) {
//         current = stack.pop();
//         if (current.unvisitedNeighbours(list)) {
//             stack.push(current);
//             var next = current.checkNeighbours();
//             removeWalls(grid, current, next);
//             next.visited = true;
//             stack.unshift(next);
//         }
//     }
// }

// /**
//  * Removes the wall between the current and the next node
//  *
//  * @param {Grid} grid
//  * @param {Node} a
//  * @param {Node} b
//  */
// function removeWalls(grid, a, b) {
//     if (a.x > b.x) {
//         grid[a.y][a.x - 1].removeWalls();
//     } else if (a.x < b.x) {
//         grid[b.y][b.x - 1].removeWalls();
//     } else if (a.y > b.y) {
//         grid[a.y - 1][a.x].removeWalls();
//     } else if (a.y < b.y) {
//         grid[b.y - 1][b.x].removeWalls();
//     }
// }
