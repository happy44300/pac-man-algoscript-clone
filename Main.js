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

turtleEnabled=false;

var intro= ChargerSon('');//mettre les url
  var fantomes= ChargerSon('');//mettre les url
  var waka= ChargerSon('');//mettre les url
  var win= ChargerSon('');//mettre les url
  var lose= ChargerSon('');//mettre les url//mettre les url
  var ost= ChargerSon('');//mettre les url


function Sound(ost)//fonction qui permet de joue les ost au moment voulut
{switch (ost)
 { case 1:
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

var GridObject = function(){
  var obj = {};
  obj.x = 15;
  obj.y = 15;
  obj.i = 0;
  obj.k = 0;
  obj.states = 0;
  obj.width = 0;
  obj.height= 0;
  obj.offset = 0;
  obj.dir = [];
  obj.texture = 0;
  extend(obj,methods);
  return obj;
};

var extend = function(obj, methods){
  for (var key in methods){
    obj[key] = methods[key];
  }
};

var methods = {
  Pixelpos: function(){
    return MapGridToPixel([this.k,this.i]);
  }
};

var pacman = GridObject();
pacman.width = 15;
pacman.height = 15;
pacman.offset = -10;

//ghost use x y positioning in the grid and not in pixels as pacman
var Blinky= GridObject(); //i =8 k=10
  Blinky.i = 8;
  Blinky.k = 10;

Initialiser();

function BlinkyIA(){
  //chase pacman
  Blinky.x = MapGridToPixel(Blinky.i);
  Blinky.y = MapGridToPixel(Blinky.k);
  
  Pacmandir = [ MapGridToPixel(Blinky.i) - pacman.x, MapGridToPixel(Blinky.k)-pacman.y]; //vector to pacman
  var bestang = 3.14;
  var angle = 0;
  var bestdir = 0;
  
  //choose best dir toward pacman
  if(crossing[Blinky.i+1][Blinky.k] == 1){ // right
    angle = Math.atan2(pacman.y, Blinky.x) - Math.atan2(pacman.y,pacman.x); //calculate angle bewteen pacman vector and dir vector
    if(angle< bestang){
      bestang = angle;
      bestdir = 0;
    }
  }
  if(crossing[Blinky.i-1][Blinky.k] == 1){ // left
    angle = Math.atan2(pacman.y, Blinky.x) - Math.atan2(pacman.y,pacman.x); //calculate angle bewteen pacman vector and dir vector
    if(angle< bestang){
      bestang = angle;
      bestdir = 1;
    }
  }
  if(crossing[Blinky.i][Blinky.k+1] == 1){ // up
    angle = Math.atan2(pacman.y, Blinky.x) - Math.atan2(pacman.y,pacman.x); //calculate angle bewteen pacman vector and dir vector
    if(angle< bestang){
      bestang = angle;
      bestdir = 2;
    }
  }
  if(crossing[Blinky.i][Blinky.k-1] == 1){ // down
    angle = Math.atan2(pacman.y, Blinky.x) - Math.atan2(pacman.y,pacman.x); //calculate angle bewteen pacman vector and dir vector
    if(angle< bestang){
      bestang = angle;
      bestdir = 3;
    }
  }
  switch(bestdir){
    case bestdir == 0:
      return crossing[Blinky.i+1][Blinky.k];
    case bestdir == 1:
      return crossing[Blinky.i-1][Blinky.k];
    case bestdir == 2:
      return crossing[Blinky.i][Blinky.k+1];
    case bestdir == 3:
      return crossing[Blinky.i][Blinky.k-1];
  }
}

DrawGrid(crossing);

function draw() {
  Initialiser();
  DrawGrid(crossing);
  BlinkyIA();
  RectanglePlein(Blinky.x,Blinky.y,10, 15,"red");
  move(pacman);
  RectanglePlein(pacman.x, pacman.y, 10, 10, 'red');
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

  for (var i = 0; i < grid.length; i++) { 
    for (var k = 0; k < grid[i].length; k++) {
      if (grid[i][k] == 0 && grid[i][k + 1] == 0) { // is the next slot a wall?
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k + 1), MapGridToPixel(i), "blue");
      }
      if (grid[i][k] == 0 && i + 1 < grid.length && grid[i + 1][k] == 0) { //check that i+1 exist before accesing it
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k), MapGridToPixel(i + 1), "blue");
      }
    }
  }
}


function collision(obj){
  var clipOffset= obj.offset;
  var clipWidth = obj.width*2;
  var clipDepth = obj.height*2;
  
  // extend hitboxe in the direction we are moving so that we don't get stcuk when stopping
  if(obj.dir.length != 0 && obj.dir[0] == 0){
    if(obj.dir[1]>0){
    clipWidth = clipWidth* obj.dir[1] + 4;
    }else{
      clipWidth = obj.dir[1] - 2;
    }
  }else if(obj.dir[0] == 1){
    if(obj.dir[1]>0){
    clipDepth = clipDepth* obj.dir[1] + 4;
    }else{
      clipDepth = obj.dir[1] - 2;
    }
  }
  
  var clipLength = clipWidth * clipDepth;
  //RectanglePlein(obj.x + clipOffset, obj.y + clipOffset, clipWidth, clipDepth, 'yellow');
  var color = ctx.getImageData(obj.x +clipOffset, obj.y + clipOffset, clipWidth, clipDepth);
  
  //ctx.putImageData(color,400,200);
  
  for (var i = 0; i < color.data.length ; i += 4) {  
    if (color.data[i+2] == 255) {
      return true;
    }
  }
  
}



function move(obj) { // dir is an array with [coord to move, direction on the axis]
  
  if(collision(obj) == true){
    obj.dir = [];
  }
  
  if(obj.dir == []){
    return obj;
  }
  
  if (obj.dir[0] == 0) //move on x
  {
    if(obj.dir[1] == 1){
      obj.x += speed;
    }else{
      obj.x -= speed;
    }
  }
  if(obj.dir[0] == 1){//move on y
    if(obj.dir[1] == 1){
      obj.y += speed;
    }else{
      obj.y -= speed;
    }
  }
  return obj;
}

function Keypressed(k) {
  //Ecrire(k);
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
     
  case 81: // emergency stop
      throw "";
  }
}
Loop(-1);

// Fonction utiles
function normalizeAngle(angle)
{
    while (angle <= -Math.pi){ angle += 2*Math.pi;}
    while (angle> Math.pi){ angle -= 2*Math.pi;}
    return angle;
}
