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

        for (let i = 0; i < rows; i++) {
            let row = document.createElement("div");
            row.id = "row";
            this.nodes[i] = [];
            for (let x = 0; x < cols; x++) {
                let node = new Node(x, i, nodeWidth, nodeHeight, false, row, false, false, this);
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

        // this.boundMouseEnterEventFunctionStart = this.nodeMouseEnterEventFunctionStart.bind(this);
        // this.boundMouseEnterEventFunctionEnd = this.nodeMouseEnterEventFunctionEnd.bind(this);

        this.currentAlgo = null
    }

    setAlgo(algo) {
        this.currentAlgo = algo;
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

        for (let i = 0; i < this.nodes.length; i++) {
            for (let x = 0; x < this.nodes[i].length; x++) {
                if (!this.nodes[i][x].start && !this.nodes[i][x].end) this.nodes[i][x].node.addEventListener("click", this.setAsObstacle);
            }
        }
    }

    addEventListeners() {
        if (this.drawing) {
            for (let i = 0; i < this.nodes.length; i++) {
                for (let x = 0; x < this.nodes[i].length; x++) {
                    if (!this.nodes[i][x].start && !this.nodes[i][x].end) {
                        this.nodes[i][x].node.addEventListener("mouseover", this.setAsObstacle);
                    }
                }
            }
        }
    }

    removeEventListeners() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let x = 0; x < this.nodes[i].length; x++) {
                if (!this.nodes[i][x].start && !this.nodes[i][x].end) {
                    this.nodes[i][x].node.removeEventListener("mouseover", this.setAsObstacle);
                }
            }
        }
    }

    // when -> start mouse down
    // neighbours -> add mouse enter and exit listener
    // when -> start mouse up
    // neighbours -> remove enter and exit listener
    // 
    // neighbours -> on enter: (recursive)
    //     entered: then, remove listeners of the previous nodes
    //     add mouse down listener:
    //          neighbours -> add enter and exit listener: (recursive)
    //     set start as current node
    //     set start icon
    //
    // 
    //
    // when -> end mouse down
    // neighbours -> add mouse enter and exit listener
    // when -> end mouse up
    // neighbours -> remove enter and exit listener
    // 
    // neighbours -> on enter: (recursive)
    //     entered: then, remove listeners of the previous nodes
    //     add mouse down listener:
    //          neighbours -> add enter and exit listener: (recursive)
    //     set end as current node
    //     set end icon

    // Start node
    addStartDragEventListeners() {
        let grid = this;
        this.start.node.addEventListener('mousedown', this.startNodeMouseDownEventFunction);
        for (let node of this.getAllNodes()) node.addEventListener('mouseup', this.removeStartNeighboursEnterExitListener);
    }

    startNodeMouseDownEventFunction(e) {
        this.pgrid.drawing = false;
        this.pgrid.start.node.addEventListener("mouseleave", grid.onStartDrag);
        this.pgrid.addStartNeighboursEnterExitListener(e);
    }

    onStartDrag(e) {
        this.pgrid.drawing = false;
    }

    addStartNeighboursEnterExitListener(e) {
        for (let node of this.getAllNodes()) {
            node.addEventListener('mouseenter', this.startNeighbourEnterListener);
            node.addEventListener('mouseleave', this.startNeighbourExitListener);
        }
    }

    startNeighbourEnterListener(e) {
        let pstart = this.pgrid.start;
        this.obj.setIcon("img/start.png");
        this.pgrid.start.removeIcon();
        this.removeEventListener('mousedown', this.startNodeMouseDownEventFunction);
        for (let node of this.pgrid.getAllNodes()) node.removeEventListener('mouseup', this.pgrid.removeStartNeighboursEnterExitListener);
        this.pgrid.start = this.obj;
        this.pgrid.targets[0] = this.pgrid.start;
        this.pgrid.addStartDragEventListeners();
        this.pgrid.currentAlgo(this.pgrid.start, this.pgrid.end, 0);
    }

    removeStartNeighboursEnterExitListener(e) {
        this.pgrid.drawing = true;
        for (let neighbour of this.pgrid.getAllNodes()) {
            neighbour.removeEventListener('mouseenter', this.pgrid.startNeighbourEnterListener);
            neighbour.removeEventListener('mouseleave', this.pgrid.startNeighbourExitListener);
        }
    }

    // end node

    addEndDragEventListeners() {
        let grid = this;
        this.end.node.addEventListener('mousedown', this.endNodeMouseDownEventFunction);
        for (let node of this.getAllNodes()) node.addEventListener('mouseup', this.removeEndNeighboursEnterExitListener);
    }

    endNodeMouseDownEventFunction(e) {
        this.pgrid.drawing = false;
        this.pgrid.end.node.addEventListener("mouseleave", grid.onEndDrag);
        this.pgrid.addEndNeighboursEnterExitListener(e);
    }

    onEndDrag(e) {
        this.pgrid.drawing = false;
    }

    addEndNeighboursEnterExitListener(e) {
        for (let node of this.getAllNodes()) {
            node.addEventListener('mouseenter', this.endNeighbourEnterListener);
            node.addEventListener('mouseleave', this.endNeighbourExitListener);
        }
    }

    endNeighbourEnterListener(e) {
        let pend = this.pgrid.end;
        this.obj.setIcon("img/end.png");
        this.pgrid.end.removeIcon();
        this.removeEventListener('mousedown', this.endNodeMouseDownEventFunction);
        for (let node of this.pgrid.getAllNodes()) node.removeEventListener('mouseup', this.pgrid.removeEndNeighboursEnterExitListener);
        this.pgrid.end = this.obj;
        this.pgrid.targets[1] = this.pgrid.end;
        this.pgrid.addEndDragEventListeners();
        this.pgrid.currentAlgo(this.pgrid.end, this.pgrid.end, 0);
        console.log("AS")
    }

    removeEndNeighboursEnterExitListener(e) {
        this.pgrid.drawing = true;
        for (let neighbour of this.pgrid.getAllNodes()) {
            neighbour.removeEventListener('mouseenter', this.pgrid.endNeighbourEnterListener);
            neighbour.removeEventListener('mouseleave', this.pgrid.endNeighbourExitListener);
        }
    }

    // // Start Node

    // addStartDragEventListeners() {
    //     this.start.node.addEventListener("mousedown", this.startNodeMouseDownEventFunction.bind(this));
    //     this.start.node.addEventListener("mouseup", this.startNodeMouseUpEventFunction.bind(this));
    // }

    // startNodeMouseDownEventFunction() {
    //     this.drawing = false;
    //     for (let row of this.nodes) {
    //         for (let node of row) {
    //             this.addNodeEnterExitEventListener(node);
    //         }
    //     }
    // }

    // startNodeMouseUpEventFunction() {
    //     this.drawing = true;
    //     for (let row of this.nodes) {
    //         for (let node of row) {
    //             node.node.removeEventListener("mouseenter", this.boundMouseEnterEventFunctionStart);
    //             node.node.removeEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
    //         }
    //     }
    //     this.addEventListeners();
    //     this.drawing = true;
    // }

    // addNodeEnterExitEventListener(node) {
    //     node.node.addEventListener("mouseenter", this.boundMouseEnterEventFunctionStart);
    //     node.node.addEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
    // }

    // nodeMouseEnterEventFunctionStart(e) {
    //     e.target.obj.setIcon("img/start.png");
    //     const new_element = this.start.node.cloneNode(true);
    //     this.start.node.parentNode.replaceChild(new_element, this.start.node);
    //     this.start.node = new_element;
    //     this.start = e.target.obj;
    //     this.addStartDragEventListeners();
    //     this.currentAlgo(this.start, this.end, 0);
    // }

    // // End Node

    // addEndDragEventListeners() {
    //     this.end.node.addEventListener("mousedown", this.endNodeMouseDownEventFunction.bind(this));
    //     this.end.node.addEventListener("mouseup", this.endNodeMouseUpEventFunction.bind(this));
    // }

    // endNodeMouseDownEventFunction() {
    //     this.drawing = false;
    //     for (let row of this.nodes) {
    //         for (let node of row) {
    //             this.addNodeEnterExitEventListenerEnd(node);
    //         }
    //     }
    // }

    // endNodeMouseUpEventFunction(e) {
    //     this.drawing = true;
    //     for (let row of this.nodes) {
    //         for (let node of row) {
    //             node.node.removeEventListener("mouseenter", this.boundMouseEnterEventFunctionEnd);
    //             node.node.removeEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
    //         }
    //     }
    //     this.addEventListeners();
    //     this.drawing = true;
    // }

    // nodeMouseEnterEventFunctionEnd(e) {
    //     e.target.obj.setIcon("img/end.png");
    //     const new_element = this.end.node.cloneNode(true);
    //     this.end.node = new_element;
    //     this.end = e.target.obj;
    //     this.addEndDragEventListeners();
    //     this.currentAlgo(this.start, this.end, 0);
    // }

    // addNodeEnterExitEventListenerEnd(node) {
    //     node.node.addEventListener("mouseenter", this.boundMouseEnterEventFunctionEnd);
    //     node.node.addEventListener("mouseleave", this.nodeMouseLeaveEventFunction);
    // }

    // // Common between start and end

    // nodeMouseLeaveEventFunction(e) {
    //     e.target.obj.removeIcon();
    // }

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
        if (!e.target.obj.start && !e.target.obj.end && this.pgrid.drawing) {
            e.target.obj.setObstacle();
            e.target.obj.animate();
        }
    }

    addNodeN() {
        for (let i = 0; i < this.rows; i++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[i][x].addNeighbours(this);
            }
        }
    }

    addNodeMN() {
        for (let i = 0; i < this.rows; i++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[i][x].addMNeighbours(this);
            }
        }
    }

    addNodeMW() {
        for (let i = 0; i < this.rows; i++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[i][x].addMWalls(this);
            }
        }
    }

    getAllNodes() {
        let all = [];
        for (let row of this.nodes) {
            for (let node of row) {
                all.push(node.node);
            }
        }
        return all;
    }

    findNode(DOM) {
        for (let row of this.nodes) {
            for (let node of row) {
                if (node.node === DOM) {
                    return node;
                }
            }
        }
    }

    completed() {
        this.start.setIcon("img/start.png");
        this.end.setIcon("img/end.png");
        this.drawing = true;
    }
}
