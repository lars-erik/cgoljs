export class Game {
    
    constructor() {
        this.cells = {};
    }

    awaken(x, y) {
        if (x instanceof Array) {
            y = x[1];
            x = x[0];
        }
        let row = this.cells[y] || (this.cells[y] = {});
        row[x] = true;
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
                }
            });
        });

        this.cells = newCells;
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