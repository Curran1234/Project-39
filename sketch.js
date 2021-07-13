var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage, backgroundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;
var canvas


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  backgroundImage = loadImage("P39 back Image.jpeg");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  canvas = createCanvas(900,200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,1200,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(600,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(600,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,1200,10);
  invisibleGround.visible = false;
  invisibleGround.x = invisibleGround.width/2;
  invisibleGround.velocityX = -(6 + 3*score/100);
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(backgroundImage);


  



  text("Score: "+ score, 1100,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
	trex.velocityX = 3
    
    camera.y = trex.y;
	camera.x = trex.x;

    
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
	if(trex.x > 1000){
		trex.x = 50;
        obstaclesGroup.destroyEach();
	}
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 600){
      ground.x = ground.width/2;
      invisibleGround.x = invisibleGround.width/2;
    }
  
    trex.collide(invisibleGround);
   // spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
	
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
	trex.velocityX = 0
	
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
   // cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart) || keyDown("R")) {
      reset();
    }
  }
   
  
  drawSprites();
}

/*function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1300,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}*/

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1300,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //create random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //lifetime of each object   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  //cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
   trex.x = 50
  
  score = 0;
  
}