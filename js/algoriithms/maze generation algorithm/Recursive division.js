/**
 * @author Karan Gandhi
 * @email karangandhi.programming@gmail.com
 * @create date 2020-01-04 15:03:21
 * @modify date 2020-01-04 15:03:21
 * @desc [description]
 */

"use strict";

let orientation = "S";
let wallstoanimate = [];
let randomrow = 0;
let randomcol = 0;
let rowstart = 0;
let rowend = 0;
let colstart = 0;
let colend = 0;
let width = 0;
let height = 0;
let GRID = null;
let surroundingwalls = true;

function divide(
    grid,
    Width,
    Height,
    Rowstart,
    Rowend,
    Colstart,
    Colend,
    Surroundingwalls
) {
    orientation = getorientation(width, height);
    rowstart = Rowstart;
    rowend = Rowend;
    colstart = Colstart;
    colend = Colend;
    width = Width;
    height = Height;
    GRID = grid;
    surroundingwalls = Surroundingwalls;

    if (!surroundingwalls) {
        for (let i = 0; i < width; i++) {
            GRID.nodes[0][i].setWall();
        }
        for (let i = 0; i < width; i++) {
            GRID.nodes[height - 1][i].setWall();
        }
        for (let i = 0; i < height; i++) {
            GRID.nodes[i][0].setWall();
        }
        for (let i = 0; i < height; i++) {
            GRID.nodes[i][width - 1].setWall();
        }
    }
}
function next() {
    if (orientation === "H") {
        randomrow = getrandom(rowstart + 2, rowend - 2);
        drawWalls(GRID, randomrow, colend, orientation);
        if (randomrow + 2 < rowend) {
            divide(
                GRID,
                width,
                height - randomrow,
                rowstart,
                rowend,
                randomcol,
                colend,
                true
            );
        }
        if (randomrow - 2 > rowstart) {
            divide(
                GRID,
                width,
                randomrow,
                rowstart,
                rowend,
                colstart,
                randomcol,
                true
            );
        }
    } else {
        randomcol = getrandom(colstart - 2, colend + 2);
        drawWalls(GRID, randomcol, rowend, orientation);
        if (randomcol + 2 < colend) {
            divide(
                GRID,
                width - randomcol,
                height,
                rowstart,
                rowend,
                randomcol,
                colend,
                true
            );
        }
        if (randomcol - 2 > colstart) {
            divide(
                GRID,
                randomcol,
                height,
                rowstart,
                rowend,
                colstart,
                randomcol,
                true
            );
        }
    }
}

function getrandom(a, b) {
    return Math.floor(Math.random() * b + 1) - a;
}

function getorientation(w, h) {
    return w > h ? "V" : "H";
}

function drawWalls(GRID, index, to, orientation) {
    if (orientation === "V") {
        for (let i = 1; i < to; i++) {
            // GRID.nodes[i][index].setColour("red");
            GRID.nodes[i][index].setWall();
        }
    } else if (orientation === "H") {
        for (let i = 1; i < to; i++) {
            // GRID.nodes[index][i].setColour("red");
            GRID.nodes[index][i].setWall();
        }
    }
}
