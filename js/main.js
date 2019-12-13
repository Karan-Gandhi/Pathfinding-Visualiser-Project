var grid;
var pointw = 30;

window.onload = () => {
    grid = new Grid((window.innerHeight / pointw) - 1, (window.innerWidth / pointw) - 1, document.getElementById('root'), pointw, pointw);
}