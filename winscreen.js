//https://pqina.nl/blog/flipping-images-with-css-and-javascript/ Used for flipping the cat image

// define the canvas
function setup() {
  createCanvas(600, 650);
  frameRate(35);
  background(4, 16, 77);
  textFont("Press Start 2P");
}

// variables used
let ground, cat, tree, firstCloud, secondCloud, mountain;
let cloudX = [0, 380]; // starting x-coordinates of the clouds
let cloudSpeed = 2; // speed at which the clouds move
let catX = 250; // starting x-coordinate of the cat image
let flipped = false; // to check the cat image
let dogParticles = []; // to store the particles
let fishParticles = [];
let mushroomParticles = [];
let score = 0; // to store the score
let chickenX = 50; //starting x-coordinate of the chicken image
let startButton;

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
  nightCloud1 = loadImage("images/nightcloud1.png");
  nightCloud2 = loadImage("images/nightcloud2.png");
  nightStars = loadImage("images/nightstars.png");
  house = loadImage("images/house.png");
  nightStars = loadImage("images/nightstars.png");
  drop = loadImage("images/drop.png");
  evil = loadImage("images/evil.png");
  startButton = loadImage("images/start.png");
  sun = loadImage("images/sun.png");
  gameOver = loadImage("images/gameover.png");
  deadCat = loadImage("images/deadcat.png");
  chicken = loadImage("images/chicken.png");
  newGame = loadImage("images/newgame.png");
  win = loadImage("images/win.png");
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

function draw() {
  // draw background and mountain
  background(4, 16, 77);
  noTint();
  image(moon, 10, 30, 220, 160);
  image(nightStars, 470, 20, 70, 50);
  tint(200, 255);
  image(nightStars, 270, 40, 50, 40);
  image(nightStars, 30, 10, 70, 50);
  image(house, -250, 150, 500, 400);

  noTint();
  push();

  push();

  // update cloud positions and draw clouds
  noTint();
  for (let i = 0; i < cloudX.length; i++) {
    cloudX[i] -= cloudSpeed; // move the cloud to the left
    if (cloudX[i] <= -300) {
      // if cloud is off-screen to the left
      cloudX[i] = 600; // move cloud to the right side of the canvas
    }
    if (i === 0) {
      image(nightCloud1, cloudX[i], -20, 300, 200);
    } else {
      image(nightCloud2, cloudX[i], -20, 300, 230);
    }
  }

  pop();

  // draw ground, cat, and start button
  noTint();
  image(ground, -30, 300, 700, 600);
  noTint();

  // draw cat and flipped version
  push();
  image(cat, 50, 480, 80, 60);
  image(win, 20, 110, 600, 390);
  pop();
}
