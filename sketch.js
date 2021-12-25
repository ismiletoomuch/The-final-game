var PLAY = 1;
var END = 0;
var gameState = PLAY;
var duck,duckimage
var bowman, bowmanimage
var bgimage
var arrow
var arrowsprite
var ground
var edge
var arrowGroup
var bowmanstops
var sound

function preload(){
duckimage = loadAnimation("duck1.png","duck2.png","duck3.png","duck4.png","duck5.png", "duck6.png")
deadduck = loadAnimation("deadducky2.png")
bowmanimage = loadAnimation("bowman1.png","bowman2.png","bowman3.png","bowman4.png","bowman5.png","bowman6.png")
bgimage = loadImage("level1bg.jpg")
arrow = loadImage("arrow.png")
bowmanstops = loadAnimation("bowman5.png")

}

function setup(){
createCanvas (800,800)
ground = createSprite(0,0,1200,800)
duck = createSprite(450, 400)
duck.setCollider("circle", 0, 0, 200);
duck.addAnimation("duckmoving",duckimage)
duck.addAnimation("deadduck" ,deadduck)
bowman = createSprite(1,400)
bowman.addAnimation("bowmanmoving", bowmanimage)
bowman.addAnimation("bowmanstops", bowmanstops)
duck.scale = 0.15
duck.velocityX = 0.50
bowman.scale = 0.25
bowman.velocityX = 0.5
bowman.frameDelay = 6
//ground.width = 800
//ground.height = 800
ground.addImage(bgimage)
ground.scale = 3
edge = createSprite(0,460,1200,10)
edge.visible = false
duck.debug = true;
arrowGroup = new Group ();
sound = loadSound("hitducknoise.wav");

}

function draw(){
  //background(bgimage)
drawSprites()
if(gameState===PLAY){
  spawnarrow();
  ground.velocityX = -2.5
  edge.velocityX = -2.5
  if (ground.x < 200 ){
    ground.x = ground.width/2;
  }
  if(edge.x < 200){
    edge.x = edge.width/2
  }
  if(duck.x > 800){
    duck.x = 400
  }
  if(keyDown("space")){
    duck.velocityY = -7
  }
  duck.velocityY = duck.velocityY + 0.7

  if(arrowGroup.isTouching(duck))
    {gameState = END;}
}
else if(gameState===END){
duck.velocityY = 0
duck.velocityX = 0
bowman.velocityX = 0
ground.velocityX = 0
arrowGroup.setVelocityXEach(0);
arrowGroup.setLifetimeEach(-1);
duck.changeAnimation("deadduck",deadduck)
bowman.changeAnimation("bowmanstops", bowmanstops)
if (sound.isPlaying()) 
{ sound.stop(); 
} else { sound.play(); }
}
duck.collide(edge);
}
function spawnarrow(){
  if(frameCount % 170 === 0 ){
    arrowsprite = createSprite (200,385)
arrowsprite.addImage (arrow)
arrowsprite.scale = 0.1
arrowsprite.velocityX = 3.5
arrowsprite.lifetime = 700
bowman.velocityX = 0
arrowGroup.add(arrowsprite);
  }
}