function retracePath(current) {
    var temp = current;
    var fpath = [];
    fpath.push(temp);

    while (temp.previous != undefined) {
        fpath.unshift(temp.previous);
        temp = temp.previous;
    }

    var i = 0;
    var int = setInterval(() => {
        if (i === fpath.length) {
            clearInterval(int);
            return;
        }
        if (fpath[i + 1]) {
            if (fpath[i + 1].x > fpath[i].x) {
                fpath[i].rotate(0);
            }
            if (fpath[i + 1].x < fpath[i].x) {
                fpath[i].rotate(180);
            }
            if (fpath[i + 1].y > fpath[i].y) {
                fpath[i].rotate(90);
            }
            if (fpath[i + 1].y < fpath[i].y) {
                fpath[i].rotate(-90);
            }
        }
        if (i > 0) {
            fpath[i - 1].removeIcon();
        }
        fpath[i].setColour("#ffeb3b");
        fpath[i].setIcon("img/start.png");
        i++;
    }, 400);
}
