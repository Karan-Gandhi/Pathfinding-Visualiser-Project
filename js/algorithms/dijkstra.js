"use strict";

function dijkstra(grid, start, end) {
    grid = grid.points;
    var Q = [];
    var time = 1;
    var current = undefined;
    var wallsurround = false;

    for (var row of grid) {
        for (var cell of row) {
            cell.g = Infinity;
            cell.previous = undefined;
            if (!cell.obstacle) {
                Q.push(cell);
            }
            if (cell === start) {
                cell.g = 0;
            }
        }
    }

    var interval = setInterval(async () => {
        if (Q.length > 0) {
            var index = 0;
            for (var i = 0; i < Q.length; i++) {
                if (Q[i].g < Q[index].g) {
                    index = i;
                }
            }

            current = Q[index];

            if (!current.obstacle && current.g !== Infinity) {
                Q.splice(Q.indexOf(current), 1);
                if (current === end) {
                    console.log("done");
                    clearInterval(interval);
                    retracePath();
                    return;
                }
                for (var i = 0; i < current.neighbors.length; i++) {
                    var neighbour = current.neighbors[i];
                    if (!neighbour.obstacle) {
                        var tempG = current.g + 1;
                        if (tempG < neighbour.g) {
                            neighbour.g = tempG;
                            neighbour.previous = current;
                        }
                    } else {
                        continue;
                    }
                }
            } else {
                wallsurround = true;
                Q.length = 0;
            }
        } else {
            console.log("no solution");
            clearInterval(interval);
            return;
        }

        if (!wallsurround) {
            current.setColour("#3f51b5");
            end.setColour("yellow");
        }
    }, time);

    function retracePath() {
        var temp = current;
        var fpath = [];
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
}