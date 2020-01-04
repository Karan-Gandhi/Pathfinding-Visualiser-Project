/**
 * @author Karan Gandhi
 * @email karangandhi.programming@gmail.com
 * @desc contains retracePath function
 */
"use strict";
/**
 * reteace the path of the given solved maze
 *
 * @param {Node} lastNode
 * @param {Number} animationTime
 */
function retracePath(lastNode, animationTime) {
    // making a temperory copy of the lastNode node
    let temp = lastNode;
    let path = [temp];
    // while the last node has a previous node push it to the path array
    while (temp.previous != undefined) {
        path.unshift(temp.previous);
        temp = temp.previous;
    }
    // Animate the path
    let i = 0;
    const interval = setInterval(() => {
        // if there is no other node left
        if (i === path.length) {
            clearInterval(interval);
            return;
        }
        // change the direction of the node according to the next node
        if (path[i + 1]) {
            if (path[i + 1].x > path[i].x) path[i].rotate(0);
            if (path[i + 1].x < path[i].x) path[i].rotate(180);
            if (path[i + 1].y > path[i].y) path[i].rotate(90);
            if (path[i + 1].y < path[i].y) path[i].rotate(-90);
        }
        // remove the icon of the previous node and set the icon of the current node
        if (i > 0) path[i - 1].removeIcon();
        path[i].setColour("#ffeb3b");
        path[i].setIcon("img/start.png");
        i++;
    }, animationTime);
}
