//this is a object and use for giving intial score
// const score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
// };


//2nd step convert back JSON obj to JS obj
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};


updateScoreElement();

//    if(score === null){//!score  -->3. step for 
//         score = {
//             wins: 0,
//             losses: 0,
//             ties: 0
//         };
//    }


let isAutoPlaying = false;
let intervalId;

// const autoplay = () =>{
    
// };
function autoplay() {

    if (!isAutoPlaying) {
       intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
    }else{

        clearInterval(intervalId); // will stop or clean
        isAutoPlaying = false;
    }
    
}


//we used addEventListener in the below code
document.querySelector('.js-rock-button')
.addEventListener('click',()=>{
    playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', ()=>{
    playGame('paper');
});

document.querySelector('.js-scissor-button')
.addEventListener('click', ()=>{
    playGame('scissor');
});

document.querySelector('.js-reset-button')
.addEventListener('click', ()=>{
    score.wins= 0,
        score.losses= 0,
        score.ties= 0

        localStorage.removeItem('score')// 1.this is for reset button for reset the value
   
        updateScoreElement();
});

document.querySelector('.js-autoPlay-button')
.addEventListener('click', ()=>{
    autoplay();
})

//below code works for add some keys to play the game based on specified keys
document.body.addEventListener('keydown', (event)=>{
   if(event.key === 'r'){
    playGame('rock');
   }
   else if(event.key === 'p'){
    playGame('paper');
   }
   else if(event.key === 's'){
    playGame('scissor');
   }
});

function playGame(playerMove) {

    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissor') {

        if (computerMove === 'rock') {
            result = 'You Lose..!';
        } else if (computerMove === 'paper') {
            result = 'You Win..!';
        } else if (computerMove === 'scissor') {
            result = 'You Tie..!';
        }
    }


    else if (playerMove === 'paper') {

        if (computerMove === 'rock') {
            result = 'You win..!';
        } else if (computerMove === 'paper') {
            result = 'You Tie..!';
        } else if (computerMove === 'scissor') {
            result = 'You Lose..!';
        }

    }


    else if (playerMove === 'rock') {

        if (computerMove === 'rock') {
            result = 'You Tie..!';
        } else if (computerMove === 'paper') {
            result = 'You Lose..!';
        } else if (computerMove === 'scissor') {
            result = 'You Win..!';
        }

    }

    //updating the score
    if (result === 'You Win..!') {
        score.wins += 1;
    }
    else if (result === 'You Lose..!') {
        score.losses += 1;
    } else if (result === 'You Tie..!') {
        score.ties += 1;
    }



    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;


    document.querySelector('.js-moves')
        .innerHTML = `You
             <img src="images/${playerMove}-emoji.png" alt="">
       
             <img src="images/${computerMove}-emoji.png" alt="">
             Computer`;

    //this code common for all 
    //             alert(`you picked ${playerMove}. Computer picked ${computerMove}. ${result}
    // wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);

}


function updateScoreElement() {

    document.querySelector('.js-score')
        .innerHTML = `wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// ===============================================================

function pickComputerMove() {

    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';

    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissor';
    }

    return computerMove;
}