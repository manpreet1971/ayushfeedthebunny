const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var fruit;
var button, button2, button3;
var rope, rope2, rope3;
var fruit_con, fruit_con2, fruit_con3;
var bunny;
var blower;

var bg_img, rabbit_img, fruit_img, blink, eat, sad;
var air, eat_sound, sad_sound, cut_sound, bk_sound;
var mute_btn;

function preload() {

  bg_img = loadImage('assets/background.png');
  fruit_img = loadImage('assets/melon.png');
  rabbit_img = loadImage('assets/Rabbit-01.png');

  air = loadSound('assets/air.wav');
  eat_sound = loadSound('assets/eating_sound.mp3');
  sad_sound = loadSound('assets/sad.wav');
  cut_sound = loadSound('assets/rope_cut.mp3');
  bk_sound = loadSound('assets/sound1.mp3');

  blink = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png");

  sad.looping = false;
  eat.looping = false;

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
}

function setup() {
  // createCanvas(900,700);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW + 70, canH);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH);//error 
  }

  bk_sound.play();

  engine = Engine.create();
  world = engine.world;

  button = createImg('assets/cut_btn.png');
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg('assets/cut_btn.png');
  button2.position(330, 35);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg('assets/cut_btn.png');
  button3.position(360, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

  // bunny = createSprite(400,580,100,100);//changing
  // bunny.scale = 0.3;

  bunny = createSprite(370, canH - 80, 100, 100);
  bunny.scale = 0.2;
  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('sad', sad);
  bunny.changeAnimation('blinking');

  blower = createImg('assets/balloon.png');//noit needed 
  blower.position(5, 250);
  blower.size(150, 100);
  blower.mouseClicked(airBlow);

  mute_btn = createImg('assets/mute.png');
  mute_btn.position(450, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);


  //ground = new Ground(400,690,1000,20); change
  ground = new Ground(200, canH, 600, 20);

  // rope = new Rope(7,{x:245,y:30}); changing
  // rope2 = new Rope(8,{x:40,y:30});
  // rope3 = new Rope(4,{x:400,y:225});

  rope = new Rope(8, { x: 40, y: 30 });
  rope2 = new Rope(7, { x: 370, y: 40 });
  rope3 = new Rope(4, { x: 400, y: 225 });



  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  // fruit_con = new Link(rope2,fruit); chnaging
  // fruit_con2 = new Link(rope,fruit);
  // fruit_con3 = new Link(rope3,fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2, fruit);
  fruit_con_3 = new Link(rope3, fruit);




  //ellipseMode(CENTER); wrong

  rectMode(CENTER);

}



function draw() {
  background("black");
  image(bg_img, 0, 0, displayWidth + 80, displayHeight);

  push()
  imageMode(CENTER);

  if (fruit != null) {
    image(fruit_img, fruit.position.x, fruit.position.y, 60, 60);
  }
  pop();

  // ellipse(fruit.position.x,fruit.position.y,20,20);


  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.display();

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');
    eat_sound.play();
    bk_sound.stop();
  }



  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('sad');
    sad_sound.play();
    bk_sound.stop();
    fruit = null; ///not incorporated
  }
  drawSprites();
}

// function drop() {
//   rope.break();
//   fruit_con.detach();
//  // fruit_con == null; ///error

//   cut_sound.play();
// }

// function drop2() {
//   rope2.break();
//   fruit_con2.detach();
//   fruit_con2 ==null;
//   cut_sound.play();
// }

// function drop3() {
//   rope3.break();
//   fruit_con3.detach();
//   fruit_con3==null;
//   cut_sound.play();
// }
function drop() {
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3() {
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}
function collide(fruit, sprite) {
  if (fruit != null) {
    var d = dist(fruit.position.x, fruit.position.y, sprite.position.x, sprite.position.y);
    if (d < 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function airBlow() {
  Matter.Body.applyForce(fruit, fruit.position, { x: 0.5, y: 0 })
  air.play();
}

function mute() {
  if (bk_sound.isPlaying()) {
    bk_sound.stop();
  }
  else {
    bk_sound.play();
  }
}



