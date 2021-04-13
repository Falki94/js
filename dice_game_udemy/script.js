'use strict';
const player_0_Element = document.querySelector('.player--0');
const player_1_Element = document.querySelector('.player--1')
const score_0_Element = document.querySelector('#score--0');
const score_1_Element = document.getElementById('score--1');
const current_0_Element = document.getElementById('current--0');
const current_1_Element = document.getElementById('current--1');
const dice_Element = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let scores, currentScore, activePlayer,playing;

 // Starting Conditions
const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing=true;
    score_0_Element.textContent = 0;
    score_1_Element.textContent = 0;
    current_0_Element.textContent=0;
    current_1_Element.textContent=0;
    dice_Element.classList.add('hidden');
    player_0_Element.classList.remove('player--winner');
    player_1_Element.classList.remove('player--winner');
    player_0_Element.classList.add('player--active');
    player_1_Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player_0_Element.classList.toggle('player--active');
    player_1_Element.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () { 
    if (playing) {
        // Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        dice_Element.classList.remove('hidden');
        dice_Element.src = `dice-${dice}.png`;

        // Check for rolled 1:
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
            // current_0_Element.textContent = currentScore;
        }
        else {
            switchPlayer();
            // Switch to next player
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >=100, 
        if (scores[activePlayer] >= 10) {
            //Finish the game
            playing = false;
            dice_Element.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);