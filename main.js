const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
let color = "black";
let isMouseDown = false;
let gridSize = 16;
let activeButton = "color-button";


// Drawing function - only while mouse is held and moving
// https://stackoverflow.com/questions/48593312/javascript-event-when-mouseover-and-mousedown

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // 1fr - 1 fraction of the row's size
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); // add box styling
        box.addEventListener("mousedown", function(e) {
            e.preventDefault(); // prevent the red circle icon when you click on other elements
            isMouseDown = true;
            changeBoxColor(e);
        });
        box.addEventListener("mouseup", function() {
            isMouseDown = false;
        });
        box.addEventListener("mousemove", function(e) {
            if (isMouseDown) {
                changeBoxColor(e);
            }
        });
        grid.appendChild(box);
    }
}

createGrid(16);

function changeBoxColor(e) {
    /* Event object itself doesn't have backgroundColor property 
    So we need e.target.style... instead of just e.style...*/
    e.target.style.backgroundColor = color;
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearBoard);

// Makes all boxes white
function clearBoard() {
    boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });
};

// Change brush color based on color picked
let colorWheel = document.getElementById('color-picker');
colorWheel.addEventListener("input", () => {
    color = colorWheel.value;
});

// Toggling invert color on active button
// https://www.w3schools.com/howto/howto_js_toggle_class.asp
const buttons = document.querySelectorAll(".t");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

// Make color mode active on startup
const colorButton = document.getElementById("color-button");
document.addEventListener("DOMContentLoaded", () => {
    colorButton.classList.add("active");
    gridButton.classList.add("active");
});

// Toggle grid lines
const gridButton = document.getElementById('grid-button');
let boxes = document.querySelectorAll('.box');


let t = true;
gridButton.addEventListener("click", () => {
    boxes = document.querySelectorAll('.box');
    if (t) {
        boxes.forEach(box => {
            box.style.border = "none";
        })
        grid.style.border = "none";
        t = false;   
    } else {
        boxes.forEach(box => {
            box.style.border = "1px solid #000000";
        })
        grid.style.border = "1px solid black";
        t = true;
    }
})

// https://stackoverflow.com/questions/29103818/how-can-i-retrieve-and-display-slider-range-value
const slider = document.getElementById('slider');
slider.addEventListener('input', function() {
    changeGridSizeText();
    changeGridSize(slider.value);
});

function changeGridSizeText() {
    let size = slider.value;
    let text = document.getElementById('grid-text');
    text.innerHTML = `${size}x${size}`;
}

function changeGridSize(size) {
    grid.innerHTML = "";

    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // 1fr - 1 fraction of the row's size
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); // add box styling
        if (!t) {
            box.style.border = "none";
        }
        box.addEventListener("mousedown", function(e) {
            e.preventDefault(); // prevent the red circle icon when you click on other elements
            isMouseDown = true;
            changeBoxColor(e);
        });
        box.addEventListener("mouseup", function() {
            isMouseDown = false;
        });
        box.addEventListener("mousemove", function(e) {
            if (isMouseDown) {
                changeBoxColor(e);
            }
        });
        grid.appendChild(box);
    }

    clearBoard();
}

// Make only one button active at a time
// https://stackoverflow.com/questions/71346490/how-do-i-make-only-one-button-can-be-selected-at-time
document.querySelectorAll(".c").forEach((button) => {
    button.addEventListener("click", (event) => {
        if (event.target.dataset) {
            document.querySelectorAll(".c").forEach(e => e.classList.remove('active'));
            button.classList.add('active');
            activeButton = button.id;
            console.log(activeButton);
        }
    });
});

