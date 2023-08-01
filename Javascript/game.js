class Game {
    constructor(cells,gamestatus, playerOneScore, playerTwoScore, playerTwoName){
        this.cellArray = new Array(3);
        for (let i = 0; i < this.cellArray.length; i++) this.cellArray[i] = new Array(3).fill(" "); 
        this.playerNumbers = 1;
        this.playersTurn = 1;
        this.gamestatus = gamestatus
        this.cells = cells;
        this.playerOneScore = playerOneScore;
        this.playerTwoScore = playerTwoScore;
        this.playerTwoName = playerTwoName;
    }

    cellClicked(row, column) {
        if (this.cellArray[row][column] !== " ") return; 
        if (this.playersTurn === 0) return;

        if(this.playersTurn === 1)
        {
            this.drawSymbol(row,column,"X","blue");
            if (this.playersTurn !== 0) this.playersTurn = 2;
        } 
        else if(this.playersTurn === 2 && this.playerNumbers === 2)
        {
            this.drawSymbol(row,column,"O","red");
            if (this.playersTurn !== 0) this.playersTurn = 1;
        } 

        if (this.playerNumbers === 1 && this.playersTurn !== 0) setTimeout( () => this.aiTurn(), 1000);
    }

    drawSymbol(row, column, symbol, color)
    {
        this.cellArray[row][column] = symbol;
        if (!this.cells) return;
        let cellIndex = row * 3 + column;
        this.cells[cellIndex].innerHTML = symbol;
        this.cells[cellIndex].style.color = color;
        this.cells[cellIndex].style.fontSize = "1px";
        let interval = setInterval(() =>this.increaseCellFontSize(cellIndex,interval),10);
        this.checkWinCondditions(symbol);
    }

    aiTurn() 
    {
        if(this.playersTurn !== 2) return;
        let freeCells = this.findFreeCells();
        if (freeCells.length === 0) return;
        let targetCell = 0;
        if (freeCells.length > 1) targetCell = freeCells[this.randomCellPick(freeCells.length)];
        let row = this.calculateRow(targetCell);
        let column = this.calculateColumn(targetCell,row);
        this.drawSymbol(row,column,"O","red");
        if(this.playersTurn !== 0) this.playersTurn = 1;
    }

    checkWinCondditions(symbol) {

        for (let i = 0; i < this.cellArray.length; i++)
        {
            let symbolCount = 0;
            for (let u = 0; u < this.cellArray[i].length; u++)
            {
                if (symbol === this.cellArray[i][u]) symbolCount++;
            }

            if (symbolCount === 3)
            {
                this.setVictory(this.playersTurn);
                return;
            } 
        }

        for (let i = 0; i < this.cellArray.length; i++)
        {
            let symbolCount = 0;
            for (let u = 0; u < this.cellArray[i].length; u++)
            {
                if (symbol === this.cellArray[u][i]) symbolCount++;
            }

            if (symbolCount === 3)
            {
                this.setVictory(this.playersTurn);
                return;
            } 
        }

        for (let i = 0, symbolCount = 0; i < this.cellArray.length; i++)
        {
            if (symbol === this.cellArray[i][i]) symbolCount++;
            if (symbolCount === 3)
            {
                this.setVictory(this.playersTurn);
                return;
            } 
        }

        for (let i = 0, u = 2, symbolCount = 0; i < this.cellArray.length; i++, u--) 
        {
            if (symbol === this.cellArray[u][i]) symbolCount++;
            if (symbolCount === 3)
            {
                this.setVictory(this.playersTurn);
                return;
            } 
        }

        if (this.findFreeCells().length  === 0) 
        {
            this.setDraw();
        }
    }

    setVictory(player)
    {
        this.playersTurn = 0;
        setTimeout( () => this.displayVictory(player), 2000);  
        setTimeout( () => this.restartGame(), 4000);    
    }

    displayVictory(player)
    {
        this.gamestatus.style.display = "flex";
        this.gamestatus.innerHTML = "Player " + player + " has won the round";
        this.cells.forEach(cell => {
            cell.style.display = "none";
        });

        if (player === 1) 
        {
            this.gamestatus.style.color = "blue";
            this.playerOneScore.innerHTML = parseInt(this.playerOneScore.innerHTML) + 1;
        }
        else 
        {
            this.gamestatus.style.color = "red";
            this.playerTwoScore.innerHTML = parseInt(this.playerTwoScore.innerHTML) + 1;
        }
    }

    resetScore()
    {
        this.playerOneScore.innerHTML = 0;
        this.playerTwoScore.innerHTML = 0;
    }

    displayGameBoard()
    {
        this.gamestatus.style.display = "none";
        this.cells.forEach(cell => {
            cell.style.display = "flex";
        }); 
    }

    setDraw()
    {
        this.playersTurn = 0;
        setTimeout( () => this.displayDraw(), 2000);  
        setTimeout( () => this.restartGame(), 4000);    
    }

    displayDraw()
    {
        this.gamestatus.style.display = "flex";
        this.gamestatus.innerHTML = "It's a draw"
        this.cells.forEach(cell => {
            cell.style.display = "none";
        });
        this.gamestatus.style.color = "black";
    }

    restartGame()
    {
        this.playersTurn = 1;
        for (let i = 0; i < this.cellArray.length; i++)
        {
            for (let u = 0; u < this.cellArray[i].length; u++) this.cellArray[i][u] = " ";
        }

        this.cells.forEach(cell => {
            cell.innerHTML = "";
            cell.style.color ="black";
        })

        this.displayGameBoard();
    }

    findFreeCells()
    {
        let free = [];
        this.cells.forEach((cell, index) => {
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

    increaseCellFontSize(cellIndex, interval)
    {
        let fontsize = parseInt(this.cells[cellIndex].style.fontSize);
        if (fontsize >= 50) clearInterval(interval);
        this.cells[cellIndex].style.fontSize = fontsize + 1 + "px";
    }

    setOnePlayerMode()
    {
        this.playerNumbers = 1;
        this.playerTwoName.innerHTML = "Player 2 (AI)";
        this.resetScore();
        this.restartGame();
    }

    setTwoPlayerMode()
    {
        this.playerNumbers = 2;
        this.playerTwoName.innerHTML = "Player 2";
        this.resetScore();
        this.restartGame();
    }

}