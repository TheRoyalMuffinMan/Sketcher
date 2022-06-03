const grid = document.querySelector(".grid");
const colorSelector = document.querySelector("#color-selector")
const slider = document.querySelector(".range-slider");
const infoSlider = document.querySelector(".slider h1");
const btns = document.querySelectorAll("button");
let currColor = "black";
let currSize = 25;


function createGrid() {
    grid.style.gridTemplateColumns = `repeat(${currSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${currSize}, 1fr)`;

    for (let i = 1; i <= currSize * currSize; i++) {
        const box = document.createElement("div");
        box.classList.add(`box-${i}`);
        box.addEventListener("mouseover", colorIt);
        box.addEventListener("touchstart", colorIt);
        grid.appendChild(box);
    }
}

function colorIt(event) {
    event.target.style.backgroundColor = currColor;
}

function changeColor(event) {
    let color = event.target.value;

}

function changeSize(event) {
    let size = event.target.value;
    infoSlider.textContent = `Grid: ${size} x ${size}`; 
    reset(event);
}

function reset(event) {

}

slider.addEventListener("mouseup", changeSize);

function sketcher() {
    createGrid();
    btns.forEach(btn => {
        btn.addEventListener("onclick", (btn.value != "reset") ? changeColor : reset);
    });
}

window.onload = () => {
    sketcher();
    
}