class Grid {
    constructor(rows, cols, root, nodeWidth, nodeHeight) {
        this.rows = rows;
        this.cols = cols;
        this.root = root;
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
        this.h = nodeHeight * rows;
        this.drawing = true;
        this.w = nodeWidth * cols + nodeWidth;
        this.nodes = [];

        for (var i = 0; i < rows; i++) {
            var row = document.createElement("div");
            row.id = "row";
            this.nodes[i] = [];
            for (var x = 0; x < cols; x++) {
                var node = new Node(x, i, nodeWidth, nodeHeight, false, row, false, false, this);
                this.nodes[i].push(node);
            }
            this.root.append(row);
        }

        this.start = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5)];
        this.end = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5) * 4];

        this.start.setIcon("img/start.png");
        this.start.obstacle = false;
        this.start.start = true;

        this.end.obstacle = false;
        this.end.setIcon("img/end.png");
        this.end.node.style.backgroundSize = "calc(100% - 5px)";
        this.end.end = true;

        this.targets = [this.start, this.end];

        this.addAllEventListeners();
        this.addStartDragEventListeners();
        this.addEndDragEventListeners();

        this.root.style.width = this.w + "px";
        this.root.style.height = this.h + "px";

        this.boundMouseEnterEventFunctionStart = this.nodeMouseEnterEventFunctionStart.bind(this);
        this.boundMouseEnterEventFunctionEnd = this.nodeMouseEnterEventFunctionEnd.bind(this);
    }

    addAllEventListeners() {
        this.root.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.addEventListeners();
        });

        this.root.addEventListener("mouseup", (e) => {
            e.preventDefault();
            this.removeEventListeners();
        });

        for (var i = 0; i < this.nodes.length; i++) {
            for (var x = 0; x < this.nodes[i].length; x++) {
                if (!this.nodes[i][x].start && !this.nodes[i][x].end) this.nodes[i][x].node.addEventListener("click", this.setAsObstacle);
            }
        }
    }

    addEventListeners() {
        if (this.drawing) {
            for (var i = 0; i < this.nodes.length; i++) {
                for (var x = 0; x < this.nodes[i].length; x++) {
                    if (!this.nodes[i][x].start && !this.nodes[i][x].end) {
                        this.nodes[i][x].node.addEventListener("mouseenter", this.setAsObstacle);
                    }
                }
            }
        }
    }

    removeEventListeners() {
        for (var i = 0; i < this.nodes.length; i++) {
            for (var x = 0; x < this.nodes[i].length; x++) {
                if (!this.nodes[i][x].start && !this.nodes[i][x].end) {
                    this.nodes[i][x].node.removeEventListener("mouseenter", this.setAsObstacle);
                }
            }
        }
    }

    // Start Node

    addStartDragEventListeners() {
        this.start.node.addEventListener("mousedown", this.startNodeMouseDownEventFunction.bind(this));
        this.start.node.addEventListener("mouseup", this.startNodeMouseUpEventFunction.bind(this));
    }

    startNodeMouseDownEventFunction() {
        this.drawing = false;
        for (let row of this.nodes) {
            for (let node of row) {
                this.addNodeEnterExitEventListener(node);
            }
        }
    }

    startNodeMouseUpEventFunction() {
        this.drawing = true;
        for (let row of this.nodes) {
            for (let node of row) {
                node.node.removeEventListener("mouseenter", this.boundMouseEnterEventFunctionStart);
                node.node.removeEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
            }
        }
        this.addEventListeners();
        this.drawing = true;
    }

    addNodeEnterExitEventListener(node) {
        node.node.addEventListener("mouseenter", this.boundMouseEnterEventFunctionStart);
        node.node.addEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
    }

    nodeMouseEnterEventFunctionStart(e) {
        e.target.obj.setIcon("img/start.png");
        const new_element = this.start.node.cloneNode(true);
        this.start.node.parentNode.replaceChild(new_element, this.start.node);
        this.start.node = new_element;
        this.start = e.target.obj;
        this.addStartDragEventListeners();
    }

    // End Node

    addEndDragEventListeners() {
        this.end.node.addEventListener("mousedown", this.endNodeMouseDownEventFunction.bind(this));
        this.end.node.addEventListener("mouseup", this.endNodeMouseUpEventFunction.bind(this));
    }

    endNodeMouseDownEventFunction() {
        this.drawing = false;
        for (let row of this.nodes) {
            for (let node of row) {
                this.addNodeEnterExitEventListenerEnd(node);
            }
        }
    }

    endNodeMouseUpEventFunction(e) {
        this.drawing = true;
        for (let row of this.nodes) {
            for (let node of row) {
                node.node.removeEventListener("mouseenter", this.boundMouseEnterEventFunctionEnd);
                node.node.removeEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
            }
        }
        this.addEventListeners();
        this.drawing = true;
    }

    nodeMouseEnterEventFunctionEnd(e) {
        e.target.obj.setIcon("img/end.png");
        const new_element = this.end.node.cloneNode(true);
        this.end.node = new_element;
        this.end = e.target.obj;
        this.addEndDragEventListeners();
    }

    addNodeEnterExitEventListenerEnd(node) {
        node.node.addEventListener("mouseenter", this.boundMouseEnterEventFunctionEnd);
        node.node.addEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
    }

    // Common between start and end

    nodeMouseLeaveEventFunction(e) {
        e.target.obj.removeIcon();
    }

    replaceELement(arr, a, b) {
        let indexN = 0;
        let indexR = 0;

        for (let row of arr) {
            for (let node of row) {
                if (node === a) {
                    indexN = row.indexOf(node);
                    indexR = arr.indexOf(row);
                }
            }
        }

        if (indexN >= 0 && indexR >= 0) {
            arr[indexR][indexN] = b;
        } else {
            console.log(indexN);

            throw Error("No Such Element in array");
        }
    }

    setAsObstacle(e) {
        // console.log(e.target.obj.start);
        if (!e.target.obj.start && !e.target.obj.end) {
            e.target.obj.setObstacle();
            e.target.obj.animate();
        }
    }

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
