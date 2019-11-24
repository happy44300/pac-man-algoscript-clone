//pac man clone
//variable de configuration
var crossing = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var scale = 20;



//variables d'execution
var playerpos = [10, 10];
var gridpos = [1, 0]; //[x,y]
var dir = []; //[coord x=0 y=1, pixel increment]
var Incross = false;
var points = []; //le joueur se déplace entre 2 points

Initialiser();


DrawGrid(crossing);

function draw() {
  playerpos = MapGridToPixel(playerpos);
  RectanglePlein(playerpos[0], playerpos[1], 10, 10, 'red');
}


function MapGridToPixel(pos) {
  if (Array.isArray(pos)) {
    pos = gridpos.map(function(x) {
      return x * scale;
    });
    return pos;
  }

  return pos * scale;
}

function DrawGrid(grid) {

  for (var i = 0; i < grid.length; i++) { //loop on y, first level nested array
    for (var k = 0; k < grid[i].length; k++) {// on x, second level nested array
      if (grid[i][k] == 0 && grid[i][k + 1] == 0) { // is the next slot a wall?
        Ecrire(MapGridToPixel(k) + " ", MapGridToPixel(i) + " ", MapGridToPixel(k + 1) + " ", MapGridToPixel(i));
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k + 1), MapGridToPixel(i), "red");
      }
      if (grid[i][k] == 0 && i + 1 < grid.length && grid[i + 1][k] == 0) {
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k), MapGridToPixel(i + 1), "red");
      }
    }
  }
}

function bouger(deplacement) {
  //sur x
  if (deplacement[0] == 0) //move on x
  {
    var type = crossing[gridpos[1]][gridpos[0] + deplacement[1]];
    //Ecrire(gridpos[0] + deplacement[1] + "first", gridpos[1] + deplacement[1], crossing[gridpos[1]].length, type);
    Ecrire(gridpos);
    if (gridpos[0] + deplacement[1] >= 0 && gridpos[0] + deplacement[1] < crossing[gridpos[1]].length && type != 0) {
      //Ecrire("here", crossing[gridpos[1]].length);
      gridpos = [gridpos[0] + deplacement[1], gridpos[1]];
    }
  } else {
    var typey = crossing[gridpos[1] + deplacement[1]][gridpos[0]];
    Ecrire(gridpos);
    if (gridpos[1] + deplacement[1] >= 0 && gridpos[1] + deplacement[1] < crossing.length && typey != 0) {
      //Ecrire("here", crossing[gridpos[1]].length);
      gridpos = [gridpos[0], gridpos[1] + deplacement[1]];
    }
  }

}

function Keypressed(k) {
  //Ecrire(k);
  switch (k) {

  case 38:
    //up
    bouger([1, -1]);
    break;

  case 40:
    // down
    bouger([1, 1]);
    break;

  case 37:
    //gauche
    bouger([0, -1]);
    break;


  case 39:
    //droite
    bouger([0, 1]);
    break;
  }
}
Loop(-1);
