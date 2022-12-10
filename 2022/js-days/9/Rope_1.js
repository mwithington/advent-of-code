class Rope {
    head;
    tail;

    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }

    areAdj() {
        const { xDiff, yDiff } = this.calcPosDiff();
        // console.log(this.head.x, this.tail.x);
        if(this.areDiag()) {
            return true;
        }
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
        const { xDiff, yDiff } = this.calcPosDiff();
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

module.exports = Rope;