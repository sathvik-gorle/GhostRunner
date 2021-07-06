var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(300, 400, 30, 30)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4

  ghost.debug = true
  ghost.setCollider("circle", 0, 0,100)

  

}

function draw() {
  background(0);
  
  if (gameState == "PLAY"){

    if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space")){
    ghost.velocityY = -8
    }
    ghost.velocityY = ghost.velocityY+0.2
    if (keyDown("left")){
    ghost.x = ghost.x-15  
    }
    if (keyDown("right")){
    ghost.x  = ghost.x+15 
    }

    createDoors()

    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }

    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600) {
      gameState = "END"
    }

  }
  else if (gameState == "END"){
    spookySound.play()
    ghost.destroy()
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    invisibleBlockGroup.destroyEach()
    tower.destroy()
    textSize(50)
    fill("red")
    text("Game Over", 170, 300)
   
  }

    drawSprites()
}

function createDoors(){
  if (frameCount % 200 == 0){
    door = createSprite(Math.round(random(10, 590)), 0, 30, 30)
    door.velocityY=2
    door.addImage(doorImg)
    doorsGroup.add(door)
    ghost.depth = door.depth
    ghost.depth+=1
    climber = createSprite(door.x, door.y+60, 30, 30)
    climber.velocityY=2
    climber.addImage(climberImg)
    climbersGroup.add(climber)
    invisibleBlock = createSprite(climber.x, climber.y+5, climber.width, 5)
    invisibleBlock.velocityY=2
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)
  }
 


}
