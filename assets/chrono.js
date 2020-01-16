// main fonction
document.oncontextmenu = function () {
    return false;
}

function newGame() {
    reset();
    fStart();
    grid = new Array();
    bombsIndex = new Array();
    revealed = new Array();
    temp = new Array();
    size=20;
    nbBomb=10;
    generategrid(size);
    generateBombs(nbBomb);
    generateHtml();
    document.getElementById('game').style.gridTemplateColumns = "repeat("+size + s;

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
        bombsIndex.push([x, y])
        //incrémente les cases adjacantes
        updateTiles(x, y)
    }
}

//incrémente les case adjacante au bombe
function updateTiles(x, y) {
//defilement de haut en bas
    for (j = x - 1; j <= x + 1; j++) {
        //gestion hors map
        if (j == -1 || j == (grid.length))
            continue;
        //defilement de gauche a droite
        for (k = y - 1; k <= y + 1; k++) {
            //gestion hors map
            if (k == -1 || k == (grid.length))
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

function generateHtml() {
    for (o = 0; o < grid.length; o++) {
        for (p = 0; p < grid.length; p++) {
            var img = document.createElement('img');
            img.setAttribute("src", "assets/images/normal.png");
            img.setAttribute("id", "'" + o.toString() + ":" + p.toString() + "'")
            var att = document.createAttribute("onclick");
            att.value = "selectedTile(" + o.toString() + "," + p.toString() + ")";
            img.setAttributeNode(att);
            var att = document.createAttribute("oncontextmenu");
            att.value = "markTile(" + o.toString() + "," + p.toString() + ")";
            img.setAttributeNode(att);
            document.getElementById("game").appendChild(img);
        }
        ;
    }
}

function reset() {
    document.getElementById("game").innerHTML = '';
    document.getElementById("maintitle").innerHTML = "Démineur";
    flag=0;
    flaged=[]
}

function selectedTile(x, y) {

    if (document.getElementById("'" + x.toString() + ':' + y.toString() + "'").getAttribute("src") == "assets/images/flag.png") {
        return
    }
    if (grid[x][y] == -1) {
        return;
    }

    if (grid[x][y] == 9) {
        reveal(x, y);
        lose();
        return;
    }


    if (grid[x][y] == 0) {
        reveal(x, y)
        for (j = x - 1; j <= x + 1; j++) {
            if (j == -1 || j == (grid.length))
                continue;
            for (k = y - 1; k <= y + 1; k++) {
                if (k == -1 || k == (grid.length))
                    continue;
                if (grid[j][k] == -1)
                    continue;
                if (grid[j][k] > 0)
                    reveal(j, k)
                if (grid[j][k] == 0 && !myinclude(temp, [j, k])) {
                    temp.push([j, k]);

                }

            }
        }
        while (temp.length != 0) {
            autoReveal();
        }
    }

    if (grid[x][y] > -1) {
        reveal(x, y);
    }



}

function autoReveal() {
    tempx = temp[0][0]
    tempy = temp [0][1]
    temp.shift()
    selectedTile(tempx, tempy)
}

function myinclude(tab, element) {
    bool = false
    for (a = 0; a < tab.length; a++) {
        if (tab[a] == element) {
            bool = true
            return bool
        }
    }
    return bool
}


function reveal(x, y) {
    if (document.getElementById("'" + x.toString() + ':' + y.toString() + "'").getAttribute("src") == "assets/images/flag.png") {
        return
    }

    document.getElementById("'" + x.toString() + ':' + y.toString() + "'").onclick = "";
    document.getElementById("'" + x.toString() + ':' + y.toString() + "'").oncontextmenu = "";
    if (grid[x][y] == 0)
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").src = "assets/images/empty.png";
    if (grid[x][y] == 9)
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").src = "assets/images/bomb.png";
    if (grid[x][y] != 0 && grid[x][y] != 9)
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").src = "assets/images/" + grid[x][y] + ".png";
    setTileValue(x, y, -1);
    revealed.push([x,y]);
    win();
}


function lose() {
    console.log("vous vous etes pris une bombe")
    for (b = 0; b < bombsIndex.length; b++) {
        if (grid[bombsIndex[b][0]][bombsIndex[b][1]] != -1)
            reveal(bombsIndex[b][0], bombsIndex[b][1])
    }
    for (w = 0; w < grid.length; w++) {
        for (c = 0; c < grid.length; c++) {
            document.getElementById("'" + w + ':' + c + "'").onclick = "";

        }
    }
    document.getElementById("maintitle").innerHTML = "Perdu !!";
    // fStop();

}

function markTile(x, y) {
    if(document.getElementById("'" + x.toString() + ':' + y.toString() + "'").getAttribute("src") == "assets/images/normal.png"){
        if(flag>=nbBomb)
            return
        document.getElementById("'" + x + ':' + y + "'").src = "assets/images/flag.png";
        flag++;
    }
    else{
        document.getElementById("'" + x + ':' + y + "'").src = "assets/images/normal.png";
        flag--;
    }

}
function win (){
        if(nbBomb==grid.length*grid.length-revealed.length) {
            for (w = 0; w < grid.length; w++) {
                for (c = 0; c < grid.length; c++) {
                    document.getElementById("'" + w + ':' + c + "'").onclick = "";

                }
            }
            document.getElementById("maintitle").innerHTML = "Gagné !!";
            // fStop();
        }
        else{return}
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