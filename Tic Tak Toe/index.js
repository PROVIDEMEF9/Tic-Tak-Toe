const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGame=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Let's create a function to initialise the game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

   ///UI empty 
   boxes.forEach((box,index)=>{
       boxes[index].innerText="";
       boxes[index].style.pointerEvents="all";  
        ///initialize box with css properties again
        box.classList=`box box${index+1}`;

   })
    newGame.classList.remove("active");
    gameInfo.innerHTML=`Current Player - ${currentPlayer}`;
}

 initGame();

 boxes.forEach((box,index)=>{
   box.addEventListener("click",function(){
    handleclick(index);
   })
 })

 function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]] !=="") && (gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]])){
             ///check if Winner is X
             if(gameGrid[position[0]]==="X"){
                answer="X";
             } else{
                answer="O";
             }
             //diable pointer events
             boxes.forEach((box) =>{
                box.style.pointerEvents="none";
             })

             //now we know x/o is a winner
             boxes[position[0]].classList.add("win");
             boxes[position[1]].classList.add("win");
             boxes[position[2]].classList.add("win");
             
        }
    })

    //it means we have a winner
    if(answer !==""){
       gameInfo.innerText=`Winner Player - ${answer}`;
    newGame.classList.add("active");
    return;
    }

    // game tie
    let fillCount =0;
    gameGrid.forEach((box) =>{
        if(box!=""){
            fillCount++;
        }
    });

    //board is filled,game is TIE
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGame.classList.add("active");
    }
    
 }

 function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    } else{
        currentPlayer="X";
    }

    // UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
 }

 function handleclick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";        // swap player
        swapTurn();

        //check if someone won

        checkGameOver();
    }
 }

 newGame.addEventListener("click",initGame);