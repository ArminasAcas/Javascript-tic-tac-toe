document.addEventListener("DOMContentLoaded", function(){
    let game = new Game;

    let cells = document.querySelectorAll("[data-cell]");

    if (cells)
    {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
    
                let row = Math.floor((index )/ 3);
                let collumn = index - row * 3;
                game.cellClicked(row,collumn);
            });
        });
    }
})