"use strict";

function astar(start, end) {
    var openset = [start];
    var closedset = [];
    var current = null;
    var fpath = [];
    var drawing = true;
    var time = 50;

    var interval = setInterval(async () => {
        if (openset.length > 0) {
            var index = 0;
            for (var i = 0; i < openset.length; i++) {
                if (openset[i].f < openset[index].f) {
                    index = i;
                }
            }
            current = openset[index];

            if (current === end) {
                console.log("done");
                clearInterval(interval);
                drawing = false;
                retracePath();
                return;
            }

            openset.splice(openset.indexOf(current), 1);
            closedset.push(current);

            for (var i = 0; i < current.neighbors.length; i++) {
                var neighbor = current.neighbors[i];
                if (!closedset.includes(neighbor) && !neighbor.obstacle) {
                    var tempG = current.g + heruistic(neighbor, current);

                    if (tempG > neighbor.g) {
                        neighbor.previous = current;
                        neighbor.g = tempG;
                        neighbor.h = heruistic(neighbor, end);
                        neighbor.f = neighbor.g + heruistic(neighbor, end);
                        if (!openset.includes(neighbor)) {
                            openset.push(neighbor);
                        }
                    }
                }

            }
        } else {
            console.log("no solution");
            clearInterval(interval);
            return;
        }

        if (drawing) {
            for (var i = 0; i < openset.length; i++) {
                openset[i].setColour("#f44336");
            }

            for (var i = 0; i < closedset.length; i++) {
                closedset[i].setColour("#3f51b5");
            }

            end.setColour("yellow");
        }

    }, time);



    function retracePath() {
        var temp = current;
        fpath.push(temp);

        while (temp.previous != undefined) {
            fpath.unshift(temp.previous);
            temp = temp.previous;
        }

        var i = 0
        var int = setInterval(() => {
            if (i === fpath.length) {
                clearInterval(int);
                return;
            }
            if (i > 0) {
                fpath[i - 1].removeIcon();
            }
            fpath[i].setColour("#ffeb3b");
            fpath[i].setIcon("img/start.png");
            i++;
        }, 100);
    }

    function heruistic(current, end) {
        return Math.abs(current.x - end.x) + Math.abs(current.y - end.y);
        // return Math.sqrt(((current.x - end.x) * (current.x - end.x)) + ((current.y - end.y) * (current.y - end.y)))
    }
}