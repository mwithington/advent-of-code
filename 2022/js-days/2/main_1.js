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
        'Z': { score: SCORE.WIN, play: PLAY_VALUE.PAPER },
        'X': { score: SCORE.LOSS, play: PLAY_VALUE.SCISSORS }
    },
    PAPER: {
        'Z': { score: SCORE.WIN, play: PLAY_VALUE.SCISSORS },
        'X': { score: SCORE.LOSS, play: PLAY_VALUE.ROCK }
    },
    SCISSORS: {
        'Z': { score: SCORE.WIN, play: PLAY_VALUE.ROCK },
        'X': { score: SCORE.LOSS, play: PLAY_VALUE.PAPER }
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
        const myOutcome = element[2];
        const theirChoice = THEIR_PLAY[element[0]];
        if ( myOutcome === 'Y' ) {
           score += SCORE.DRAW;
           score += PLAY_VALUE[theirChoice]
        } else {
            score += OUTCOME[theirChoice][myOutcome].score;
            score += OUTCOME[theirChoice][myOutcome].play;
        }
        
    }
    console.log(score);
}

run();