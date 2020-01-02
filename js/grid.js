class Grid {
    constructor(rows, cols, root, pw, ph) {
        this.rows = rows;
        this.cols = cols;
        this.root = root;
        this.pw = pw;
        this.ph = ph;
        this.h = ph * rows;
        this.drawing = true;
        this.w = pw * cols + pw;
        this.nodes = [];

        for (var i = 0; i < rows; i++) {
            var row = document.createElement("div");
            row.id = "row";
            this.nodes[i] = [];
            for (var x = 0; x < cols; x++) {
                var node = new Node(
                    x,
                    i,
                    pw,
                    ph,
                    false,
                    row,
                    false,
                    false,
                    this
                );
                this.nodes[i].push(node);
            }
            this.root.append(row);
        }
        // this.nodes[0][0].start = true;
        // this.nodes[this.nodes.length - 1][this.nodes[this.nodes.length - 1].length - 1].end = true;
        this.start = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5)];
        this.end = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5) * 4];
        this.start.start = true;
        this.end.end = true;
        this.start.setIcon("img/start.png");
        this.start.obstacle = false;
        this.end.obstacle = false;
        this.end.setColour("yellow");

        // For drawing walls
        if (this.drawing) {
            this.root.addEventListener("mousedown", (e) => {
                e.preventDefault();
                for (var i = 0; i < this.nodes.length; i++) {
                    for (var x = 0; x < this.nodes[i].length; x++) {
                        this.nodes[i][x].node.addEventListener(
                            "mouseout",
                            this.setAsObstacle
                        );
                    }
                }
            });

            this.root.addEventListener("mouseup", (e) => {
                e.preventDefault();
                for (var i = 0; i < this.nodes.length; i++) {
                    for (var x = 0; x < this.nodes[i].length; x++) {
                        this.nodes[i][x].node.removeEventListener(
                            "mouseout",
                            this.setAsObstacle
                        );
                    }
                }
            });

            for (var i = 0; i < this.nodes.length; i++) {
                for (var x = 0; x < this.nodes[i].length; x++) {
                    this.nodes[i][x].node.addEventListener(
                        "click",
                        this.setAsObstacle
                    );
                }
            }
        }

        this.root.style.width = this.w + "px";
        this.root.style.height = this.h + "px";
    }

    setAsObstacle(e) {
        // console.log(e.target.obj.start);
        if (!e.target.obj.start && !e.target.obj.end) {
            e.target.obj.setObstacle();
            e.target.obj.animate();
        }
    }

    // moveStart(e) {
    //     e.target.obj.start = true;
    //     e.target.obj.setIcon("img/start.png");
    //     e.target.obj.obstacle = false;
    // }

    addNodeN() {
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                this.nodes[i][x].addNeighbours(this);
            }
        }
    }

    addNodeMN() {
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                this.nodes[i][x].addMNeighbours(this);
            }
        }
    }

    addNodeMW() {
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                this.nodes[i][x].addMWalls(this);
            }
        }
    }
}
