var monkey, monkeyRunning;

var scene,sceneImage;

var ground;

var banana, bananaImage, bananaGroup;

var obstacle, obstacleImage, obstacleGroup;

var score;

function preload(){
  monkeyRunning =    loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  sceneImage=loadImage("jungle.jpg");
  
  bananaImage=loadImage("banana.png");
  
  obstacleImage=loadImage("stone.png");
  
}

function setup() {
  createCanvas(500, 300);
  
  monkey=createSprite(100,230,20,20);
  monkey.addAnimation("running",monkeyRunning);
  monkey.scale = 0.18;
  
  scene=createSprite(250,150,500,300);
  scene.addImage(sceneImage);
  scene.scale = 0.7;
  scene.velocityX = -4;
  
  ground=createSprite(250,280,500,10);
  ground.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
}

function draw() {
  background(220);
  
  text("Score: "+ score, 300,50);
  stroke("white");
  textSize(20);
  
  if(keyDown("space")&&monkey.y>=210){
    monkey.velocityY=-16;
  }
  
  //console.log(monkey.y);
  
  monkey.velocityY=monkey.velocityY+0.83;
  
  
  
  if(scene.x<150){
    scene.x = scene.width/3;
  }
  
  if(frameCount%50===0){
    banana=createSprite(500,random(100,200),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.07;
    banana.velocityX=-5;
    banana.depth=scene.depth+1;
    bananaGroup.add(banana);
    //banana.debug=true;
    banana.setCollider("circle",0,0,330);
  }
  
  if(frameCount%100===0){
    obstacle=createSprite(500,260,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX=-6;
    obstacle.depth=scene.depth+1;
    obstacleGroup.add(obstacle);
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,200);
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  
  switch(score){
    case 10: monkey.scale=0.2;
      break;
    case 20: monkey.scale=0.22;
      break;
    case 30: monkey.scale=0.24;
      break;
    case 40: monkey.scale=0.26;
      break;
    default:  
      break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.18;
    obstacleGroup.destroyEach();
  }
  
  monkey.depth=scene.depth+1;
  
  monkey.collide(ground);
  drawSprites();
}