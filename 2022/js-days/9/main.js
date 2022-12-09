const fs = require('fs');

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

class Coord {
    x;
    y;
    constructor (x,y) {
        this.x = x;
        this.y = y;
    }
}


class Rope {
    head;
    tail;

    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    areAdj() {

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
    console.log(headMoves);
    for (let index = 0; index < headMoves.length; index++) {
        const move = headMoves[index].split(' ');
        console.log(move);
        const axis = MOVE_ENUM[move[0]].axis;
        const dirMod = MOVE_ENUM[move[0]].dir * move[1];
        rope.head[axis] += dirMod;
        console.log(axis, dirMod);
        if(MOVE_ENUM[move[0]].dir > 1 ) {
            console.log('tail needs move too');
            // rope.
        }
        
        // break;
        
    }
    console.log(rope);
}

run();