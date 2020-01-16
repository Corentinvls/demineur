
function newGame() {
    fStart()
    grid = new Array();
    bombsIndex = new Array();
    generategrid(4);
    generateBombs(10);
    console.log(bombsIndex)
}


function generategrid(size) {
    for (u = 0; u < size; u++) {
        grid[u] = new Array()
        for (i = 0; i < size; i++) {
            grid[u][i] = 0;
        }
    }
}

function generateBombs(nbBomb) {
    for (i = 0; i < nbBomb; i++) {
        x = Math.floor(Math.random() * grid.length);
        y = Math.floor(Math.random() * grid.length);
        while (grid[x][y] == 9) {
            x = Math.floor(Math.random() * grid.length);
            y = Math.floor(Math.random() * grid.length);
        }
        setTileValue(x, y, 9);
        bombsIndex.push([x,y])
    }
}

function setTileValue(rowIndex, columnIndex, value) {

    grid[rowIndex][columnIndex] = value;


}

function getTileValue(indexX, indexY) {
    return grid[indexX][indexY];
}

var setTm = 0;
var start = 0;
var now = 0;
var diff = 0;
var tabTime = [];
var nTime = 0;

function affTime(tm) {
    var minutes = tm.getMinutes();
    var secondes = tm.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (secondes < 10) {
        secondes = "0" + secondes;
    }
    document.getElementById("chronotime").innerHTML = minutes + ":" + secondes;
}

function fChrono() {
    now = new Date();
    Interv = now - start;
    diff = new Date(Interv);
    affTime(diff);
}

function fStart() {
    fReset();
    if (diff == 0) {
        start = new Date();
    } else {
        now = new Date();
        Pause = now - diff;
        start = new Date(Pause);
    }
    setTm = setInterval(fChrono, 10);
}

function fReset() { //on efface tout
    start = 0;
    diff = 0;
    tabTime = [];
    nTime = 0;
    document.getElementById("chronotime").innerHTML = "00:00";
}