const fs = require('fs');

const { Coord } = require('./Coord');
const { Point } = require('./Point');

function run () {
    const input = fs.readFileSync('./input.txt').toString();
    const rows = splitLines(input);
    const grid = buildGrid(rows);
    const paths = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}

function splitLines (input) {
    return input.split('\n')
};

function buildGrid(rows) {
    const height = rows.length;
    const width = rows[0].length;
    const grid = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // calc char value at point for z
            let z = rows[y][x].charCodeAt(0);
            if( z === 69 ) {
                z = 'z'.charCodeAt(0);
            } else if (z ===83) {
                z = 'a'.charCodeAt(0); 
            };
            const coord = new Coord(x, y, z)
            const point = new Point(coord, rows[y][x]);
            grid.push(point);
        }
    }
    return grid;
}

function aStar(start, end, remainingCost) {

    // Manhattan distance
    const cost = Math.abs(cell.pos.x - end.pos.x) + Math.abs(cell.pos.y - end.pos.y);
    const set = new Set();
}

function dijkstra(){

}

run();