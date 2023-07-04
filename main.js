const grid = document.getElementById('grid');
let color = "";

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // 1fr - 1 fraction of the row's size
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); // add box styling
        box.addEventListener('mouseover', changeBoxColor);
        grid.appendChild(box);
    }
}

createGrid(16);

function changeBoxColor(e) {
    /* Event object itself doesn't have backgroundColor property 
    So we need e.target.style... instead of just e.style...*/
    e.target.style.backgroundColor = "black";
}