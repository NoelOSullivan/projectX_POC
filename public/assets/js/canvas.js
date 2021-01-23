var canvas, stage;

function initCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    stage = new createjs.Stage("canvas");
}