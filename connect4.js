// Initialize global variables
const boardDiv = document.getElementById("boardDiv");
const resultHeading = document.getElementById("resultHeading");
var turnColor = "red";
var column = [];
var gameOver = false;

// Draw the board.
for(var colNum = 0; colNum < 7; colNum++) {
    // Create the column on the page
    var colDiv = document.createElement("div");
    colDiv.id = "colDiv" + colNum;
    colDiv.className = "column";
    colDiv.onclick = moveHandler;
    boardDiv.appendChild(colDiv);

    // Initialize the corresponding column data structure
    // Each column will be an (initially empty) stack.
    column[colNum] = [];
}

function moveHandler(event) {
    if(gameOver) return;

    // Find the column that was clicked on.
    var columnDiv = event.currentTarget;
    console.log("Clicked: " + columnDiv.id);
    const colNum = parseInt(columnDiv.id[6]);

    // Check whether the column is already full.
    if(column[colNum].length>=6) {
        console.log("Illegal move - column already full");
        return;
    }

    // Create a new disc of the current color.
    var newDisc = document.createElement("div");
    newDisc.className = "disc " + turnColor;
    columnDiv.appendChild(newDisc);

    const rowNum = column[colNum].length;
    column[colNum].push(turnColor);

    // Debugging output of the state of the board
    for(var i=0; i<7; i++) {
        console.log("   " + i + ": " + column[i]);
    }

    // Check if the newly placed disc resulted in 4-in-a-row.
    targetString = [turnColor, turnColor, turnColor, turnColor].join();
    if(columnAsString(colNum).includes(targetString) ||
       rowAsString(rowNum).includes(targetString) ||
       diagUpAsString(colNum, rowNum).includes(targetString) ||
       diagDownAsString(colNum, rowNum).includes(targetString)) {
        resultHeading.innerHTML = "Winning move by " + turnColor + "!";
        gameOver = true;
    }

    // Advance the turn to the next color.
    if(turnColor === "red") turnColor = "black";
    else turnColor = "red";
}

function columnAsString(colNum) {
    // Cells in the specified column.
    return column[colNum].join();
}

function rowAsString(rowNum) {
    // Cells in the specified row.
    rowEntries = [];
    for(var colNum=0; colNum<7; colNum++) {
        rowEntries.push(column[colNum][rowNum]);
    }
    return rowEntries.join();
}

function diagUpAsString(colNum,rowNum) {
    // Cells in the upward-sloping diagonal through the specified cell.
    diagEntries = [];
    for(var i=0; i<7; i++) {
        diagEntries.push(column[i][rowNum+i-colNum]);
    }
    return diagEntries.join();
 }

 function diagDownAsString(colNum,rowNum) {
    // Cells in the downward diagonal through the specified cell.
    diagEntries = [];
    for(var i=0; i<7; i++) {
        diagEntries.push(column[i][rowNum-i+colNum]);
    }
    return diagEntries.join();
 }