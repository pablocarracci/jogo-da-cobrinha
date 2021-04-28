// variáveis
let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo

let context = canvas.getContext("2d"); // context renderiza o desenho
let box = 32;

// variavel para cobra andar
let snake = []; 
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

// variavel para direçao da criarCobrinha
let direction = "right";

let food = newFood()

// Returns a food object on a random position
function newFood() {
    return {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}

function drawBackground() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawSnake() {
    snake.forEach(element => {
        context.fillStyle = 'green';
        context.fillRect(element.x, element.y, box, box);
    })
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

// Returns true if snake has collided
function collided() {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }
}

function stopGame() {
    clearInterval(jogo);
    alert('Game Over :( | Atualize sua página ');
}

// Returns true if snake has eaten the food
function scored(snakeHead) {
    return snakeHead.x == food.x && snakeHead.y == food.y;
}

document.addEventListener('keydown', listen);

function listen(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// funçao principal
function iniciarJogo(){  

    // funcionabilidade para ela atravessar as paredes
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    if (collided()) {
        stopGame();
    }

    // chamando a funçao
    drawBackground();
    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // coordenadas onde a cobrinha vai seguir
    if(direction == "right") snakeX += box; // se a direçao for igual a right adicione 1 a box (quadradinho) na posiçao x
    if(direction == "left") snakeX -= box; // se a direçao for igual a left subtraia 1 a box (quadradinho) na posiçao x
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if (scored(snakeHead)) {
        food = newFood();
    } else {
        snake.pop();
    }
    
    // variável que adiciona um nova cabeça
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

// variavel para iniciar jogo // 100 milisegundos
let jogo = setInterval(iniciarJogo, 100);




