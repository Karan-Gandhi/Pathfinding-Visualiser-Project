var grid;
var nodew = 100;

window.onload = () => {
    grid = new Grid(Math.floor(window.innerHeight / nodew) /*- 6*/, Math.floor(window.innerWidth / nodew), document.getElementById('root'), nodew, nodew);
    // dijkstra(grid, grid.start, grid.end);
    // astar(grid, grid.start, grid.end);
}

function oc() {
    grid.addNodeN();
    astar(grid.start, grid.end);
}

function ds() {
    grid.addNodeN();
    dijkstra(grid, grid.start, grid.end);
}