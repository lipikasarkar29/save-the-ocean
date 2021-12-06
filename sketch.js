var PLAY = 1;
var END = 2;
var START = 0;
var gameState = START;
var score=0;
var life=3;


function preload(){
 bgImg = loadImage ("bg3.jpg")
 bgImg2 = loadImage ("bg2.jpg")
 playImg = loadImage("play_button.png");

 turtleImg = loadImage("turtle.png");

 player1Img=loadImage("diver1.png")
 player2Img=loadImage("diver2.png")
 player3Img=loadImage("diver3.png")
 restartImg = loadImage("restart.png");
 bottleImg=loadImage("bottle.jpg")
 bagImg=loadImage("bag.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2,height/2)
  bg.addImage(bgImg);
  bg.scale=0.5

  bg2 = createSprite(width/2,height/2);
  bg2.addImage(bgImg2);
  bg2.visible=false
  bg2.scale =0.8

 playBtn = createSprite(windowWidth/2, windowHeight/2)
 playBtn.addImage(playImg)
 playBtn.scale = 0.1

 diver1=createImg("diver1.png")
 diver1.position(width/2-400,height/2-250)
 diver1.size(250,250)
 diver1.mouseClicked(player1_select)

 diver2=createImg("diver2.png")
 diver2.position(width/2-400,height/2+50)
 diver2.size(250,250)
 diver2.mouseClicked(player2_select)

 diver3=createImg("diver3.png")
 diver3.position(width/2+250,height/2-250)
 diver3.size(250,250)
 diver3.mouseClicked(player3_select)
 
 restart=createSprite(windowWidth/2, windowHeight/2)
  restart.addImage(restartImg)
  restart.scale= 0.7;  
  restart.visible=false


 turtlegroup=new Group()
 baggroup=new Group()
  bottlegroup=new Group()
 
}


function draw() {
  
  background("skyblue");
  drawSprites();
  fill("yellow");
  textSize(20)
  text("Plastic Collected: "+score,width-200,80);
  text("Lives: "+life,width-200,100);
  //displaying score
  if(gameState===START){
    restart.visible=false
    if (mousePressedOver(playBtn)){
      gameState=PLAY
    }
   }
  
   if(gameState===PLAY){
    //restart.visible=false
    
    bg.visible=false;
    playBtn.visible=false;
    bg2.visible= true;
    bg2.velocityX=-5;

    if(bg2.x<380){
      bg2.x=bg2.width/3
    }
    
    spawnTurtle()

    var select1= Math.round(random(1,2))
    if(frameCount%160===0){
      if(select1===1){
        spawnBag();
      }
        if(select1===2){
        spawnBottle();
      }
     
    }

    if(keyDown("space")){
      player.velocityY=-10
    }
    player.velocityY+=0.8


    if(player.isTouching(baggroup)){
      baggroup.destroyEach();
      score = score + 1;
    }

    if(player.isTouching(bottlegroup)){
      bottlegroup.destroyEach();
      score = score + 1;
    }

    if(player.y>height-30){
      life=life-1;
      gameState=END
    }
    
  
  }

  if(gameState===END){
    bg2.velocityX=0;
    player.destroy();
    if (life>=1) {
      restart=createSprite(windowWidth/2, windowHeight/2)
      restart.addImage(restartImg)
      restart.scale= 0.7;  
      restart.visible=true;
      //restart.visible=true;
          textSize(20)
          fill("cyan")
          text("TRY AGAIN...",windowWidth/2-50,windowHeight/2+100)
          if (mousePressedOver(restart)){
          
          reset();
        }
    }
      else{
      restart.visible=false;
      textSize(30)
      fill("red")
      stroke("yellow")
      strokeWeight(3);
      text("Sorry!!! You LOSE",windowWidth/2-100,windowHeight/2)
    }
      
    }
  }
    
   
    
  

  function reset(){
    //restart.visible = true;
    
    gameState=PLAY
    
    
    bg2 = createSprite(width/2,height/2);
    bg2.addImage(bgImg2);
    
    player=createSprite(100,height-120,50,50)
    player.scale=0.5;
   
    
   //preload();
    
  }
  

  
function spawnTurtle(){
  if(frameCount%200==0){
    var turtle = createSprite(width,random(height/2-600,height/2+600),50 , 50 )
    turtle.addImage(turtleImg);
    turtle.scale=0.05;
   turtle.velocityX=-1
   // A1.rotation=180;
   turtle.lifetime=800;
   turtlegroup.add(turtle)
  }
  }  

  function spawnBag(){
   bag = createSprite(width,random(height/2-500,height/2+500),50 , 50 )
    bag.addImage(bagImg);
    bag.scale=0.05
    bag.debug=true
    bag.velocityX=-6+score/100;
    bag.lifetime=400;
    baggroup.add(bag)
  }   
  
  function spawnBottle(){
   bottle = createSprite(width,random(height/2-500,height/2+500),50 , 50 )
    bottle.addImage(bagImg);
    bottle.scale=0.05
    //helicop2.scale=0.1;
    bottle.velocityX=-6+score/100;
    bottle.lifetime=400;
    bottlegroup.add(bottle)
  }  


  function player1_select(){
    player=createSprite(100,height-120,50,50)
    player.addImage(player1Img)
    //player1.debug=true
    player.scale=0.5;
    player.debug=true
    player.setCollider("rectangle",0,0,player.width,40)
    hide()
    
    
  }

  function player2_select(){
    player=createSprite(100,height-120,50,50)
    player.addImage(player2Img)
    player.scale=0.5
    hide()
    
    
  }

  function player3_select(){
    player=createSprite(100,height-120,50,50)
    player.addImage(player3Img)
    player.scale=0.5
    hide()
    
    
  }

  function hide(){
    diver1.hide()
    diver2.hide()
    diver3.hide()
  }
  


