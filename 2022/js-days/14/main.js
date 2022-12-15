const fs = require('fs');
const Coord = require('./Coord');

function run() {
    const input = fs.readFileSync('./input.txt').toString();
    const points = parseInput(input);
    // console.log(points);
    const grid = drawGrid();
    const drawnPoints = placePoints(points, grid);

    // let lowPoint = 0;
    const start = new Coord(60, 0);
    while(true) {
        if(start.y > 170) {
            break;
        }

        let down = { x: start.x, y: start.y + 1};
        let downLeft = { x: start.x - 1, y: start.y + 1}; 
        let downRight = { x: start.x + 1, y: start.y + 1};

        if(grid[down.y][down.x] === '.'){
            // move down
            start.y = down.y;
        } else if (grid[downLeft.y][downLeft.x] === '.') {
            // move down left
            start.x = downLeft.x;
            start.y = downLeft.y;
        } else if (grid[downRight.y][downRight.x] === '.') {
            //move down right
            start.x = downRight.x;
            start.y = downRight.y;
        } else {
            // place here
            grid[start.y].splice(start.x, 1, "0");
            start.x = 60;
            start.y = 0;
            // break;
        }
        // break;
    }

    const reformG = reformGrid(grid);
    console.log(points);
    // while
    fs.writeFileSync('./test1.txt', reformG.toString())
    
}

function placePoints(points, grid) {
    for (let index = 0; index < points.length; index++) {
        const line = points[index];
        for (let inner = 0; inner < line.length; inner++) {
            const coord = line[inner];
            grid[coord.y].splice(coord.x, 1, "#");
        }
        // grid[index].splice(index, 1, grid[index].join(''));
    }

    return grid;
}

function reformGrid(grid) {
    const reformedGrid = []
    for (let index = 0; index < grid.length; index++) {
        reformedGrid.push(grid[index].join(''));
    }
    return reformedGrid;
}

function parseInput(input) {
    const coordGroups = input.split('\n');
    const output = [];
    for (let index = 0; index < coordGroups.length; index++) {
        const items = coordGroups[index].split(' -> ');
        // console.log(items);
        const coords = [];
        for (let innerInd = 0; innerInd < items.length - 1; innerInd++) {
            const element = items[innerInd].split(',');
            const belement = items[innerInd+1].split(',');
            const pointA = new Coord(parseInt(element[0]) - 440, parseInt(element[1]));
            const pointB = new Coord(parseInt(belement[0]) - 440, parseInt(belement[1]));

            let lineDiff = {
                amt: 0,
                dir: undefined
            };

            if(pointA.x < pointB.x || pointA.x > pointB.x) {
                // console.log('moving in x');
                lineDiff.amt = pointA.x - pointB.x;
                lineDiff.dir = 'x';
            } else if(pointA.y < pointB.y || pointA.y > pointB.y) {
                // console.log('moving in y');
                lineDiff.amt = pointA.y - pointB.y;
                lineDiff.dir = 'y';
            }

            while (lineDiff.amt != 0) {
                let filler;
                if(lineDiff.dir == 'x'){
                    filler = new Coord(pointA[lineDiff.dir]-lineDiff.amt, pointA.y);
                } else {
                    filler = new Coord(pointA.x, pointA[lineDiff.dir]-lineDiff.amt);
                }
                coords.push(filler);
                if(lineDiff.amt < 0){
                    lineDiff.amt+=1;
                } else {

                    lineDiff.amt-=1;
                }
            }

            coords.push(pointA);
            
            // if( items.length - 2 == innerInd) {
                // console.log('final point');
                // coords.push(pointB);
            // }
        }
        output.push(coords);
        // break;

    }
    // console.log(output);
    return output;
}

const MIN_X = 440;
const MAX_X = 600;
const MIN_Y = 0;
const MAX_Y = 200;


function drawGrid () {
    const grid = [];
    let xPoints = '';

    for(let x = MIN_X; x < MAX_X; x++) {
        xPoints += '.';
    }
    xPoints = xPoints.split('')
    for(let y = MIN_Y; y < MAX_Y; y++) {    
        grid.push(Array.from(xPoints));
    }

    return grid;
}


// function build

run();