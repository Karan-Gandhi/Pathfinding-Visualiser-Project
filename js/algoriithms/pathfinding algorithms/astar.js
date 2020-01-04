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
 */
function astar(start, end) {
    let openset = [start];
    let closedset = [];
    let current = null;
    const animationTime = 50;
    // animation for the algorithm
    const interval = setInterval(async () => {
        if (openset.length > 0) {
            // get the index having the lowest f score
            var index = 0;
            for (var i = 0; i < openset.length; i++)
                if (openset[i].f < openset[index].f) index = i;
            // set the current to the element having the lowest f score
            current = openset[index];
            // check if the algorithm is compleated
            if (current === end) {
                console.log("done");
                clearInterval(interval);
                retracePath(current, 100);
                return;
            }
            // remove the current node from the openset and push it in the closed set
            openset.splice(openset.indexOf(current), 1);
            closedset.push(current);
            // loop through the neighbours of the current cell
            for (var i = 0; i < current.neighbors.length; i++) {
                const neighbor = current.neighbors[i];
                // check if the neighbour is already visited and if it is a obstacle
                if (!closedset.includes(neighbor) && !neighbor.obstacle) {
                    // set the temperory g value to the current g + the distance between the current node an the next node
                    var tempG = current.g + heruistic(neighbor, current);
                    // check if the is a better path
                    if (tempG > neighbor.g) {
                        // set the previous of the neighbour node as the current
                        neighbor.previous = current;
                        // set the g value of the neighbour to the temperory g value which was calculated
                        neighbor.g = tempG;
                        // set the h value of the neighbour to the heruistic value between the current and the end
                        neighbor.h = heruistic(neighbor, end);
                        // update the f score
                        neighbor.f = neighbor.g + heruistic(neighbor, end);
                        // if the openset does not include the neighbor then push it
                        if (!openset.includes(neighbor)) openset.push(neighbor);
                    }
                }
            }
        } else {
            // there is no solution the the give algorithm
            console.log("no solution");
            clearInterval(interval);
            return;
        }
        // set the colours of the openset, the closedset and the end nodes
        for (var i = 0; i < openset.length; i++)
            openset[i].setColour("#f44336");
        for (var i = 0; i < closedset.length; i++)
            closedset[i].setColour("#3f51b5");
        end.setColour("yellow");
    }, animationTime);

    /**
     * heruistic function for astar algorithm
     *
     * @param {*} current
     * @param {*} end
     * @returns
     */
    function heruistic(current, end) {
        return Math.abs(current.x - end.x) + Math.abs(current.y - end.y);
        // return Math.sqrt(((current.x - end.x) * (current.x - end.x)) + ((current.y - end.y) * (current.y - end.y)))
    }
}
