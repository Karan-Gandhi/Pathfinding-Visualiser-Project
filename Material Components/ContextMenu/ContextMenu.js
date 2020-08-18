class ContextMenu {
    constructor(menu, elementsToAttach, callbacks, shownCallbacks) {
        this.id = window.btoa(Math.random());
        this.menu = menu;
        this.elementsToAttach = elementsToAttach;
        this.shown = false;
        this.callbacks = callbacks;
        this.shownCallbacks = shownCallbacks;

        this.attachListeners();
        this.menu.style.display = "none";
    }

    getMouseAbsolutePosition(e) {
        let top = e.clientY;
        let left = e.clientX;
        return [top, left];
    }

    attachListeners() {
        document.addEventListener("click", () => (this.shown ? this.disable() : null));
        for (let elt of this.elementsToAttach) {
            elt.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                this.show(e);
                this.contextEvent = e;
            });
        }

        for (let index = 0; index < this.menu.children[0].children.length; index++) this.menu.children[0].children[index].addEventListener("click", (e) => this.callbacks[index](this.contextEvent));
    }

    show(e) {
        const [top, left] = this.getMouseAbsolutePosition(e);
        this.shown = true;
        this.menu.style.display = "";
        this.menu.style.top = top + "px";
        this.menu.style.left = left + "px";
    }

    disable() {
        this.shown = false;
        this.menu.style.display = "none";
    }

    remove() {}
}
