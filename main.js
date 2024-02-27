// Initialize variables for color and drawing state
let color = "black";
let click = false;

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {
    // Create the initial drawing board with a default size
    createBoard(32);

    // Create the initial drawing board with a default size
    document.querySelector("body").addEventListener("click", function (e) {
        // Toggle drawing state only if the click target is not a button
        if (e.target.tagName != 'BUTTON') {
            click = !click;
            let draw = document.querySelector("#draw");
            if (click) {
                draw.innerHTML = "Now you can draw";
            }
            else {
                draw.innerHTML = "You're not allowed to draw!"
            }
        }
    })
    // Add event listener to the "Select" button
    let btn_popup = document.querySelector("#popup");
    btn_popup.addEventListener("click", function () {
        setColor("random");
        let size = getSize();
        createBoard(size);
    })

})
// Function to create the drawing board
function createBoard(size) {
    let board = document.querySelector(".board");
    // Set grid template columns and rows based on size
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Calculate the total number of grid cells
    let numDivs = size * size;
    // Create div elements for each cell and add event listener for drawing
    for (let i = 0; i < numDivs; i++) {
        let div = document.createElement("div");
        div.addEventListener("mouseover", colorDiv)
        board.insertAdjacentElement("beforeend", div);
    }
}
// Function to prompt user for board size
function getSize() {
    let input = prompt("What will be the size of the board?")
    let message = document.querySelector("#message");
    if (input == "") {
        message.innerHTML = "Please Provide a number!"
    }
    else if (input < 0 || input > 100) {
        message.innerHTML = "Please Provide a number between 1 and 100!"
    }
    else {
        message.innerHTML = "Now you play!"
        return input;
    }
}
// Function to handle cell coloring on mouseover
function colorDiv() {
    if (click) {
        // Set cell background color based on selected color
        if (color == "random") {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
        }
        else {
            this.style.backgroundColor = 'black'
        }
    }
}
// Function to set drawing color
function setColor(colorChoice) {
    color = colorChoice;
}
// Function to reset the drawing board
function resetBoard() {
    let boardDivs = document.querySelectorAll(".board div");
    if (boardDivs.length === 0) {
        console.error("No div elements found in the board. Check your HTML structure.");
        return; // Exit the function early if no div elements are found
    }
    boardDivs.forEach((div) => div.style.backgroundColor = "transparent");
}
