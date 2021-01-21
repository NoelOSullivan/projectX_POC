var canvas, stage;

function initCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    stage = new createjs.Stage("canvas");

}

function handleTick() {
    stage.update();
}

function drawCircle() {
    circle = new createjs.Shape();
    randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    posX = getRandomArbitrary(0, document.body.clientWidth);
    posY = getRandomArbitrary(0, document.body.clientHeight);
    radius = getRandomArbitrary(0, document.body.clientWidth / 2);
    circle.graphics.beginFill(randomColor).drawCircle(posX, posY, radius);

    // circle.x = circle.y = 50;
    stage.addChild(circle);
    stage.update();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

