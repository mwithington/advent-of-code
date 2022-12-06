const fs = require('fs');

const MY_PLAY = {
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS'
};

const THEIR_PLAY = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS'
};

const PLAY_VALUE = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
}
const SCORE = {
    WIN: 6,
    DRAW: 3,
    LOSS: 0
}

const OUTCOME = {
    ROCK: {
        'SCISSORS': SCORE.WIN,
        'PAPER': SCORE.LOSS
    },
    PAPER: {
        'ROCK': SCORE.WIN,
        'SCISSORS': SCORE.LOSS
    },
    SCISSORS: {
        'PAPER': SCORE.WIN,
        'ROCK': SCORE.LOSS
    }
};


function gamesSplit (input) {
    return input.split('\n');
}


function run() {
    const file = fs.readFileSync('./input.txt');
    const input = file.toString();
    const gamesList = gamesSplit(input);
    let score = 0;
    for (let index = 0; index < gamesList.length; index++) {
        const element = gamesList[index];
        const myChoice = MY_PLAY[element[2]];
        const theirChoice = THEIR_PLAY[element[0]];
        console.log(element);
        if ( myChoice === theirChoice ) {
           score += SCORE.DRAW;
           score += PLAY_VALUE[myChoice]
        } else {
            score += OUTCOME[myChoice][theirChoice];
            score += PLAY_VALUE[myChoice];
        }
        
    }
    console.log(score);
}

run();