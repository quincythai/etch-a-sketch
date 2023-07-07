const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-button');
const colorWheel = document.getElementById('color-picker');
const buttons = document.querySelectorAll(".t");
const colorButton = document.getElementById("color-button");
const gridButton = document.getElementById('grid-button');
const slider = document.getElementById('slider');
let boxes = document.querySelectorAll('.box');
let color;
let isMouseDown;
let gridSize;
let activeButton;
let toggled;

clearButton.addEventListener('click', clearBoard);
colorWheel.addEventListener("input", changeColorWheelColor);


// Drawing function - only while mouse is held and moving
// https://stackoverflow.com/questions/48593312/javascript-event-when-mouseover-and-mousedown

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // 1fr - 1 fraction of the row's size
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); // add box styling
        box.addEventListener("mousedown", function (e) {
            e.preventDefault(); // prevent the red circle icon when you click on other elements
            isMouseDown = true;
            changeBoxColor(e);
        });
        box.addEventListener("mouseup", function () {
            isMouseDown = false;
        });
        box.addEventListener("mousemove", function (e) {
            if (isMouseDown) {
                changeBoxColor(e);
            }
        });
        grid.appendChild(box);
    }
}

function changeBoxColor(e) {
    /* Event object itself doesn't have backgroundColor property 
    So we need e.target.style... instead of just e.style...*/
    switch (activeButton) {
        case "color-button":
            e.target.style.backgroundColor = color;
            break;
        case "rainbow-button":
            e.target.style.backgroundColor = getRandomColor();
            break;
        case "erase-button":
            e.target.style.backgroundColor = "white";
            break;
        default:
            e.target.style.backgroundColor = "black";
            console.log("Error");
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColorWheelColor() {
    color = colorWheel.value;
}

function clearBoard() {
    // Reselect boxes in case user resized
    boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });
};

// Toggling invert color on active button
// https://www.w3schools.com/howto/howto_js_toggle_class.asp
function enableButtonActiveOnClick() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
        });
    });
}

// Toggle grid lines
function toggleGridLines() {
    gridButton.addEventListener("click", () => {
        boxes = document.querySelectorAll('.box');
        if (toggled) {
            boxes.forEach(box => {
                box.style.border = "none";
            })
            grid.style.border = "none";
            toggled = false;
        } else {
            boxes.forEach(box => {
                box.style.border = "1px solid #000000";
            })
            grid.style.border = "1px solid black";
            toggled = true;
        }
    })
}

// https://stackoverflow.com/questions/29103818/how-can-i-retrieve-and-display-slider-range-value
slider.addEventListener('input', function () {
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
    // 1fr - 1 fraction of the row's size
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box'); // add box styling
        if (!toggled) {
            box.style.border = "none";
        }
        box.addEventListener("mousedown", function (e) {
            e.preventDefault(); // prevent the red circle icon when you click on other elements
            isMouseDown = true;
            changeBoxColor(e);
        });
        box.addEventListener("mouseup", function () {
            isMouseDown = false;
        });
        box.addEventListener("mousemove", function (e) {
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

function enableOneButtonActive() {
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
}

function startUp() {
    gridSize = 16;
    activeButton = "color-button";
    isMouseDown = false;
    color = "black";
    toggled = true;
    document.addEventListener("DOMContentLoaded", () => {
        colorButton.classList.add("active");
        gridButton.classList.add("active");
        enableButtonActiveOnClick();
        enableOneButtonActive();
        toggleGridLines();
    });
    createGrid(gridSize);
}

startUp();