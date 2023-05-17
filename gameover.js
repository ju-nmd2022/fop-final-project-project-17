//https://pqina.nl/blog/flipping-images-with-css-and-javascript/ Used for flipping the cat image

// define the canvas
function setup() {
  createCanvas(600, 650);
  frameRate(35);
  background(4, 16, 77);
  textFont('Press Start 2P')
}

// variables used
let state = "start";
let ground, cat, tree, firstCloud, secondCloud, mountain;
let cloudX = [0, 380]; // starting x-coordinates of the clouds
let cloudSpeed = 2; // speed at which the clouds move
let catX = 250; // starting x-coordinate of the cat image
let flipped = false; // to check the cat image
let dogParticles = []; // to store the particles
let fishParticles = [];
let mushroomParticles = [];
let score = 0; // to store the score
let blinkInterval;
let blinkVisible = true; // to check if the sign is blinking
let chickenX = 50; //starting x-coordinate of the chicken image

// images
function preload() {
  ground = loadImage("images/ground.png");
  cat = loadImage("images/cat.png");
  mountain = loadImage("images/mountain.png");
  tree = loadImage("images/tree.png");
  firstCloud = loadImage("images/cloud.png");
  secondCloud = loadImage("images/cloud2.png");
  fish = loadImage("images/fish.png");
  dog = loadImage("images/dog.png");
  mushroom = loadImage("images/mushroom.png");
  moon = loadImage("images/moon.png");
  postbox = loadImage("images/postbox.png");
  nightcloud1 = loadImage("images/nightcloud1.png");
  nightcloud2 = loadImage("images/nightcloud2.png");
  nightstars = loadImage("images/nightstars.png");
  house = loadImage("images/house.png");
  nightStars = loadImage("images/nightstars.png");
  drop = loadImage("images/drop.png");
  evil = loadImage("images/evil.png");
  gameOver = loadImage("images/gameover.png");
  deadCat = loadImage("images/deadcat.png");
  chicken = loadImage("images/chicken.png");
  newGame = loadImage("images/newgame.png");
}

function scoreBar(offsetY, score) {
  let X = 550;
  let Y = 70 + offsetY;
  let barHeight = map(score, 0, 10, 0, 200); // Map the score to the height of the bar
  barHeight = constrain(barHeight, 0, 210); // Limit the height of the bar within the background
  push();
  noStroke();
  fill(255, 150, 90);
  rect(572, Y + 350, 10, -barHeight); // Use -barHeight to draw the bar upwards
  pop();
}

function scoreBarBackground() {
  push();
  noStroke();
  fill(255, 200, 90);
  rect(568, 200, 20, 225);
  pop();
}

function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2) {
    return true; // Collided
  }
  return false; // Not collided
}


function draw() {
  // draw background and tinted mountain - distance effect with tint
  background(0, 0, 0);

  image(ground, -30, 300, 700, 600);
  image(deadCat, 50, 400, 180, 160);
  image(gameOver, 110, 20, 400, 300);
  image(newGame, 440, 460, 150, 90);

  push();
  imageMode(CENTER);
  translate(chickenX + 2, 0);
  if (flipped) {
    scale(-1, 1);
  }
  image(chicken, 0, 510, 80, 60);
  pop();
  
  // moves and flips the chicken depending on key pressed
  if (keyIsDown(LEFT_ARROW)) {
    // move chicken to the left
    chickenX -= 8;
    flipped = true;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // move chicken to the right
    chickenX += 8;
    flipped = false;
  }

  // make sure the cat stays within the canvas boundaries
  chickenX = constrain(chickenX, 20, width - 30);

    // Add text to the canvas
    fill(255, 255, 255);
    textSize(30);
    text("Oh...I became a chicken?" , 250, 400);
}