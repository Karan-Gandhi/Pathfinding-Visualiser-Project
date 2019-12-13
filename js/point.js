class Cell {
    constructor(x, y, h, w, obstacle, root, start, end) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.obstacle = obstacle;
        this.root = root;
        this.start = start;
        this.end = end;

        this.point = document.createElement('div');
        this.point.style.position = "absolute";
        this.point.style.left = (x * w) + "px";
        this.point.style.top = (y * h) + "px";
        this.point.style.height = (h) + "px";
        this.point.style.width = (h) + "px";
        this.point.id = "col";

        if (obstacle) {
            this.point.classList.toggle('obstacle');
        }

        this.point.addEventListener('click', (e) => {
            e.target.classList.toggle('obstacle');
            if (!this.obstacle) {
                this.obstacle = true;
            }
        });

        this.root.append(this.point);
    }
}