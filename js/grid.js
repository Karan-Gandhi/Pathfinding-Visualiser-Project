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
        this.points = [];

        for (var i = 0; i < rows; i++) {
            var row = document.createElement('div');
            row.id = "row";
            this.points[i] = [];
            for (var x = 0; x < cols; x++) {
                var point = new Cell(x, i, pw, ph, false, row, false, false);
                this.points[i].push(point);
            }
            this.root.append(row);
        }
        this.points[0][0].start = true;
        this.points[this.points.length - 1][this.points[this.points.length - 1].length - 1].end = true;
        this.start = this.points[0][0];
        this.end = this.points[this.points.length - 1][this.points[this.points.length - 1].length - 1];
        this.start.setIcon("img/start.png");

        if (this.drawing) {
            this.root.addEventListener('mousedown', (e) => {
                e.preventDefault();
                for (var i = 0; i < this.points.length; i++) {
                    for (var x = 0; x < this.points[i].length; x++) {
                        this.points[i][x].point.addEventListener('mouseout', this.setAsObstacle);
                    }
                }
            });

            this.root.addEventListener('mouseup', (e) => {
                e.preventDefault();
                for (var i = 0; i < this.points.length; i++) {
                    for (var x = 0; x < this.points[i].length; x++) {
                        this.points[i][x].point.removeEventListener('mouseout', this.setAsObstacle);
                    }
                }
            });
        }

        this.root.style.width = this.w + "px";
        this.root.style.height = this.h + "px";
    }

    addPointN() {
        for (var i = 0; i < this.rows; i++) {
            for (var x = 0; x < this.cols; x++) {
                this.points[i][x].addNeighbours(this);
            }
        }
    }

    setAsObstacle(e) {
        e.target.classList.toggle('obstacle');
    }
}