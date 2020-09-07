/**
 * @author Karan Gandhi
 * @email karangandhi.programming@gmail.com
 * @desc contains the a* search algorithm function
 */
("use strict");
/**
 * Astar search algorithm
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Number} t
 */
// async function astar(start, end, t) {
//     let openset = [start];
//     let closedset = [];
//     let current = null;
//     const animationTime = t;
//     grid.setAlgo(astar);
//     grid.resetPath();
//     if (t != 0) {
//         // animation for the algorithm
//         const interval = setInterval(async () => {
//             if (openset.length > 0) {
//                 // get the index having the lowest f score
//                 let index = 0;
//                 for (let i = 0; i < openset.length; i++) if (openset[i].f < openset[index].f) index = i;
//                 // set the current to the element having the lowest f score
//                 current = openset[index];
//                 // check if the algorithm is compleated
//                 if (current === end) {
//                     clearInterval(interval);
//                     retracePath(current, t);
//                     return;
//                 }
//                 // remove the current node from the openset and push it in the closed set
//                 openset.splice(openset.indexOf(current), 1);
//                 closedset.push(current);
//                 // loop through the neighbours of the current cell
//                 for (let i = 0; i < current.neighbors.length; i++) {
//                     const neighbor = current.neighbors[i];
//                     // check if the neighbour is already visited and if it is a obstacle
//                     if (!closedset.includes(neighbor) && !neighbor.obstacle) {
//                         // set the temperory g value to the current g + the distance between the current node an the next node
//                         let tempG = current.g + heruistic(neighbor, current);
//                         // check if the is a better path
//                         if (tempG > neighbor.g) {
//                             // set the previous of the neighbour node as the current
//                             neighbor.previous = current;
//                             // set the g value of the neighbour to the temperory g value which was calculated
//                             neighbor.g = tempG;
//                             // set the h value of the neighbour to the heruistic value between the current and the end
//                             neighbor.h = heruistic(neighbor, end);
//                             // update the f score
//                             neighbor.f = neighbor.g + heruistic(neighbor, end);
//                             // if the openset does not include the neighbor then push it
//                             if (!openset.includes(neighbor)) openset.push(neighbor);
//                         }
//                     }
//                 }
//             } else {
//                 // there is no solution the the give algorithm
//                 clearInterval(interval);
//                 return;
//             }
//             // set the colours of the openset, the closedset and the end nodes
//             for (let i = 0; i < openset.length; i++) openset[i].setColour("#f44336");
//             for (let i = 0; i < closedset.length; i++) closedset[i].setColour("#3f51b5");
//             end.setColour("yellow");
//         }, animationTime);
//     } else {
//         while (true) {
//             if (openset.length > 0) {
//                 // get the index having the lowest f score
//                 let index = 0;
//                 for (let i = 0; i < openset.length; i++) if (openset[i].f < openset[index].f) index = i;
//                 // set the current to the element having the lowest f score
//                 current = openset[index];
//                 // check if the algorithm is compleated
//                 if (current === end) {
//                     retracePath(current, t);
//                     break;
//                     return;
//                 }
//                 // remove the current node from the openset and push it in the closed set
//                 openset.splice(openset.indexOf(current), 1);
//                 closedset.push(current);
//                 // loop through the neighbours of the current cell
//                 for (let i = 0; i < current.neighbors.length; i++) {
//                     const neighbor = current.neighbors[i];
//                     // check if the neighbour is already visited and if it is a obstacle
//                     if (!closedset.includes(neighbor) && !neighbor.obstacle) {
//                         // set the temperory g value to the current g + the distance between the current node an the next node
//                         let tempG = current.g + heruistic(neighbor, current);
//                         // check if the is a better path
//                         if (tempG > neighbor.g) {
//                             // set the previous of the neighbour node as the current
//                             neighbor.previous = current;
//                             // set the g value of the neighbour to the temperory g value which was calculated
//                             neighbor.g = tempG;
//                             // set the h value of the neighbour to the heruistic value between the current and the end
//                             neighbor.h = heruistic(neighbor, end);
//                             // update the f score
//                             neighbor.f = neighbor.g + heruistic(neighbor, end);
//                             // if the openset does not include the neighbor then push it
//                             if (!openset.includes(neighbor)) openset.push(neighbor);
//                         }
//                     }
//                 }
//             } else {
//                 // there is no solution the the give algorithm
//                 break;
//                 return;
//             }
//             // set the colours of the openset, the closedset and the end nodes
//             for (let i = 0; i < openset.length; i++) openset[i].setColour("#f44336");
//             for (let i = 0; i < closedset.length; i++) closedset[i].setColour("#3f51b5");
//             end.setColour("yellow");
//         }
//     }

