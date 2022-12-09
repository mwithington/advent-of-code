const fs = require('fs');

function splitItems (itemsList) {
    return itemsList.split('\n')
}

class Tree {
    pos;
    height;
    constructor(pos, height) {
        this.pos = pos;
        this.height = height;
    }

    isVisible() {

    }
}

// function RowToTrees(row) {
//     for (let index = 0; index < row.length; index++) {
//         const tree = row[index];
        
//     }
// } //maybe


// 30373
// 25512
// 65332
// 33549
// 35390
function run () {
    const file = fs.readFileSync('./input.txt');
    const input = file.toString();
    const itemsList = splitItems(input);
    const visibileOutside = (itemsList[0].length - 1) * (itemsList.length - 1);
    const treeGrid = [];

    const trees = itemsList;
    const coordSet = new Set();
    for (let y = 0; y < trees.length; y++) {
        const row = trees[y];
        const treeGridRow = [];
        let previousTmp = -1;
        for (let x = 0; x < row.length; x++) {
            const height = parseInt(row[x]);
            // treeGridRow.push(new Tree([x,y], height));
            if(height > previousTmp){
                coordSet.add(`${x},${y}`);
                previousTmp = height;
            } else {
                previousTmp = -1;
                break;
            }
        }
        for (let x = row.length-1; x >= 0; x--) {
            const height = parseInt(row[x]);
            if(height > previousTmp){
                coordSet.add(`${x},${y}`);
                previousTmp = height;
            } else {
                previousTmp = -1; 
                break;
            }
        }
        // treeGrid.push(treeGridRow);
    }

    for (let x = 0; x < trees[0].length; x++) {
        const element = trees[x];
        let previousTmp = -1;
        for (let y = 0; y < trees.length; y++) {
            const height = trees[y][x];
            if(height > previousTmp) {
                coordSet.add(`${x},${y}`);
                previousTmp = height;
            } else {
                previousTmp = -1;
                break;
            }
        }
      for (let y = trees.length - 1; y >=0; y--) {
            const height = trees[y][x];
            if(height > previousTmp) {
                coordSet.add(`${x},${y}`);
                previousTmp = height;
            } else {
                previousTmp = -1;
                break;
            } 
      } 
        
    }
    // console.log(treeGrid);

    coordSet.forEach((tree) => {
        console.log(tree);

        // let [x, y] = tree.pos;
        // while (x > 1) {
        //     x--;
        // };
        // while (y > 1) {
        //     y--;
        // };
    })
    console.log(coordSet.size);
}

run();

// for (let index = 1; index < itemsList.length - 1; index++) {

//     const treeRow = itemsList[index];
//     const splitRow = itemsList[index].split('');

//     for (let col = 1; col < splitRow.length-1; col++) {
//         const tree = splitRow[col];
//         console.log(tree);

//         if(splitRow[col-1] < splitRow[col]){
//             console.log('Visibile from!')
//         }

//     }
    
//     // console.log(treeRow, itemsList.length);
// }

// console.log(tree, trees[y-1][x]);
// // look up 1 row
// if (trees[y-1][x] < tree ) {
//     console.log('Is Visiable');
// }