function drawCircle() {
    circle = new createjs.Shape();
    randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    posX = getRandomNumberFromRange(0, document.body.clientWidth);
    posY = getRandomNumberFromRange(0, document.body.clientHeight);
    radius = getRandomNumberFromRange(0, document.body.clientWidth / 2);
    circle.graphics.beginFill(randomColor).drawCircle(posX, posY, radius);
    stage.addChild(circle);
    stage.update();
}

function drawSquare() {
    square = new createjs.Shape();
    randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    posX = getRandomNumberFromRange(0, document.body.clientWidth);
    posY = getRandomNumberFromRange(0, document.body.clientHeight);
    width = height = getRandomNumberFromRange(0, document.body.clientWidth / 2);
    square.graphics.beginFill(randomColor).drawRect(posX, posY, posX + width, posY + height);
    stage.addChild(square);
    stage.update();
}