//     /**
//      * heruistic function for astar algorithm
//      *
//      * @param {Node} current
//      * @param {Node} end
//      * @returns
//      */
//     function heruistic(current, end) {
//         return Math.abs(current.x - end.x) + Math.abs(current.y - end.y);
//         // return Math.sqrt(((current.x - end.x) * (current.x - end.x)) + ((current.y - end.y) * (current.y - end.y)))
//     }
// }

function astar(start, end, t) {
    grid.setAlgo(astar);
    // grid.resetPath();
    let openset = [start];
    drawing = false;
    grid.drawing = false;
    grid.removeEventListeners();
    
    for (let row of grid.nodes) {
        for (let node of row) {
            node.g = Infinity;
            node.f = Infinity;
            node.h = 0;
            node.visited = false;
            node.removeColor();
            node.previous = null;
        }
    }

    start.g = 0;
    start.f = heruistic(start, end);
    let cnode = null;

    if (t != 0) {
        let int = setInterval(() => {
            if (openset.length != 0) {
                let cnode = getLowestF();

                if (cnode == end) {
                    console.log("done");
                    retracePath(cnode, 100);
                    clearInterval(int);
                    return;
                }

                openset.splice(openset.indexOf(cnode), 1);
                cnode.visited = true;
                cnode.setColour("#3f51b5"); 

                for (let neighbor of cnode.neighbors) {
                    if (!neighbor.visited && !neighbor.obstacle) {
                        // console.log("itter");
                        let tempG = cnode.g + heruistic(cnode, neighbor);
                        if (tempG < neighbor.g) {
                            neighbor.previous = cnode;
                            neighbor.g = tempG;
                            neighbor.f = tempG + heruistic(neighbor, end);
                            if (!openset.includes(neighbor)) openset.push(neighbor);
                        }
                    }
                }
            } else {
                clearInterval(int);
                return false;   
            }
        }, t);
    } else {
        while (openset.length != 0) {
            let cnode = getLowestF();

            if (cnode == end) {
                console.log("done");
                retracePath(cnode, 0);
                break;
                return;
            }

            openset.splice(openset.indexOf(cnode), 1);
            cnode.visited = true;
            cnode.setColour("#3f51b5", true); 

            for (let neighbor of cnode.neighbors) {
                if (!neighbor.visited && !neighbor.obstacle) {
                    // console.log("itter");
                    let tempG = cnode.g + heruistic(cnode, neighbor);
                    if (tempG < neighbor.g) {
                        neighbor.previous = cnode;
                        neighbor.g = tempG;
                        neighbor.f = tempG + heruistic(neighbor, end);
                        if (!openset.includes(neighbor)) openset.push(neighbor);
                    }
                }
            }
        }
    }

    function getLowestF() {
        let lowestF = Infinity;
        let res;
        for (let node of openset) {
            if (node.f < lowestF) {
                lowestF = node.f;
                res = node;
            }
        }
        return res;
    }

    function heruistic(current, end) {
        return Math.abs(current.x - end.x) + Math.abs(current.y - end.y);
        // return Math.sqrt(((current.x - end.x) * (current.x - end.x)) + ((current.y - end.y) * (current.y - end.y)))
    }
}