const fs = require('fs');
const Coord = require('./Coord');
const Rope = require('./Rope_1');

const MOVE_ENUM = {
    'R': {
        axis: 'x',
        dir: 1
    },
    'L': {
        axis: 'x',
        dir: -1
    },
    'U': {
        axis: 'y',
        dir: 1
    },
    'D': {
        axis: 'y',
        dir: -1
    } 
}



function split(input) {
    return input.split('\n');
}

function run() {
    const file = fs.readFileSync('./input.txt');
    const input = file.toString();

    const knots = [];
    for (let index = 0; index < 10; index++) {
        knots.push(new Coord(0, 0));
    };
    const rope = new Rope();

    const headMoves = split(input);
    const tailMoves = new Set();
    tailMoves.add(`${rope.knots[9].x},${rope.knots[9].y}`);

    for (let index = 0; index < headMoves.length; index++) {
        const move = headMoves[index].split(' ');
        // console.log(move);
        const axis = MOVE_ENUM[move[0]].axis;
        const dirMod = MOVE_ENUM[move[0]].dir * move[1];
        // rope.head[axis] += dirMod;
        console.log(axis, dirMod);

        let step = 0;
        while(step != dirMod){
            let mod = 1 * MOVE_ENUM[move[0]].dir;
            rope.head[axis] += mod; 
            if(!rope.areAdj()){
                // Create new function to move tail in the needed direction and if diag move other axis as well
                // rope.moveTail();
                const { yDiff, xDiff } = rope.calcPosDiff();
                rope.tail[axis] += mod;

                if(xDiff == -1 || xDiff == 1) {
                    console.log('they are diagonal so move x 1 here as well');
                    rope.tail.x += xDiff;
                } else if(yDiff == -1 || yDiff == 1) {
                    console.log('they are diagonal so move y 1 here as well');
                    rope.tail.y += yDiff;
                }

                tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
            }
            step += mod; 
        }
        }
    
    console.log(rope);
    console.log(tailMoves.size);
}

run();