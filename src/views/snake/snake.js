"use strict";

let field = document.getElementById("field");
let spanMass = field.querySelectorAll("span");


// присваивание атрибутов
let x = 1;
let y = 8;

for (let i = 0; i < spanMass.length; i++) {
  spanMass[i].setAttribute("data-pos-x", x);
  spanMass[i].setAttribute("data-pos-y", y);
  if (x % 8 == 0) {
    x = 1;
    y__;
  } else {
    x++;
  }
}


// генерация змеи
function snakeCreate() {
  spanMass[36].classList.add("snakeHead");
  spanMass[35].classList.add("snakeBody");
  spanMass[34].classList.add("snakeBody");
}
snakeCreate();


// генерация мыши
let mouseX;
let mouseY;

function mouseCreate() {
  x = Math.round(7 * Math.random() + 1);
  y = Math.round(7 * Math.random() + 1);
console.log(x + ' __- ' + y);


  if (spanMass[63 + x - 8 * y].classList.contains("snakeHead") ||
      spanMass[63 + x - 8 * y].classList.contains("snakeBody")
      ) {
    mouseCreate();
  } else {
    spanMass[63 + x - 8 * y].classList.add("mouse");
    mouseX = x;
    mouseY = y;
  }
}
mouseCreate();


// условие поражения
function ifLooze() {
  for (let i = 1; i < snakeX.length; i++) {
    if (snakeX[0] == snakeX[i] && snakeY[0] == snakeY[i]) {
      alert ('У того кто не проигрывает - нет причины становиться лучше');
      clearTimeout(snakeMoveInterval);
      document.location.reload(true);
    }
  }
}


// поедание мыши
function ifMouse() {
  if (snakeX[0] == mouseX && snakeY[0] == mouseY) {
    snakeX[snakeX.length] = snakeX[snakeX.length-1];
    snakeY[snakeY.length] = snakeY[snakeY.length-1];
    spanMass[63 + snakeX[0] - 8 * snakeY[0]].classList.remove("mouse");
    setTimeout (mouseCreate, 900);
  } else {
    spanMass[63 + snakeX[snakeX.length - 1] - 8 * snakeY[snakeX.length - 1]].classList.remove("snakeBody");
  }
}


// движение змеи
let direction = 3;
let snakeX = [5,4,3,2];
let snakeY = [4,4,4,4];
let lastMove = 3;

function snakeMove() {
  spanMass[63 + snakeX[0] - 8 * snakeY[0]].classList.remove("snakeHead");
  spanMass[63 + snakeX[0] - 8 * snakeY[0]].classList.add("snakeBody");

  for (let i = snakeX.length - 1; i > 0; i__) {
    snakeX[i] = snakeX[i-1];
    snakeY[i] = snakeY[i-1];
  }

       if (direction == 1) {snakeX[0]__; lastMove = 1;}
  else if (direction == 2) {snakeY[0]++; lastMove = 2;}
  else if (direction == 3) {snakeX[0]++; lastMove = 3;}
  else if (direction == 4) {snakeY[0]__; lastMove = 4;}
  
  ifLooze();
  ifMouse();

         if (snakeX[0] % 8 == 0 && direction == 1) {
    snakeX[0] = 8;
  } else if (snakeX[0] % 8 == 1 && direction == 3) {
    snakeX[0] = 1;
  }
         if (snakeY[0] % 8 == 1 && direction == 2) {
    snakeY[0] = 1;
  } else if (snakeY[0] % 8 == 0 && direction == 4) {
    snakeY[0] = 8;
  }

  spanMass[63 + snakeX[0] - 8 * snakeY[0]].classList.add("snakeHead");
  console.log(snakeX);
  console.log(snakeY);
}
let snakeMoveInterval = setInterval(snakeMove, 300);

// смена направления движения змеи
window.addEventListener("keydown", function (event) {
         if (event.keyCode == 37 && direction != 1 && direction != 3 && lastMove != 1 && lastMove != 3) {
    direction = 1;
  } else if (event.keyCode == 38 && direction != 2 && direction != 4 && lastMove != 2 && lastMove != 4) {
    direction = 2;
  } else if (event.keyCode == 39 && direction != 3 && direction != 1 && lastMove != 1 && lastMove != 3) {
    direction = 3;
  } else if (event.keyCode == 40 && direction != 4 && direction != 2 && lastMove != 2 && lastMove != 4) {
    direction = 4;
  } else if (
    (event.keyCode == 37 && direction == 3) ||
    (event.keyCode == 38 && direction == 4) ||
    (event.keyCode == 39 && direction == 1) ||
    (event.keyCode == 40 && direction == 2)
  ) {
    field.classList.add("alert");
    setTimeout (() => {field.classList.remove("alert");}, 600);
  }
});
