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
        const xDiff = this.head.x - this.tail.x;
        const yDiff = this.head.y - this.tail.y;
        // console.log(this.head.x, this.tail.x);
        if(xDiff > 1 || xDiff < -1){
            console.log('Needs x movement');
            return false;
        }
        if (yDiff > 1 || yDiff < -1) {
            console.log('Needs y movement'); 
            return false;
        }
        return true;
    }
    areDiag() {
        const xDiff = this.head.x - this.tail.x;
        const yDiff = this.head.y - this.tail.y;
        const upRight = xDiff == 1 && yDiff == 1;
        const upLeft = xDiff == -1 && yDiff == 1; 
        const downLeft = xDiff == -1 && yDiff == -1;
        const downRight = xDiff == 1 && yDiff == -1;

        if(upRight || upLeft || downRight || downLeft) {
            console.log('needs diag move');
            return true;   
        } 
        return false;
    }

    calcPosDiff(){
        return {
            xDiff: this.head.x - this.tail.x,
            yDiff: this.head.y - this.tail.y 
        }
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
        
        let headMv = 0;
        while(headMv != dirMod){
            let mod = 1 * MOVE_ENUM[move[0]].dir;
            console.log('move modifier', mod); 
            if(!rope.areAdj()) {
                rope.tail[axis] += mod;
                tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
            } else {
                rope.head[axis] += mod;
                // check on final loop to see if caught up
                if(!rope.areAdj()) {
                    rope.tail[axis] += mod;
                    tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
                }
                if(rope.areDiag()) {
                    const diff = rope.calcPosDiff();
                    rope.tail.x += diff.xDiff;
                    rope.tail.y += diff.yDiff;
                    tailMoves.add(`${rope.tail.x},${rope.tail.y}`); 
                }
                headMv += mod;
            } 
        }
        // for (let j = 0; j < dirMod; j++) {
        //     if(!rope.areAdj()) {
        //         rope.tail[axis]++;
        //         tailMoves.add(`${rope.tail.x},${rope.tail.y}`);
        //     }
        //     rope.head[axis]++;
        //     // while(!rope.areAdj()) {
        //     //     rope.tail[axis]++;
        //     //     tailMoves.add(`${rope.tail.x},${rope.tail.y}`);   
        //     // }
            
        // }
        if(index == 3){
            break;
        }
        // if(!rope.areAdj()) {
        //     // need to move the tail and track location
            
        // }
    
    }
    console.log(rope);
    console.log(tailMoves);
}

run();