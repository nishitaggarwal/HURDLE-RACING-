class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
   
    car1 = createSprite(200,100);
    car1.addImage("car1",car1_img);
    road1 = createSprite(230,130,50000,2);
   

    car2 = createSprite(200,250);
    car2.addImage("car2",car2_img);
    road2 = createSprite(600,280,50000,5)

    car3 = createSprite(200,410);
    car3.addImage("car3",car3_img);
    road3 = createSprite(600,440,50000,5)
    
    car4 = createSprite(200,550);
    car4.addImage("car4",car4_img);
    road4 = createSprite(280,580,50000,5)

    road1.visible = false;
    road2.visible = false;
    road3.visible = false;
    road4.visible = false;

    cars = [car1, car2, car3, car4];
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
  
   for (var i = 230; i < 3860; i = i + 405){

        var Hurdle = createSprite(i,400,10,8)
        
       Hurdle.addImage("hurdles",hume);
      Hurdle.scale = 0.11
     //  hurdleGroup.add("Hurdle")
         }
    
   for (var i = 230; i < 3860; i = i + 405){

    var Hurdle = createSprite(i,800,10,8)
    
   Hurdle.addImage("hurdles",hume);
  Hurdle.scale = 0.11
 //  hurdleGroup.add("Hurdle")
     }


      var index = 0;

    
      var x  ;
      var y  = 175;

      for(var plr in allPlayers){
        
        index = index + 1 ;

       
        y = y + 200;

        //Yvar = displayWidth - allPlayers[plr].Distance;
       // cars[index-1].y = Yvar;

        x = displayWidth - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2 + 200  
          camera.position.x = cars[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance -= 20
      player.update();
      player.velocityY = -4 
    }


    if(keyIsDown(LEFT_ARROW) && player.index !== null){

                            
             //           player.Distance -= 10
              //            player.Distance +=  3

  //      player.velocityY = -4 
     //   player.velocityY = player.velocityY + 1;
      

     // player.update();
    }

   

    if(player.distance < -3860){
      gameState = 2;

     player.rank = player.rank + 1
     Player.updateCarsAtEnd(player.rank)
   
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
    
  }
}