/*
  _ __   __ _  ___ _ __ ___   __ _ _ __  
 | '_ \ / _` |/ __| '_ ` _ \ / _` | '_ \ 
 | |_) | (_| | (__| | | | | | (_| | | | |
 | .__/ \__,_|\___|_| |_| |_|\__,_|_| |_|
 |_|   
 
 Authors:Bilal Molli and Steve []
 Licensed under GNU General Public License v3.0
*/
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



//variables d'execution
turtleEnabled = false;

var GameMap;
var initialiser = false;
var won = false;
var life = 3;
var dying = false;

var intro = ChargerSon('https://happy44300.github.io/intro.wav');
var fantomes = ChargerSon(''); //mettre les url
var waka = ChargerSon('https://happy44300.github.io/pac-man-waka-waka.mp3');
var winSound = ChargerSon(''); //mettre les url
var lose = ChargerSon('https://happy44300.github.io/pacman_death.wav');
var ost = ChargerSon(''); //mettre les url
var spritesheet = PreloadImage("https://happy44300.github.io/sprites32.png");



//Create prototype to instantiate object
var GridObject = function() {

  var obj = {};
  obj.x = 15;
  obj.y = 15;
  obj.i = 0;
  obj.k = 0;
  obj.states = 0;
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

//ghost use x y positioning in the grid and not in pixels as pacman
var Blinky = GridObject(); //i =10 k=10
var Pinky = GridObject(); //i =9 k=10
var Inky = GridObject(); // i=8 k=10
var Clyde = GridObject(); // i=9 k=9
WaitPreload(ini);

//set default value
function ini(mode) {
  Initialiser();
  initialiser = false;
  dying = false;
  if (mode == undefined) { // hard reset vs soft reset
    GameMap = JSON.parse(JSON.stringify(crossing)); //deep copy
    life = 3;
    Playsound(1);
    setTimeout(function() { iniEnd(); }, 4000);
  }
  pacman.width = 15;
  pacman.height = 15;
  pacman.offset = -10;
  pacman.x = MapGridToPixel(9);
  pacman.y = MapGridToPixel(12);

  Blinky.i = 10;
  Blinky.k = 10;
  Blinky.x = MapGridToPixel(Blinky.i);
  Blinky.y = MapGridToPixel(Blinky.k);
  Blinky.width = 10;
  Blinky.height = 15;

  Pinky.i = 9;
  Pinky.k = 10;
  Pinky.x = MapGridToPixel(Pinky.i);
  Pinky.y = MapGridToPixel(Pinky.k);
  Pinky.width = 10;
  Pinky.height = 15;


  Inky.i = 8;
  Inky.k = 10;
  Inky.x = MapGridToPixel(Inky.i);
  Inky.y = MapGridToPixel(Inky.k);
  Inky.width = 10;
  Inky.height = 15;


  Clyde.i = 9;
  Clyde.k = 9;
  Clyde.x = MapGridToPixel(Clyde.i);
  Clyde.y = MapGridToPixel(Clyde.k);
  Clyde.width = 10;
  Clyde.height = 15;
  won = false;
  if(mode != undefined){
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
  //each of our sprite is 32*32
  //ctx.drawImage(spritesheet, 0, 0, x*32, y*32, obj.x - 1/2* obj.width ,obj.y -1/2* obj.height, 32, 32);
  //DrawImageObject(spritesheet,32,32,32,32);
  //since we can't load image due to CORS problems in algoscript, we draw pacman by hand
  var dir = 0;
  var useddir = [];
  //since when pacman is stopped, obj.dir is [], we need to assign a value locally
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

  //don't draw or move before everything is loaded
  if (initialiser == true) {
    if(dying == false && won == false){
    move(pacman);
    }
    //RectanglePlein(pacman.x, pacman.y, 10, 10, 'yellow');
    DrawPac(pacman);
    DrawLife();
    RectanglePlein(Blinky.x, Blinky.y, Blinky.width, Pinky.height, "red");
    RectanglePlein(Pinky.x, Pinky.y, Pinky.width, Pinky.height, "pink");
    RectanglePlein(Inky.x, Inky.y, Inky.width, Pinky.height, "blue");
    RectanglePlein(Clyde.x, Clyde.y, Clyde.width, Pinky.height, "orange");
    Shortcut(pacman);
  }
}



function BasicIA(obj) {

  var col; //for collision

}

//utility function to convert the maze array to pixel pos
function MapGridToPixel(pos) {
  if (Array.isArray(pos)) {
    pos = gridpos.map(function(x) {
      return x * scale;
    });
    return pos;
  }
  return pos * scale;
}

/*
function MapPixelToGrid(pos) {
  return Math.abs(Math.round((pos / scale)));
}

function win() {
  if (won == false) { //function is called once
    won = true;
    ini();
  }
}
*/

//kill pac man
function death() {
  //playsound death
  Playsound(5);
  dying = true;
  if (life > 1) {
    life--;
    setTimeout(function() { ini(1); }, 1500);
  } else {
    setTimeout(function() { ini(); }, 1500);
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
        gome = true; //win check here because we loop here
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
  var clipDepth = obj.height * 2;

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
  var color = ctx.getImageData(obj.x + clipOffset, obj.y + clipOffset, clipWidth, clipDepth);
  var gomehitbox = ctx.getImageData(obj.x - obj.width / 2, obj.y - obj.height / 2, obj.width * 2, obj.height * 2);
  for (i = 0; i < gomehitbox.data.length; i += 8) {
    if (gomehitbox.data[i] == 255 && gomehitbox.data[i + 1] == 255 && gomehitbox.data[i + 2] == 255) {

      if (GameMap[MapPixelToGrid(obj.y)][MapPixelToGrid(obj.x)] != 0) {

        GameMap[MapPixelToGrid(obj.y)][MapPixelToGrid(obj.x)] = 2;
        break;
      }
    }
  }
  for (var i = 0; i < color.data.length; i += 8) {
    if (color.data[i + 2] > 100 && color.data[i] != 255) {
      return true;
    }
  }
}

//move object
function move(obj) { // dir is an array with [coord to move, direction on the axis]
  if (collision(obj) == true) {
    obj.dir = [];
  }
  if (obj.dir.length == 0) {
    return obj;
  }
  if (obj.dir[0] == 0) //move on x
  {
    if (obj.dir[1] == 1) {
      obj.x += speed;
    } else {
      obj.x -= speed;
    }
  }
  if (obj.dir[0] == 1) { //move on y
    if (obj.dir[1] == 1) {
      obj.y += speed;
    } else {
      obj.y -= speed;
    }
  }
  return obj;
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
  case 81:
    // emergency stop
    Stop();
    break;
  case 65:
    win();
    break;
  case 90:
    death();
    break;

  }

}

//play sound
function Playsound(ost)
{
  switch (ost) {
  case 1:
    intro.play();
    break;
  case 2:
    fantomes.play();
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
