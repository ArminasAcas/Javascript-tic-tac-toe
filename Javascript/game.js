class Game {
    constructor(){
        this.cells = new Array(3);
        for (let i = 0; i < this.cells.length; i++) this.cells[i] = new Array(3).fill(" "); 
        this.playerNumbers = 1;
    }

    cellClicked(row, column) {
        if(this.playerNumbers !== 1) return;
        if (this.cells[row][column] !== " ") return; 
        this.drawSymbol(row,column,"x");
        setTimeout( () => this.aiDrawSymbol(), 1000); 
    }

    drawSymbol(row, column, symbol)
    {
        this.cells[row][column] = symbol;
        let cells = document.querySelectorAll("[data-cell]");
        cells[row * 3 + column].innerHTML = symbol;
    }

    aiDrawSymbol() 
    {
        let cells = document.querySelectorAll("[data-cell]");
        let free = [];
        cells.forEach((cell, index) => {
            if (cell.innerHTML === "") free.push(index);
        }); 
        
        if (free.length === 0) return;
        let freeCells = free.length;
        let targetCell = 0;
        if (freeCells > 1) targetCell = free[this.randomInteger(freeCells)];
        let row = Math.floor((targetCell)/ 3);
        let collumn = targetCell - row * 3;
        this.drawSymbol(row,collumn,"o");
    }

    randomInteger(max) 
    {
        return Math.round(Math.random() * (max-1));
    }

}