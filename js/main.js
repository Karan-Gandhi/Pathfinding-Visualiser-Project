let grid;
let nodew = 30;
let dropdowns = [];
let contextMenu;
let person;

window.onload = () => {
    grid = new Grid(Math.floor(window.innerHeight / nodew) - 6, Math.floor(window.innerWidth / nodew), document.getElementById("root"), nodew, nodew);

    // for (let i in grid.nodes) {
    //     let row = grid.nodes[i];
    //     for (let j in row) {
    //         let node = row[j];
    //         if (i % 2 === 0) node.setColour("red");
    //     }
    // }

    dropdowns = document.getElementsByClassName("dropdown-surface");
    for (let dropdown of dropdowns) {
        let btn = dropdown.getElementsByClassName("dropdown-button")[0];
        let _list = dropdown.getElementsByClassName("dropdown-list")[0];
        _list.style.display = "none";

        for (let item of _list.children) {
            item.addEventListener("click", () => {
                const _item = item;
                btn.getElementsByClassName("dropdown-text")[0].innerHTML = _item.innerHTML;
                _list.style.display = "none";
            });
        }

        btn.addEventListener("click", (e) => {
            const _dp = dropdown;
            for (let other of dropdowns) {
                if (other !== _dp) {
                    const list = other.getElementsByClassName("dropdown-list")[0];
                    list.style.display = "none";
                }
            }
            const list = _dp.getElementsByClassName("dropdown-list")[0];
            if (list.style.display === "none") list.style.display = "block";
            else list.style.display = "none";
        });
    }

    document.getElementById("start").addEventListener("click", () => {
        const algo = document.getElementById("algo").innerHTML;
        const time = document.getElementById("time").innerHTML;
        let t = 0;

        if (time === "Slow") t = 50;
        else if (time === "Medium") t = 25;
        else if (time === "Fast") t = 20;
        else t = 0;

        grid.addNodeN();
        if (algo === "A * Algorithm") astar(grid.start, grid.end, t);
        else if (algo === "Dijkstra's Algorithm") dijkstra(grid.start, grid.end, t);
        else if (algo === "Depth-first search") dfs(grid.start, grid.end, t);
        else if (algo === "Breath-first search") bfs(grid.start, grid.end, t);
        else new Snackbar("Please select an Pathfinding algorithm", [], [], SNCAKBAR_TIME_MEDIUM).build().show();
    });
};