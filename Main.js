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
var wall_offset = scale * 1; // a brick is between two wall point, the offset is the distance from it's center to border *====center====*

//variables d'execution

turtleEnabled=false;

//var canvas = DrawGridImg(crossing);
//var maze = PreloadImage(canvas.toDataURL());

var GridObject = function(){
  var obj = {};
  obj.x = 0;
  obj.y = 0;
  obj.states = 0;
  obj.width = 10;
  obj.height= 10;
  obj.dir = [];
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

Initialiser();


DrawGrid(crossing);

function draw() {
  Initialiser();
  DrawGrid(crossing);
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
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k + 1), MapGridToPixel(i), "red");
      }
      if (grid[i][k] == 0 && i + 1 < grid.length && grid[i + 1][k] == 0) { //check that i+1 exist before accesing it
        Ligne(MapGridToPixel(k), MapGridToPixel(i), MapGridToPixel(k), MapGridToPixel(i + 1), "red");
      }
    }
  }
}


function collision(obj){
  
   var clipWidth = 40;
        var clipDepth = 40;
        var clipLength = clipWidth * clipDepth;
        // alert(clipLength);
        var clipOffset = 5;
  
  var color = ctx.getImageData(obj.x + clipOffset, obj.y + clipOffset, clipWidth, clipDepth);
  for (var i = 0; i < obj.width * obj.height ; i += 4) {
    if (color.data[i] == 255) {
      Ecrire("red");
      return true;
    }
  }
  return false;
}



function move(obj) { // dir is an array with [coord to move, direction on the axis]
  
  if(collision(obj) == true){
    obj.dir = [];
    return obj;
  }
  
  if(obj.dir == []){
    return obj;
  }
  
  if (obj.dir[0] == 0) //move on x
  {
    if(obj.dir[1] == 1){
      obj.x++;
    }else{
      obj.x--;
    }
  }
  if(obj.dir[0] == 1){//move on y
    if(obj.dir[1] == 1){
      obj.y++;
    }else{
      obj.y--;
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
  function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}
function Ini2dArray(x,y){
  var arr = new Array(y);
  for (var i = 0; i < y; i++) {
    x[i] = new Array(x);
  }
  return arr;
}
  
//Deprecated function
  function DrawGridImg(grid) {
  var can = document.createElement('canvas');
  var ctx =  canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  canvas.width = 1024;
  canvas.height = 720;

  for (var i = 0; i < grid.length; i++) { 
    for (var k = 0; k < grid[i].length; k++) {
      if (grid[i][k] == 0 && grid[i][k + 1] == 0) { // is the next slot a wall?
        ctx.moveTo(MapGridToPixel(k), MapGridToPixel(i));
        ctx.lineTo( MapGridToPixel(k + 1), MapGridToPixel(i));
        ctx.stroke();
      }
      if (grid[i][k] == 0 && i + 1 < grid.length && grid[i + 1][k] == 0) { //check that i+1 exist before accesing it
        ctx.moveTo(MapGridToPixel(k), MapGridToPixel(i));
        ctx.lineTo( MapGridToPixel(k), MapGridToPixel(i+1));
        ctx.stroke();
      }
    }
  }
  return can;
}
