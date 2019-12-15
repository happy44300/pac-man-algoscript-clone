/*
  _ __   __ _  ___ _ __ ___   __ _ _ __  
 | '_ \ / _` |/ __| '_ ` _ \ / _` | '_ \ 
 | |_) | (_| | (__| | | | | | (_| | | | |
 | .__/ \__,_|\___|_| |_| |_|\__,_|_| |_|
 |_|   
 
 Authors:Bilal Molli and Steven Cailleau
 Licensed under GNU General Public License v3.0
 Code available at https://github.com/happy44300/pac-man-algoscript-clone
*/

//variables
var crossing = [

  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], //2
  [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0], //3
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], //4
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], //5
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0], //6
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0], //7
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], //8
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2], //9
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0], //10
  [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2], //11
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], //12
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2], //13
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], //14
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], //15
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], //16
  [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0], //17
  [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0], //18
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0], //19
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], //20
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], //21
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //22
  ];

var scale = 20;
var speed = 0.5;

turtleEnabled = false;

var GameMap;
var initialiser = false;
var won = false;
var life = 3;
var dying = false;

var intro = ChargerSon('https://happy44300.github.io/intro.wav');
var waka = ChargerSon('https://happy44300.github.io/pac-man-waka-waka.mp3');
var lose = ChargerSon('https://happy44300.github.io/pacman_death.wav');

//Create prototype to instantiate object
var GridObject = function() {
  var obj = {};
  obj.x = 15;
  obj.y = 15;
  obj.i = 0;
  obj.k = 0;
  obj.status = 0;
  obj.width = 0;
  obj.height = 0;
  obj.offset = 0;
  obj.dir = [];
  obj.texture = 0;
  obj.moving = false;
  obj.lastDir = [0, 1];
  extend(obj, methods);
  return obj;
};

//ended up unused
var extend = function(obj, methods) {
  for (var key in methods) {
    obj[key] = methods[key];
  }
};
var methods = {
  Pixelpos: function() {
    return MapGridToPixel([this.k, this.i]);
  }
};

var pacman = GridObject();
var Blinky = GridObject(); //i =10 k=10
var Pinky = GridObject(); //i =9 k=10
var Inky = GridObject(); // i=8 k=10
var Clyde = GridObject(); // i=9 k=9

//set default value
ini();
function ini(mode) {
  Initialiser();
  initialiser = false; //freeze game
  dying = false;

  //hard reset mode
  if (mode == undefined) {
    GameMap = JSON.parse(JSON.stringify(crossing)); //deep copy of the array
    life = 3;
    Playsound(1);
    setTimeout(function() {
      iniEnd();
    }, 4000);
  }

  pacman.width = 15;
  pacman.height = 15;
  pacman.offset = -10;
  pacman.x = MapGridToPixel(9);
  pacman.y = MapGridToPixel(12);
  pacman.status = 1;

  Blinky.i = 12;
  Blinky.k = 9;
  Blinky.offset = -10;
  Blinky.x = MapGridToPixel(Blinky.i);
  Blinky.y = MapGridToPixel(Blinky.k);
  Blinky.width = 15;
  Blinky.height = 15;

  Pinky.i = 7;
  Pinky.k = 8;
  Pinky.offset = -10;
  Pinky.x = MapGridToPixel(Pinky.i);
  Pinky.y = MapGridToPixel(Pinky.k);
  Pinky.width = 15;
  Pinky.height = 15;


  Inky.i = 10;
  Inky.k = 8;
  Inky.offset = -10;
  Inky.x = MapGridToPixel(Inky.i);
  Inky.y = MapGridToPixel(Inky.k);
  Inky.width = 15;
  Inky.height = 15;


  Clyde.i = 8;
  Clyde.k = 8;
  Clyde.offset = -10;
  Clyde.x = MapGridToPixel(Clyde.i);
  Clyde.y = MapGridToPixel(Clyde.k);
  Clyde.width = 15;
  Clyde.height = 15;
  won = false;
  if (mode != undefined) {
    initialiser = true;
  }
}

//unfreeze game

function iniEnd() {
  initialiser = true;
}

//shortcut check for pacman

function Shortcut(obj) {
  if (obj.x > MapGridToPixel(18) && obj.y > MapGridToPixel(8)) {
    obj.x = MapGridToPixel(1) + obj.width; //offset
    obj.y = MapGridToPixel(9) + obj.height;
  } else if (obj.x < MapGridToPixel(0) && obj.y > MapGridToPixel(8)) {
    obj.x = MapGridToPixel(17) + obj.width;
    obj.y = MapGridToPixel(9) + obj.height;
  }
}



