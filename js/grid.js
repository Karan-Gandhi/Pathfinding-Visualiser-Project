class Grid {
    constructor(rows, cols, root, pw, ph) {
        this.rows = rows;
        this.cols = cols;
        this.root = root;
        this.pw = pw;
        this.ph = ph;
        this.points = [];

        for (var i = 0; i < rows; i++) {
            var row = document.createElement('div');
            row.id = "row";
            for (var x = 0; x < cols; x++) {
                var point = new Cell(x, i, pw, ph, false, row, false, false);
                this.points.push(point);
            }
            this.root.append(row);
        }
        this.points[0].start = true;

        this.root.addEventListener('mousedown', (e) => {
            e.preventDefault();
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].point.addEventListener('mouseout', this.mousedown);
            }
        });

        this.root.addEventListener('mouseup', (e) => {
            e.preventDefault();
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].point.removeEventListener('mouseout', this.mousedown);
            }
        });
    }

    mousedown(e) {
        e.target.classList.toggle('obstacle');
    }
}