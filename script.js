const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    // Changing velocity value based on key press
    if((e.key === "ArrowUp" && velocityY != 1) ) {
        velocityX = 0;
        velocityY = -1;

    } else if((e.key === "ArrowDown" && velocityY != -1)) {
        velocityX = 0;
        velocityY = 1;
    } else if((e.key === "ArrowLeft" && velocityX != 1)) {
        velocityX = -1;
        velocityY = 0;
    } else if((e.key === "ArrowRight" && velocityX != -1)) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    let q=``

    // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {

        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // Updating the snake's head position based on the current velocity
    x=snakeX
    y=snakeY
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
        return gameOver = true;
    }
    
    if(snakeBody.length==1){
        if(velocityY==-1 && velocityX == 0){
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image: url("snakehead.png");transform: rotate(180deg)';></div>`;
        }
        else if(velocityY==0 && velocityX == -1){
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image:url("snakehead.png");transform: rotate(90deg);'></div>`;

        }
        else if(velocityY==0 && velocityX == 1){
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image:url("snakehead.png");transform: rotate(-90deg);'></div>`;

        }
        else{
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image:url("snakehead.png")'></div>`;
        }


    }

    else{
        if(velocityY==-1){
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image: url("snakehead.png");transform: rotate(180deg)';></div>`;
            q=`<div class="Monkey" style='grid-area: ${snakeBody[snakeBody.length-1][1]} / ${snakeBody[snakeBody.length-1][0]};transform: rotate(90deg)';></div>`;
        
        }
        else if(velocityX == -1){
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image:url("snakehead.png");transform: rotate(90deg);'></div>`;
            q=`<div class="Monkey" style='grid-area: ${snakeBody[snakeBody.length-1][1]} / ${snakeBody[snakeBody.length-1][0]};transform: rotate(0deg);'></div>`;

        }
        else if(velocityX == 1){
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image:url("snakehead.png");transform: rotate(-90deg);'></div>`;
            q=`<div class="Monkey" style='grid-area: ${snakeBody[snakeBody.length-1][1]} / ${snakeBody[snakeBody.length-1][0]};transform: rotate(180deg);'></div>`;

        }
        else{
            html+=`<div class="nigga" style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]};background-image:url("snakehead.png")'></div>`;
            q=`<div class="Monkey" style='grid-area: ${snakeBody[snakeBody.length-1][1]} / ${snakeBody[snakeBody.length-1][0]};transform: rotate(-90deg)'></div>`;
        }
        
        

    for (let i = 1; i < snakeBody.length-1; i++) {

            if(velocityX==1 || velocityX==-1){
            
                html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};transform:rotate(90deg);"></div>`;
            }
            else{
                
    
                
                html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
            
    
            }

        

        
        
        
        // Adding a div for each part of the snake's body
        
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }}
    playBoard.innerHTML = html+q;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);