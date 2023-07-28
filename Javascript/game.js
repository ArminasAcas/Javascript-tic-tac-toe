class Game {
    constructor(cells){
        this.cellArray = new Array(3);
        for (let i = 0; i < this.cellArray.length; i++) this.cellArray[i] = new Array(3).fill(" "); 
        this.playerNumbers = 1;
        this.playersTurn = 1;
        this.cells = cells;
    }

    cellClicked(row, column) {
        if (this.playerNumbers !== 1) return;
        if (this.cellArray[row][column] !== " ") return; 
        if (this.playersTurn !== 1) return;

        this.drawSymbol(row,column,"x","blue");
        this.playersTurn = 2; 
        setTimeout( () => this.aiTurn(), 1000);
    }

    drawSymbol(row, column, symbol, color)
    {
        this.cellArray[row][column] = symbol;
        if (!this.cells) return;
        this.cells[row * 3 + column].innerHTML = symbol;
        this.cells[row * 3 + column].style.color = color;
    }

    aiTurn() 
    {
        let freeCells = this.findFreeCells(this.cells);
        if (freeCells.length === 0) return;

        let targetCell = 0;
        if (freeCells.length > 1) targetCell = freeCells[this.randomCellPick(freeCells.length)];
        let row = this.calculateRow(targetCell);
        let column = this.calculateColumn(targetCell,row);
        this.drawSymbol(row,column,"o","red");
        this.playersTurn = 1;
    }

    findFreeCells(cells)
    {
        let free = [];
        cells.forEach((cell, index) => {
            if (cell.innerHTML === "") free.push(index);
        }); 
        return free;
    }

    randomCellPick(max) 
    {
        return Math.round(Math.random() * (max-1));
    }

    calculateRow(index)
    {
        return Math.floor(index /3);
    }

    calculateColumn(index, row)
    {
        return index - row * 3;
    }

}