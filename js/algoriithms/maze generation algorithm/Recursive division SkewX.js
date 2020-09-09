/**
 * @author Karan Gandhi
 * @email karangandhi.programming@gmail.com
 */

"use strict";

async function recursiveDivisionMazeSkewX(rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, animationTime) {
    if (rowEnd < rowStart || colEnd < colStart) return;

    let animate = false
    if (!surroundingWalls) {
        let rows = grid.rows;
        let cols = grid.cols;

        for (let i = 1; i < cols - 1; i++) {
            // wallsToAnimate.push(grid.nodes[0][i]);
            grid.nodes[0][i].setWall();
            await sleep(animationTime);
        }

        for (let i = 0; i < rows - 1; i++) {
            // wallsToAnimate.push(grid.nodes[i][0], grid.nodes[i][cols - 1]);
            grid.nodes[i][0].setWall();
            grid.nodes[i][cols - 1].setWall();
            await sleep(animationTime);
        }

        for (let i = 0; i < cols; i++) {
            // wallsToAnimate.push(grid.nodes[rows - 1][i]);
            grid.nodes[rows - 1][i].setWall();
            await sleep(animationTime);
        }
        animate = true;
        surroundingWalls = true;
    }

    if (orientation === "horizontal") {
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) possibleRows.push(number);
        
        let possibleCols = [];
        for (let number = colStart - 1; number <= colEnd + 1; number += 2) possibleCols.push(number);

        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];

        for (let row of grid.nodes) {
            for (let node of row) {
                let r = node.y;
                let c = node.x;
                if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
                    let currentHTMLNode = node.node;
                    if (!node.start && !node.end) {
                        // wallsToAnimate.push(node);
                        node.setWall();
                        await sleep(animationTime);
                    }
                }
            }
        }

        if (currentRow - 2 - rowStart > colEnd - colStart) {
            await recursiveDivisionMazeSkewX(rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, animationTime);
        } else {
            await recursiveDivisionMazeSkewX(rowStart, currentRow - 2, colStart, colEnd, "horizontal", surroundingWalls, animationTime);
        }
        
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            await recursiveDivisionMazeSkewX(currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, animationTime);
        } else {
            await recursiveDivisionMazeSkewX(currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, animationTime);
        }
    } else {
        let possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        
        let possibleRows = [];
        for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
        }
        
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        
        for (let row of grid.nodes) {
            for (let node of row) {
                let r = node.y;
                let c = node.x;
                if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
                    let currentHTMLNode = node.node;
                    if (!node.start && !node.end) {
                        // wallsToAnimate.push(node);
                        node.setWall();
                        await sleep(animationTime);
                    }
                }
            }
        }
        
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            await recursiveDivisionMazeSkewX(rowStart, rowEnd, colStart, currentCol - 2, "horizontal", true, animationTime);
        } else {
            await recursiveDivisionMazeSkewX(rowStart, rowEnd, colStart, currentCol - 2, "horizontal", true, animationTime);
        }
        
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            await recursiveDivisionMazeSkewX(rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", true, animationTime);
        } else {
            await recursiveDivisionMazeSkewX(rowStart, rowEnd, currentCol + 2, colEnd, orientation, true, animationTime);
        }
    }

    // if (animate) {
    //     for (let node of wallsToAnimate) {
    //         node.setWall();
    //         await sleep(animationTime);
    //     }
    // }
}