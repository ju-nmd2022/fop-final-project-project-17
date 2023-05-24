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

function () {
    // draw background and mountain
    background(135, 206, 235);
    tint(100, 128);
    image(mountain, 240, 200, 580, 450);
    tint(200, 255);
    image(tree, -90, 310, 250, 230);
    scoreBar(0);
    scoreBarBackground();
    noTint();
    image(sun, 430, 20, 260, 200);
  
    pop();
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
        image(firstCloud, cloudX[i], -50, 300, 200);
      } else {
        image(secondCloud, cloudX[i], -50, 300, 230);
      }
    }
  
    pop();
  }