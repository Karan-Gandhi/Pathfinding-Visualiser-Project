var grid;
var pointw = 30;

window.onload = () => {
    grid = new Grid((window.innerHeight / pointw) - 6, (window.innerWidth / pointw) - 1, document.getElementById('root'), pointw, pointw);
    // dijkstra(grid, grid.start, grid.end);
    // astar(grid, grid.start, grid.end);
}

function oc() {
    grid.addPointN();
    astar(grid.start, grid.end);
}

function ds() {
    grid.addPointN();
    dijkstra(grid, grid.start, grid.end);
}