class Cell {
    constructor(x, y, h, w, obstacle, root, start, end) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.obstacle = false;
        this.root = root;
        this.start = start;
        this.end = end;
        this.previous = undefined;

        this.f = 0;
        this.h = 0;
        this.g = 0;

        this.neighbors = [];

        this.point = document.createElement('div');
        this.point.style.position = "absolute";
        this.point.style.left = (x * w) + "px";
        this.point.style.top = (y * h) + "px";
        this.point.style.height = (h) + "px";
        this.point.style.width = (h) + "px";
        this.point.id = "col";

        this.point.obj = this;

        // if (Math.random() < 0.2) {
        //     console.log("ds")
        //     this.obstacle = true;
        // }

        // setInterval(() => {
        if (this.obstacle) {
            this.point.classList.toggle('obstacle');
        }
        // }, 1000);

        // this.point.addEventListener('click', (e) => {
        //     e.target.classList.toggle('obstacle');
        //     if (!this.obstacle) {
        //         this.obstacle = true;
        //     }
        // });

        this.root.append(this.point);
    }

    addNeighbours(grid) {
        var y = this.x;
        var x = this.y;
        var g = grid.points;
        var cols = grid.cols;
        var rows = grid.rows;

        this.neighbors.length = 0;

        if (x - 1 >= 0) {
            this.neighbors.push(g[x - 1][y]);
        }
        if (y - 1 >= 0) {
            this.neighbors.push(g[x][y - 1]);
        }
        if (y + 1 <= cols) {
            this.neighbors.push(g[x][y + 1]);
        }
        if (x + 1 < rows) {
            this.neighbors.push(g[x + 1][y]);
        }
    }

    setColour(color) {
        this.point.style.backgroundColor = color;
    }

    setIcon(path) {
        this.point.style.backgroundImage = `url("${path}")`;
    }

    removeIcon() {
        this.point.style.backgroundImage = "none";
    }

    setObstacle() {
        this.obstacle = true;
        this.point.classList.toggle('obstacle');
    }
}