//draw pacman from object

function DrawPac(obj) {
  //since we can't load image due to CORS problems in algoscript, we draw pacman by hand
  var dir = 0;
  var useddir = [];
  //since when pacman is stopped, obj.dir = [], we need to assign a remember the previous value
  if (obj.dir.length == 0) {
    useddir = obj.lastDir.slice();
  } else {
    obj.lastDir = obj.dir.slice();
    useddir = obj.lastDir.slice();
  }
  if (useddir[0] == 0) {
    if (useddir[1] == 1) {
      dir = 1;
    } else {
      dir = -1;
    }
  }
  if (useddir[0] == 1) {
    if (useddir[1] == 1) {
      dir = 1;
    } else {
      dir = -1;
    }
  }
  ctx.beginPath();
  ctx.arc(obj.x + pacman.width / 2, obj.y + pacman.height / 2, 10, dir * 0.25 * Math.PI, dir * 1.25 * Math.PI, false);
  ctx.fillStyle = "rgb(255, 255, 0)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(obj.x + pacman.width / 2, obj.y + pacman.height / 2, 10, dir * 0.75 * Math.PI, dir * 1.75 * Math.PI, false);
  ctx.fill();
}



//main loop

function draw() {
  Initialiser();
  RectanglePlein(0, 0, 10000, 10000, "black"); //background
  DrawGrid(GameMap);
  DrawLife();

  //don't move before everything is loaded & ready
  if (dying == false && won == false && initialiser == true) {
    
    BasicIA(Blinky);
    BasicIA(Pinky);
    BasicIA(Inky);
    BasicIA(Clyde);
    
    RectanglePlein(Blinky.x, Blinky.y, Blinky.width, Pinky.height, "red");
    RectanglePlein(Pinky.x, Pinky.y, Pinky.width, Pinky.height, "pink");
    RectanglePlein(Inky.x, Inky.y, Inky.width, Pinky.height, "cyan");
    RectanglePlein(Clyde.x, Clyde.y, Clyde.width, Pinky.height, "orange");
    move(pacman);// the order in witch pacman movement is called is very important because everything must be drawed for pixel based collision
      DrawPac(pacman);
  }
  Shortcut(pacman);
}


//BasicAI for the ghosts, move in a random direction until we hit a wall

function BasicIA(obj) {

  //generate new direction and prevent object from going back and forth
  while (obj.dir.length == 0 || (obj.dir[1] == -obj.lastDir[1] && obj.dir[0] == obj.lastDir[0])) {
    obj.dir = GenerateRanDir();
  }
  //apply direction
  move(obj);
  obj.lastDir = obj.dir.slice();
}

function GenerateRanDir() {
  var ran = Hasard(4);

  switch (ran) {
  case 0:
    //up
    return [1, -1];

  case 1:
    // down
    return [1, 1];

  case 2:
    //gauche
    return [0, -1];

  case 3:
    //droite
    return [0, 1];

  }
}

//utility function to convert the maze array index pos to pixel pos

function MapGridToPixel(pos) {
  if (Array.isArray(pos)) {
    pos = gridpos.map(function(x) {
      return x * scale;
    });
    return pos;
  }
  return pos * scale;
}


//utility function to convert pixel pos to grid pos

function MapPixelToGrid(pos) {
  return Math.abs(Math.round((pos / scale)));
}


//win the game

function win() {
  if (won == false) { //function is called once
    won = true;
    ini();
  }
}

//kill pac man

function death() {
  //playsound death
  Playsound(5);
  dying = true;
  if (life > 1) {
    life--;
    setTimeout(function() {
      ini(1);
    }, 1500);
  } else {
    setTimeout(function() {
      ini();
    }, 1500);
  }
}


//draw life counter

function DrawLife() {
  Texte(MapGridToPixel(crossing[0].length), MapGridToPixel(crossing.length), "Life " + life.toString(), "white");
}


//draw maze and win check

