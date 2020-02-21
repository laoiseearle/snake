const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;

/*  
TODO: Add function to change scale of board (SMALL: 25x16, MEDIUM:20x20, LARGE: 10x40).
When large is selected, reduce lineWidth for food border 
*/
const cellSize = 25; 
const numOfCells = 16;

const setPosCoords = (xVal, yVal) => ({ x: xVal,y: yVal });
const randomPos = () => Math.floor(Math.random() * numOfCells) * cellSize;
const generateFood = () => setPosCoords(randomPos(), randomPos());

// Initial snake & food positions
let snake = [setPosCoords((numOfCells / 2) * cellSize, (numOfCells / 2) * cellSize)];
let food = generateFood();

let snakeHead;
let snakeDir;
let canChangeDir = true;

// User input
document.addEventListener("keydown", e => {
    if(canChangeDir){
        if(e.key === "ArrowLeft" && snakeDir !== "right"){
            snakeDir = "left";
        } else if(e.key === "ArrowUp" && snakeDir !== "down"){
            snakeDir = "up";
        } else if(e.key === "ArrowRight" && snakeDir !== "left"){
            snakeDir = "right";
        } else if(e.key === "ArrowDown" && snakeDir !== "up"){
            snakeDir = "down";
        }
        canChangeDir = false;
    }
});

const isEqual = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);

    for(let key of obj1Keys){
        if(obj1[key] !== obj2[key]){
            return false;
        }
    }
    return true;
} 

const gameSpeed = () => {
}

const draw = () => {
    // Background
    ctx.fillStyle = "#191919";
    ctx.fillRect(0, 0, width, height);

    drawFood();
    drawSnake();
    moveSnake();
 }

const tailHit = (head, snakeArray) => {
     for(let i = 0; i < snakeArray.length; i++){
         if(isEqual(head, snakeArray[i])){
                // TODO: Add game over function
                console.log("tail hit");
            }
     }
}

const drawSnake = () => {
    for(let i = 0; i < snake.length; i++){
        if(i == 0 
            ? ctx.fillStyle = "#84DF1D" 
            : ctx.fillStyle = "#66A919");        
        ctx.lineWidth = 2;
        ctx.strokeStyle = "darkgreen";
        ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
        ctx.strokeRect(snake[i].x, snake[i].y, cellSize, cellSize);
     }
    snakeHead = setPosCoords(snake[0].x, snake[0].y);
    eatFood();
}

const drawFood = () => {
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#191919";
    ctx.fillStyle = "#eb4e08";
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
    ctx.strokeRect(food.x, food.y, cellSize, cellSize);
}

const eatFood = () => {
    if(isEqual(food, snakeHead)){             
        food = generateFood(); 
  }else{
      snake.pop();        
  }
}

 const moveSnake = () => {    
        if(snakeDir === "left"){
            if(snakeHead.x === 0 
                ? snakeHead.x = width - cellSize 
                : snakeHead.x -= cellSize);
        } else if(snakeDir === "up"){
            if(snakeHead.y < cellSize 
                ? snakeHead.y = height - cellSize 
                : snakeHead.y -= cellSize);
        } else if(snakeDir === "right"){
            if(snakeHead.x >= width - cellSize 
                ? snakeHead.x = 0 
                : snakeHead.x += cellSize);
        } else if(snakeDir === "down"){
            if(snakeHead.y >= height - cellSize 
                ? snakeHead.y = 0 
                : snakeHead.y += cellSize);
        }    
    tailHit(snakeHead, snake);
    snake.unshift(snakeHead);
    canChangeDir = true;
    }

// TODO: change to requestAnimationFrame
setInterval(draw, 70); 
