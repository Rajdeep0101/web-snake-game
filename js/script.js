// Game constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../sound/food.mp3");
const gameoverSound = new Audio("../sound/gameover.mp3");
const moveSound = new Audio("../sound/move.mp3");
const musicSound = new Audio("../sound/music.mp3");
const hiscoreBox = document.getElementById("hiScoreBox");
const scoreBox = document.getElementById("scoreBox");

let speed = 5;
let lastpainttime = 0;
let score = 0;

let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 9 };

// game functions are here
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // if you bumps into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  //  if you bumps into the wall
  if (
    snakeArr[0].x > 18 ||
    snakeArr[0].y <= 0 ||
    snakeArr[0].y > 18 ||
    snakeArr[0].x <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  //  part1- updating the snake array and food
  if (isCollide(snakeArr)) {
    gameoverSound.play();
    musicSound.pause();
    alert("Game Over..! Plese reload to play again.");
    score = 0;
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    // musicSound.play();
    scoreBox.innerHTML = "Score: " + score;
  }

  // if you have eaten the food ,increment the score and regenerate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = `HiScore:${hiscoreval}`;
    }

    // regenerating the food
    // a and b are the cordinates of row and column in between we want to keep food
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the sanke ******
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part2- display the snake and the food
  // display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElem = document.createElement("div");
    snakeElem.style.gridRowStart = e.y;
    snakeElem.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElem.classList.add("head");
    } else {
      snakeElem.classList.add("snake");
    }
    board.appendChild(snakeElem);
  });

  // display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//  main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
  // console.log(hiScoreBox);
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  if (inputDir.x === 0 && inputDir.y === 0) {
    inputDir = { x: 0, y: -1 }; //start the game
    musicSound.play();
    moveSound.play();
  }

  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      if (inputDir.x === 0 && inputDir.y === 1) {
        return;
      } else {
        inputDir.x = 0;
        inputDir.y = -1;
      }
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      if (inputDir.x === 0 && inputDir.y === -1) {
        return;
      } else {
        inputDir.x = 0;
        inputDir.y = 1;
      }
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      if (inputDir.x === 1 && inputDir.y === 0) {
        return;
      } else {
        inputDir.x = -1;
        inputDir.y = 0;
      }
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      if (inputDir.x === -1 && inputDir.y === 0) {
        return;
      } else {
        inputDir.x = 1;
        inputDir.y = 0;
      }

      break;

    case " ":
      console.log("Space Bar");
      musicSound.pause();
      alert("Game Paused..! Press Space Bar or Enter key to resume.");
      musicSound.play();
      break;
  }
});
