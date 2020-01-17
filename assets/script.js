//désactive le clique droit
document.oncontextmenu = function () {
    return false;
}

// main fonction
function newGame() {
    reset();
    grid = new Array();
    bombsIndex = new Array();
    revealed = new Array();
    temp = new Array();
    getDifficulty();
    generategrid(size);
    generateBombs(nbBomb);
    generateHtml();

}

//adapte la difficultée suivant ce que l'utilisateur choisi
function getDifficulty() {
    mySelect = document.getElementById("mySelect").selectedIndex
    switch (mySelect) {
        case 0:
            alert("Veuillez selectionner une difficultée")
            break;
        case 1:
            size = 9;
            nbBomb = 10;
            break
        case 2:
            size = 16;
            nbBomb = 40;
            break;
        case 3:
            size = 22;
            nbBomb = 100;
            break
        case 4:
            size = 30;
            nbBomb = 250;
            break

    }

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

//getter
function getTileValue(indexX, indexY) {
    return grid[indexX][indexY];
}

//genere la grille html
function generateHtml() {
//div label
    var divf = document.createElement('div');
    divf.setAttribute("id", "label")
    document.getElementById("game").appendChild(divf);
//label drapeau restant
    var h = document.createElement('span');
    h.setAttribute("id", "flagL");
    h.innerHTML = "Drapeau restant : " + nbBomb;
    document.getElementById("label").appendChild(h);
//label bombe presente
    var h1 = document.createElement('span');
    h1.setAttribute("id", "BombL");
    h1.innerHTML = " / Bombes : " + nbBomb;
    document.getElementById("label").appendChild(h1);
//genere les case
    for (o = 0; o < grid.length; o++) {
        var div = document.createElement('div');
        div.setAttribute("id", o)
        div.setAttribute("class", "line")
        document.getElementById("game").appendChild(div);
        for (p = 0; p < grid.length; p++) {
            var img = document.createElement('img');
            img.setAttribute("src", "assets/images/normal.png");
            img.setAttribute("id", "'" + o.toString() + ":" + p.toString() + "'")
            img.setAttribute("class", "cell")
            var att = document.createAttribute("onclick");
            att.value = "selectedTile(" + o.toString() + "," + p.toString() + ")";
            img.setAttributeNode(att);
            var att = document.createAttribute("oncontextmenu");
            att.value = "markTile(" + o.toString() + "," + p.toString() + ")";
            img.setAttributeNode(att);
            document.getElementById(o).appendChild(img);
        }
    }

}


//action lors du clique sur une case
function selectedTile(x, y) {
//desactive ignore les drapeau
    if (document.getElementById("'" + x.toString() + ':' + y.toString() + "'").getAttribute("src") == "assets/images/flag.png") {
        return
    }
    //desactive les case deja cliquées
    if (grid[x][y] == -1) {
        return;
    }
//si on clique sur une bombe
    if (grid[x][y] == 9) {
        reveal(x, y);
        lose();
        return;
    }
    //si on clique sur une case vide
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
                //enregistre les case vide pour la recursivité du reveal
                if (grid[j][k] == 0 && !myinclude(temp, [j, k])) {
                    temp.push([j, k]);

                }

            }
        }
        while (temp.length != 0) {
            autoReveal();
        }
    }
// si on clique sur une case numeroté
    if (grid[x][y] > -1) {
        reveal(x, y);
    }
}

// permet de reveler les cases tant qu'il y a des cases vide non cliqué
function autoReveal() {
    tempx = temp[0][0];
    tempy = temp [0][1];
    temp.shift();
    selectedTile(tempx, tempy);
}

// fonction includes permettant de verifier la présence de tableau dans des tableau
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

// revele une case
function reveal(x, y) {
    if (revealed.length == 0)
        fStart();
    //desactive le reveal sur case drapeau
    if (document.getElementById("'" + x.toString() + ':' + y.toString() + "'").getAttribute("src") == "assets/images/flag.png") {
        return
    }
//désactive le clique sur case révélé
    document.getElementById("'" + x.toString() + ':' + y.toString() + "'").onclick = "";
    document.getElementById("'" + x.toString() + ':' + y.toString() + "'").oncontextmenu = "";
    if (grid[x][y] == 0)
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").src = "assets/images/empty.png";
    if (grid[x][y] == 9) {
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").src = "assets/images/bomb.png";
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").style.backgroundColor = "red";
    }
    if (grid[x][y] != 0 && grid[x][y] != 9)
        document.getElementById("'" + x.toString() + ':' + y.toString() + "'").src = "assets/images/" + grid[x][y] + ".png";
    setTileValue(x, y, -1);
    //enregistre la position des case révélé
    revealed.push([x, y]);
    //verifie la condition de victoire
    win();
}

// en cas de défaite
function lose() {
    console.log("vous vous etes pris une bombe")
    for (b = 0; b < bombsIndex.length; b++) {
        if (grid[bombsIndex[b][0]][bombsIndex[b][1]] != -1)
            document.getElementById("'" + bombsIndex[b][0] + ':' + bombsIndex[b][1] + "'").src = "assets/images/bomb.png";
    }
    for (w = 0; w < grid.length; w++) {
        for (c = 0; c < grid.length; c++) {
            document.getElementById("'" + w + ':' + c + "'").onclick = "";
            document.getElementById("'" + w + ':' + c + "'").oncontextmenu = "";

        }
    }
    document.getElementById("maintitle").innerHTML = "Perdu !!";
    document.getElementById("body").style.backgroundColor = "darkred";
    document.getElementById("game").style.backgroundColor = "darkred";
    fStop();

}

// en cas de victoire
function win() {
    if (nbBomb == grid.length * grid.length - revealed.length) {
        for (w = 0; w < grid.length; w++) {
            for (c = 0; c < grid.length; c++) {
                document.getElementById("'" + w + ':' + c + "'").onclick = "";

            }
        }
        document.getElementById("maintitle").innerHTML = "Gagné !!";
        document.getElementById("body").style.backgroundColor = "green";
        document.getElementById("game").style.backgroundColor = "green";
        fStop();
    } else {
        return
    }
}

// poser/retirer un drapeau
function markTile(x, y) {
    //poser
    if (document.getElementById("'" + x.toString() + ':' + y.toString() + "'").getAttribute("src") == "assets/images/normal.png") {
        //gestion du nombre de drapeau autoriser
        if (flag >= nbBomb)
            return
        document.getElementById("'" + x + ':' + y + "'").src = "assets/images/flag.png";
        flag++;
    } else {
        //retrait de drapeau
        document.getElementById("'" + x + ':' + y + "'").src = "assets/images/normal.png";
        flag--;
    }
    //MAJ du label
    document.getElementById("flagL").innerHTML = "Drapeau restant : " + (nbBomb - flag);
}

//vide le game
function reset() {
    fStop();
    document.getElementById("game").innerHTML = '';
    document.getElementById("maintitle").innerHTML = "Démineur";
    document.getElementById("body").style.backgroundColor = "slategray";
    document.getElementById("game").style.backgroundColor = "slategray";
    document.getElementById("chronotime").innerHTML = "00:00";
    flag = 0;
    flaged = []
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

function fStop() {
    clearTimeout(setTm)
}