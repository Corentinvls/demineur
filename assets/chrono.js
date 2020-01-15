// main fonction
function newGame() {
    fStart()
    grid = new Array();
    bombsIndex = new Array();
    generategrid(10);
    generateBombs(20);
    console.log(bombsIndex)
}

//genere une grille carré d'une taille demander en paramètre
function generategrid(size) {
    //lignes
    for (u = 0; u < size; u++) {
        grid[u] = new Array()
        //contenu des lignes
        for (i = 0; i < size; i++) {
            grid[u][i] = 0;
        }
    }
}
//rempli la grille en fonction du nombre de bombe en paramètre
function generateBombs(nbBomb) {
    //boucle pour avoir le nombre de bombe demander
    for (i = 0; i < nbBomb; i++) {
        x = Math.floor(Math.random() * grid.length);
        y = Math.floor(Math.random() * grid.length);
        // gestion des doublons
        while (grid[x][y] == 9) {
            x = Math.floor(Math.random() * grid.length);
            y = Math.floor(Math.random() * grid.length);
        }
        //mise en place des bombes
        setTileValue(x, y, 9);
        // tableau de coordonée de bombe
        bombsIndex.push([x,y])
        //incrémente les cases adjacantes
        updateTiles(x,y)
    }
}
//incrémente les case adjacante au bombe
function updateTiles(x,y){
//defilement de haut en bas
    for (j = x-1; j <= x+1; j++) {
        //gestion hors map
        if (j==-1 || j == (grid.length))
            continue;
        //defilement de gauche a droite
        for (k = y-1; k <= y+1; k++) {
            //gestion hors map
            if (k==-1 || k == (grid.length))
                continue;
                //incrémente la case si ce n'est pas une bombe
                if (grid[j][k] != 9)
                    grid[j][k]++;
            }
        }

}

// setter de case
function setTileValue(rowIndex, columnIndex, value) {
    grid[rowIndex][columnIndex] = value;
}

function getTileValue(indexX, indexY) {
    return grid[indexX][indexY];
}





//section du chrono
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