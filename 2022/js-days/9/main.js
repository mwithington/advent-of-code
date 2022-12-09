const fs = require('fs');
const Coord = require('./Coord');
const Rope = require('./Rope');

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

    const rope = new Rope(new Coord(0,0), new Coord(0, 0));
    const headMoves = split(input);
    const tailMoves = new Set();
    tailMoves.add(`${rope.tail.x},${rope.tail.y}`); 
    for (let index = 0; index < headMoves.length; index++) {
        const move = headMoves[index].split(' ');
        console.log(move);
        const axis = MOVE_ENUM[move[0]].axis;
        const dirMod = MOVE_ENUM[move[0]].dir * move[1];
        // rope.head[axis] += dirMod;
        console.log(axis, dirMod);

        let step = 0;
        while(step != dirMod){
            let mod = 1 * MOVE_ENUM[move[0]].dir;
            if(!rope.areAdj()){
                // Create new function to move tail in the needed direction and if diag move other axis as well
                rope.moveTail();
                tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
            }
            rope.head[axis] += mod; 
            step += mod; 
        }

        
        // let headMv = 0;
        // while(headMv != dirMod){
        //     let mod = 1 * MOVE_ENUM[move[0]].dir;
        //     console.log('move modifier', mod); 
        //     if(!rope.areAdj()) {
        //         rope.tail[axis] += mod;
        //         tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
        //     } else {
        //         rope.head[axis] += mod;
        //         // check on final loop to see if caught up
        //         if(!rope.areAdj()) {
        //             rope.tail[axis] += mod;
        //             tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
        //         }
        //         // if(rope.areDiag()) {
        //         //     const diff = rope.calcPosDiff();
        //         //     rope.tail.x += diff.xDiff;
        //         //     rope.tail.y += diff.yDiff;
        //         //     tailMoves.add(`${rope.tail.x},${rope.tail.y}`); 
        //         // }
        //         headMv += mod;
        //     } 
        // }

        if(index == 0){
            break;
        }
    
    }
    console.log(rope);
    console.log(tailMoves);
}

run();