const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
let color;

// Require mousedown and mousehover to draw
// https://stackoverflow.com/questions/71803395/event-listener-that-fires-only-when-mousedown-mouseover-are-true
document.onmousedown

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // 1fr - 1 fraction of the row's size
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); // add box styling
        box.addEventListener('mouseover', changeBoxColor); // add changeColor on hover
        grid.appendChild(box);
    }
}

createGrid(16);

function changeBoxColor(e) {
    /* Event object itself doesn't have backgroundColor property 
    So we need e.target.style... instead of just e.style...*/
    e.target.style.backgroundColor = "black";
}

function pickColor() {

}