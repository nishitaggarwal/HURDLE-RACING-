var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var hurdleGroup;

var cars, car1, car2, car3, car4;
var road1,road2,road3,road4

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("images/CrossHill.bg.png");
  car1_img = loadImage("images/man.png");
  car2_img = loadImage("images/man.png");
  car3_img = loadImage("images/man.png");
  car4_img = loadImage("images/man.png");
  ground = loadImage("images/ground.png");
   hume = loadImage("images/hurdle1.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight+30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();

  for (var i = 230; i < 3860; i = i + 405){
   var Hurdle = createSprite(i,600,10,8)
      
   Hurdle.addImage("hurdles",hume);
     Hurdle.scale = 0.11
   //  hurdleGroup.add("Hurdle")
  }



    drawSprites();
  }
    if(gameState === 2){
      game.end();
      
    }



}
