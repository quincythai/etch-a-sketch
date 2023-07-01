// Create webpage of 16x16 grid of square divs
let board = document.getElementById("board");

function createGrid(numRows, numCols) {
    for (let i = 0; i < numRows; i++) {
        let row = document.createElement('div');
        row.className = "grid-row";
        board.appendChild(row);

        for (let j = 0; j < numCols; j++) {
            let box = document.createElement('div');
            box.className = "box";
            box.innerHTML = j;
            row.appendChild(box);
        }
    }
}

createGrid(16, 16);