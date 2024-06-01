score=0;
cross=true;
audio=new Audio('music.mp3');
audiogo=new Audio('gameover.mp3');
//audio.play();
setTimeout(()=>{
    audio.play();
},100);
document.onkeydown=function(e){
    console.log("Key code is:",e.keyCode)
    if(e.keyCode==38){
        dino=document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700);
    }    
    if(e.keyCode==39){
            dino=document.querySelector('.dino');
            dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
            dino.style.left=dinoX+112+"px";
    }
    if(e.keyCode==37){
        dino=document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=(dinoX-112)+"px";
}
}
setInterval(()=>{
    dino=document.querySelector('.dino');
    gameOver=document.querySelector('.gameOver');
    obstacle=document.querySelector('.obstacle');
    
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));//pseudo element 2nd wala
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));//pseudo element 2nd wala
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));//pseudo element 2nd wala
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));//pseudo element 2nd wala
    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);
    if(offsetX<73 && offsetY<52){
        gameOver.innerHTML="Game Over-Reload To Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause();
            audio.pause();
        },1000);
    }
    else if(offsetX<145 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(()=>{
        aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
        newDur=aniDur-0.1;
        obstacle.style.animationDuration=newDur + 's';
        },500);
        
    }
},10);
function updateScore(score){
    scoreCont.innerHTML="Your Score: "+score;
}