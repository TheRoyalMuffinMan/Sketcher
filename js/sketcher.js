const DEFAULT_STYLE = "solid";
const DEFAULT_COLOR = "black";
const DEFAULT_SIZE = 32;

const grid = document.querySelector(".grid");
const colorSelector = document.querySelector("#color-selector")
const slider = document.querySelector(".range-slider");
const infoSlider = document.querySelector(".slider h1");
const resetButton = document.querySelector("#reset");
const stylingButtons = document.querySelectorAll(".color-buttons button");

let currStyle = DEFAULT_STYLE;
let currColor = DEFAULT_COLOR;
let currSize = DEFAULT_SIZE;
let drawing = false

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 1; i <= size * size; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.addEventListener("mouseover", draw);
        grid.appendChild(box);
    }
}

function draw(event) {
    event.preventDefault();
    if (!drawing) return;
    if (currStyle == "solid") {
        event.target.style.backgroundColor = currColor;
    } else if (currStyle == "colorful") {
        let random = Math.round(0xffffff * Math.random());
        let r = random >> 16;
        let g = random >> 8 & 255;
        let b = random & 255;
        event.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        event.target.style.backgroundColor = "white";
    }
}

function reset() {
    currStyle = DEFAULT_STYLE;
    currColor = DEFAULT_COLOR;
    currSize = DEFAULT_SIZE;
    drawing = false;
    grid.innerHTML = "";
    createGrid(currSize);
}

function sketcher() {
    // Grid controls
    document.body.onmousedown = () => drawing = true;
    document.body.onmouseup = () => drawing = false;
    slider.addEventListener("mouseup", function(event){
        currSize = event.target.value;
        infoSlider.textContent = `Grid: ${currSize} x ${currSize}`;
        grid.innerHTML = "";
        createGrid(currSize);
    });

    // Reset
    resetButton.addEventListener("click", reset);

    // Colors and Styling
    stylingButtons.forEach(styleBtn => {
        styleBtn.addEventListener("click", function(event) {
            console.log(event.target.value)
            currStyle = event.target.value;
        });
    });
    colorSelector.addEventListener("input", function(event) {
        console.log(event.target.value)
        currColor = event.target.value;
    });
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    sketcher();
}