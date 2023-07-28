document.addEventListener("DOMContentLoaded", function(){
    let cells = document.querySelectorAll("[data-cell]");
    if (!cells) return;

    let game = new Game(cells);

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            let row = game.calculateRow(index);
            let column = game.calculateColumn(index,row);
            game.cellClicked(row,column);
        });
    });
})