function DrawGrid(grid) {
  if (grid == undefined) {
    return;
  }
  var gome = false;
  for (var i = 0; i < grid.length; i++) {
    for (var k = 0; k < grid[i].length; k++) {
      if (grid[i][k] == 0 && grid[i][k + 1] == 0) { // is the next slot a wall?
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k + 1), MapGridToPixel(i), "blue");
      }
      if (grid[i][k] == 0 && i + 1 < grid.length && grid[i + 1][k] == 0) { //check that i+1 exist before accesing it
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k), MapGridToPixel(i + 1), "blue");
      }
      if (grid[i][k] == 1 || grid[i][k] == 4) //draw gome
      {
        RectanglePlein(MapGridToPixel(k), MapGridToPixel(i), 5, 5, "white");
        gome = true; //win check here because we are in the loop here
      }
    }
  }
  if (gome == false) {
    win();
  }
}


//handle object collision

function collision(obj) {
  var clipOffset = obj.offset;
  var clipWidth = obj.width * 2;
  var clipDepth = obj.width * 2; //clipDepth was later changed to search in a square
  // extend hitboxe in the direction we are moving so that we don't get stuck when stopping
  if (obj.dir.length != 0 && obj.dir[0] == 0) {
    if (obj.dir[1] > 0) {
      clipWidth = clipWidth * obj.dir[1] + 4;
    } else {
      clipWidth = obj.dir[1] - 2;
    }
  } else if (obj.dir[0] == 1) {
    if (obj.dir[1] > 0) {
      clipDepth = clipDepth * obj.dir[1] + 4;
    } else {
      clipDepth = obj.dir[1] - 2;
    }
  }
  var clipLength = clipWidth * clipDepth;

  //extract image data from the canvas around the player
  var wallhitbox = ctx.getImageData(obj.x + clipOffset, obj.y + clipOffset, clipWidth, clipDepth);
  var hitbox = ctx.getImageData(obj.x - obj.width / 2, obj.y - obj.height / 2, obj.width * 2, obj.height * 2);
  
 
  //loop on the pixels, +8 that way we don't loop on each pixel
  if (obj.status == 1) {
    for (i = 0; i < hitbox.data.length; i += 8) {
      if (hitbox.data[i] == 255 && hitbox.data[i + 1] == 255 && hitbox.data[i + 2] == 255) {
        if (GameMap[MapPixelToGrid(obj.y)][MapPixelToGrid(obj.x)] != 0) {
          GameMap[MapPixelToGrid(obj.y)][MapPixelToGrid(obj.x)] = 2;
        }
      }
      //blue ghost collision check
      if (hitbox.data[i+1] == 255 && hitbox.data[i + 2] == 255 && hitbox.data[i+1] == 0 ) {
        death();
        break;
      }
      //red
      if (hitbox.data[i] == 255 && hitbox.data[i + 1] == 0) {
        death();
        break;
      }
      //orange
      if (hitbox.data[i] > 200 && hitbox.data[i + 1] > 150 && hitbox.data[i + 2] < 100) {
        death();
        break;
      } //pink
      if (hitbox.data[i] > 100 && hitbox.data[i + 1] < 200) {
        death();
        break;
      }
    }
  }
  for (var i = 0; i < wallhitbox.data.length; i += 8) {
    if (wallhitbox.data[i + 2] > 100 && wallhitbox.data[i+1] != 255) {
      return true;
    }
  }
}


//move object

function move(obj) { // dir is an array with [coord to move, direction on the axis]
  if (collision(obj) == true) {
    obj.dir = [];
    return;
  }
  if (obj.dir.length == 0) {
    return;
  }
  if (obj.dir[0] == 0) //move on x
  {
    if (obj.dir[1] == 1) {
      obj.x += speed;
      return;
    } else {
      obj.x -= speed;
      return;
    }
  }
  if (obj.dir[0] == 1) { //move on y
    if (obj.dir[1] == 1) {
      obj.y += speed;
      return;
    } else {
      obj.y -= speed;
      return;
    }
  }
  return;
}


//get keyboard input

function Keypressed(k) {
  if (initialiser == false) {
    return;
  }
  switch (k) {
  case 38:
    //up
    pacman.dir = [1, -1];
    break;
  case 40:
    // down
    pacman.dir = [1, 1];
    break;
  case 37:
    //gauche
    pacman.dir = [0, -1];
    break;
  case 39:
    //droite
    pacman.dir = [0, 1];
    break;
  case 65:
    //instant win, used for debuging and testing purpose
    win();
    break;
  case 90:
    //instant death, used for debuging and testing purpose
    death();
    break;
  }
}


//play sound

function Playsound(ost) {
  switch (ost) {
  case 1:
    intro.play();
    break;
  case 3:
    waka.play();
    break;
  case 4:
    win.play();
    break;
  case 5:
    lose.play();
    break;
  }
}
Loop(-1);
