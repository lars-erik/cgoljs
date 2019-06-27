export class Game {
    
    constructor() {
        this.cells = {};
        this.bounding = {left:0,top:0,right:0,bottom:0};
    }

    awaken(x, y) {
        let row = this.cells[y] || (this.cells[y] = {});
        row[x] = true;
        this.updateBounding(x, y);
    }

    isAlive(x, y) {
        return (this.cells[y] || {})[x] || false;
    }

    tick(log) {
        let evalCells = {};
        let newCells = {};
        let rowKeys = Object.keys(this.cells);
        rowKeys.forEach(y => {
            let colKeys = Object.keys(this.cells[y]);
            colKeys.forEach(x => {
                this.addAllForEval(Number(x), Number(y), evalCells);
            });
        })

        rowKeys = Object.keys(evalCells);
        rowKeys.forEach(y => {
            let colKeys = Object.keys(evalCells[y]);
            colKeys.forEach(x => {
                let neighbours = this.countNeighbours(x, y);
                if (neighbours === 3 || (neighbours === 2 && this.isAlive(x, y))) {
                    (newCells[y] || (newCells[y] = {}))[x] = true;
                    this.updateBounding(x, y);
                }
            });
        });

        this.cells = newCells;
    }

    updateBounding(x, y) {
        this.bounding = {
            left: Math.min(Number(x), this.bounding.left),
            right: Math.max(Number(x), this.bounding.right),

            top: Math.min(Number(y), this.bounding.top),
            bottom: Math.max(Number(y), this.bounding.bottom),
        };
    }

    addAllForEval(x, y, evalCells) {
        for(let y2 = -1; y2<=1; y2++) {
            for(let x2 = -1; x2<=1; x2++) {
                (evalCells[y + y2] || (evalCells[y + y2] = {}))[x + x2] = false;
            }
        }
    }

    countNeighbours(x, y) {
        let neighbours = 0;
        for(let y2 = -1; y2<=1; y2++) {
            for(let x2 = -1; x2<=1; x2++) {
                let testX = Number(x) + x2;
                let testY = Number(y) + y2;
                if (!(y2 == 0 && x2 == 0) && this.isAlive(testX, testY)) {
                    neighbours++;
                }
            }
        }
        return neighbours;
    }
}