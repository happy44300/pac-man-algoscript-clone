var crossing = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
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
var speed = 0.5;

//variables d'execution
turtleEnabled = false;
var GameMap;

var lastDir = []; //latest pacman dir, used for rendering
var initialiser = false;
var intro = ChargerSon('https://happy44300.github.io/intro.wav');
var fantomes = ChargerSon(''); //mettre les url
var waka = ChargerSon('https://happy44300.github.io/pac-man-waka-waka.mp3');
var winSound = ChargerSon(''); //mettre les url
var lose = ChargerSon(''); //mettre les url//mettre les url
var ost = ChargerSon(''); //mettre les url
var spritesheet = PreloadImage("https://happy44300.github.io/sprites32.png");



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
var Blinky = GridObject(); //i =8 k=10
WaitPreload(ini);

function ini() {
  Initialiser();
  pacman.width = 15;
  pacman.height = 15;
  pacman.offset = -10;
  pacman.x = MapGridToPixel(9);
  pacman.y = MapGridToPixel(12);
  Blinky.i = 9;
  Blinky.k = 10;
  Blinky.x = MapGridToPixel(Blinky.i);
  Blinky.y = MapGridToPixel(Blinky.k);
  GameMap = crossing.slice();
  Playsound(1);
  
  //setTimeout(function() { iniEnd(); }, 4000);
  initialiser = true;
}

function iniEnd() {
  initialiser = true;
}

function Shortcut(obj){
  if(obj.x > MapGridToPixel(18) && obj.y > MapGridToPixel(8)){
    obj.x = MapGridToPixel(1) + obj.width;//offset
    obj.y = MapGridToPixel(9) + obj.height;
  }else if(obj.x < MapGridToPixel(0) && obj.y > MapGridToPixel(8)){
    obj.x = MapGridToPixel(17) + obj.width;
    obj.y = MapGridToPixel(9)+ obj.height;
  }
}

function DrawPac(obj) {

  //each of our sprite is 32*32
  //ctx.drawImage(spritesheet, 0, 0, x*32, y*32, obj.x - 1/2* obj.width ,obj.y -1/2* obj.height, 32, 32);
  //DrawImageObject(spritesheet,32,32,32,32);
  //since we can't load image due to CORS problems in algoscript, we draw pacman by hand
  var dir = 0;
  var useddir = [];


  //since when pacman is stopped, obj.dir is [], we need to assign a value locally

  if (obj.dir.length == 0) {
    useddir = lastDir.slice();
  } else {
    lastDir = obj.dir.slice();
    useddir = lastDir.slice();
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

function draw() {
  Initialiser();
  RectanglePlein(0, 0, 10000, 10000, "black"); //background
  DrawGrid(GameMap);
  //don't draw or move before everything is loaded
  if (initialiser == true) {
    move(pacman);
    //RectanglePlein(pacman.x, pacman.y, 10, 10, 'yellow');
    DrawPac(pacman);
    RectanglePlein(Blinky.x, Blinky.y, 10, 15, "red");
    Shortcut(pacman);
  }
}

function BasicIA() {}

function BlinkyIA() {
  //chase pacman
  Blinky.x = MapGridToPixel(Blinky.i);
  Blinky.y = MapGridToPixel(Blinky.k);

  if (Blinky.moving == true) {
    return;
  }

  pacmandir = [MapGridToPixel(Blinky.i) - pacman.x, MapGridToPixel(Blinky.k) - pacman.y]; //vector to pacman
  Ecrire(pacmandir);
  var bestang = 3.14;
  var angle = 0;
  var bestdir = 0;
  var vectorx = 0;
  var vectory = 0;
  //choose best dir toward pacman by projecting x and y on the axis
  //0:up, 1:down , 2:right, 3:left
  if (Math.abs(pacmandir[0]) > Math.abs(pacmandir[1])) {
    //move on x
    if (pacmandir[0] < 0) {
      bestdir = 0;
    } else {
      bestdir = 1;
    }
  } else {
    //move on y
    if (pacmandir[1] < 0) {
      bestdir = 2;
    } else {
      bestdir = 3;
    }
  }

  //Ecrire(bestdir);
  if (Blinky.moving == true) {
    return;
  }
  switch (bestdir) {
  case 0:
    Ecrire("here");
    Moveto(Blinky.i, Blinky.k - 1, Blinky);
    break;
  case 1:
    Moveto(Blinky.i, Blinky.k + 1, Blinky);
    break;
  case 2:
    Ecrire("here");
    Moveto(Blinky.i + 1, Blinky.k, Blinky);
    break;
  case 3:
    Ecrire("here");
    Moveto(Blinky.i - 1, Blinky.k, Blinky);
    break;
  }
}

function Moveto(i, k, obj) {
  if (obj.moving == true) {
    return;
  }
  obj.moving = true; //prevent multiple movement
  if (obj.i - i != 0 && obj.k - k != 0) {
    Ecrire("doublemove");
  }
  obj.i = i;
  obj.k = k;
  obj.x = i * 20;
  obj.y = i * 20;
  obj.moving = false;
  return;
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

function MapPixelToGrid(pos) {
  return Math.abs(Math.round((pos / scale)));
}

function win() {
  Ecrire("win");
  ini();
}


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
  }
}

function Playsound(ost) //fonction qui permet de joue les ost au moment voulut
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
