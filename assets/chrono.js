function difficulties(){
    var easy = {lines: 9, rows: 9, bombs: 10};
}
    
function newGame(difficulty) {
    fStart();
    this.settings;
    grid = new Array();
    bombsIndex = new Array();
    this.settings = this.difficulties(difficulty);
    this.generategrid();
    

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

function setTileValue(rowIndex, columnIndex, value) {

    grid[rowIndex][columnIndex] = value;


}

function getTileValue(indexX, indexY) {
    return grid[indexX][indexY];
}

function generateHtml() {
   // document.getElementById('game').style.display=grid;
   // document.getElementById('game').style.justifyContent=center;
  //  document.getElementById('game').style.alignItems=center;
   // document.getElementById('game').style.gridTemplateColumn=repeat(grid.length, grid.length);
    for(o=0;o<grid.length;o++){
        for(p=0;p<grid.length;p++){
            var img = document.createElement('img');
            img.setAttribute("src", "assets/images/normal.png");
            img.setAttribute("id","'"+o.toString()+":"+p.toString()+"'")
            var att = document.createAttribute("onclick");
            att.value = "selectedTile(" + o.toString() + "," + p.toString() + ")";
            img.setAttributeNode(att);
            document.getElementById("game").appendChild(img);
        };
    }
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