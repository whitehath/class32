const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var backgroundImg,platform;
var bird, slingshot;
var wlog1,wlog2;

var gameState = "onSling";
var score = 0 ;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(750, 220);
    pig1.debug=true;
    pig3 = new Pig(810, 220);
    pig3.debug=true;
    pig5 = new Pig(820, 220);
    pig5.debug=true;
    pig7 = new Pig(780, 220);
    pig7.debug=true;
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    log3 =  new Log(810,180,300, PI/2);
    pig2 = new Pig(750, 140);
    pig2.debug=true;
    pig4 = new Pig(710, 140);
    pig4.debug=true;
    pig6 = new Pig(720, 140);
    pig6.debug=true;
    pig8 = new Pig(780, 140);
    pig8.debug=true;
    

    box5 = new Box(810,160,70,70);
    log4 = new Log(790,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
    

    bird = new Bird(200,50);

    wlog1 = new Wlog(400,250,20,270);
    wlog2 = new Wlog(1100,220,20,280);

    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
    background(backgroundImg);
    }
    noStroke();
    textSize(35);
    fill("black");
    text("Score : "+score,width-300,50);
    Engine.update(engine);
    
    ground.display();

    log1.display();
    log3.display();

    pig1.display();
    pig1.score();
    pig3.display();
    pig3.score();
    pig5.display();
    pig5.score();
    pig7.display();
    pig7.score();


    pig2.display();
    pig2.score();
    pig4.display();
    pig4.score();
    pig6.display();
    pig6.score();
    pig8.display();
    pig8.score();

    bird.display();
    platform.display();
    wlog1.display();
    wlog2.display();
    
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}

function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response =await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    console.log(responseJSON);
    var dt = responseJSON.datetime;
    var hour = dt.slice(11,13);

    if(hour>=06 && hour<=19){
        bg="bg.png"
    }

    else{
        bg="bg2.jpg"
    }

    backgroundImg=loadImage(bg);
}