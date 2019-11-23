//pac man clone

//variables de configuration
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

//variables d'execution
var pos = [10,10];
var gridpos =[1,0]; //[x,y]
var dir = []; //[coord x=0 y=1, pixel increment]
var Incross = false;
var points = []; //le joueur se déplace entre 2 points



function draw(){
 Initialiser();
 MapGridToPixel();
 RectanglePlein(pos[0],pos[1],10,10,'red');
}


function MapGridToPixel()
{
  pos = gridpos.map(function(x) { return x * 20; });
}

function bouger(deplacement)
{
  //sur x
	if(deplacement[0] == 0)//move on x
    {
      var type = crossing[gridpos[1]][gridpos[0]+deplacement[1]];
      //Ecrire(gridpos[0] + deplacement[1] + "first", gridpos[1] + deplacement[1], crossing[gridpos[1]].length, type);
      Ecrire(gridpos);
      if(gridpos[0] + deplacement[1] >=0 && gridpos[0] + deplacement[1] < crossing[gridpos[1]].length && type != 1)
          {
            Ecrire("here", crossing[gridpos[1]].length);
            gridpos = [gridpos[0] + deplacement[1],gridpos[1]];
          }      
    }
}

function Keypressed(k)
{ 
  //Ecrire(k);
  
  switch(k){
    
   case 38: //up
    bouger([1,1]);
    break;
    
  case 40: // down
     bouger([1,1]);
    break;
    
  case 37: //gauche
     bouger([0,-1]);
    break;
    
    
  case 39: //droite
    bouger([0,1]);
    break;
  }
}
Loop(-1);
