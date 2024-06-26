//Game Consts & Var
let inputDir= {x:0,y:0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed=5;
let lastPaintTime=0;
score=0;
let snakeArr=[
    {x:13,y:15}
];
food ={x:5,y:6};
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if u bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if u bump into walls
    if( snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine(){
    //p1:update snake array&food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        score=0;
        scoreBox.innerHTML="Score: "+score;
        alert("Game Over.Press any key to play again!");
        snakeArr=[{x:13,y:15}]
        food ={x:5,y:6};
        musicSound.play();
        // score=0;
    }
    //snake ate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>Highscoreval){
            Highscoreval=score;
            localStorage.setItem("Highscore",JSON.stringify(Highscoreval));
            highscoreBox.innerHTML="HighScore: "+Highscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        // const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //p2:display the snake
    //disp Snake
    board.innerHTML ="";
    snakeArr.forEach((e, index)=>{
       snakeElement=document.createElement('div');
       snakeElement.style.gridRowStart  = e.y;
       snakeElement.style.gridColumnStart  = e.x;
       if(index === 0){
        snakeElement.classList.add('head');
       }
       else{
        snakeElement.classList.add('snake');
       }
       board.appendChild(snakeElement);
    });
    //disp food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart  = food.y;
    foodElement.style.gridColumnStart  = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Logic
musicSound.play();
let Highscore = localStorage.getItem("Highscore");
if(Highscore===null){
    Highscoreval=0;
    localStorage.setItem("Highscore",JSON.stringify(Highscoreval))
}
else{
    Highscoreval=JSON.parse(Highscore);
    highscoreBox.innerHTML="HighScore: "+Highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;    
    }
});
