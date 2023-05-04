//https://pqina.nl/blog/flipping-images-with-css-and-javascript/ Used for flipping the cat image

// define the canvas
function setup() {
  createCanvas(600, 650);
  frameRate(35);
  background(135, 206, 235);
}

// variables used
let state = "start";
let ground, cat, tree, firstCloud, secondCloud, mountain;
let cloudX = [0, 360]; // starting x-coordinates of the clouds
let cloudSpeed = 2; // speed at which the clouds move
let catX = 250; // starting x-coordinate of the cat image
let flipped = false; // to check the cat image

// images
function preload() {
  ground = loadImage("images/ground.png");
  cat = loadImage("images/cat.png");
  mountain = loadImage("images/mountain.png");
  tree = loadImage("images/tree.png");
  firstCloud = loadImage("images/cloud.png");
  secondCloud = loadImage("images/cloud2.png");
}

function draw() {
  // draw background and mountain
  background(135, 206, 235);
  tint(100, 128);
  image(mountain, 240, 200, 580, 450);

  // update cloud positions and draw clouds
  noTint();
  for (let i = 0; i < cloudX.length; i++) {
    cloudX[i] -= cloudSpeed; // move the cloud to the left
    if (cloudX[i] <= -300) {
      // if cloud is off-screen to the left
      cloudX[i] = 600; // move cloud to the right side of the canvas
    }
    if (i === 0) {
      image(firstCloud, cloudX[i], 0, 300, 200);
    } else {
      image(secondCloud, cloudX[i], 0, 300, 230);
    }
  }

  // draw ground, tree, cat, and start button
  noTint();
  image(ground, -30, 300, 700, 600);
  tint(200, 255);
  image(tree, -90, 310, 250, 230);
  noTint();

  // draw cat and flipped version
  push();
  imageMode(CENTER);
  translate(catX + 40, 0);
  if (flipped) {
    scale(-1, 1);
  }
  image(cat, 0, 510, 80, 60);
  pop();

  // moves and flips the cat depending on key pressed
  if (keyIsDown(LEFT_ARROW)) {
    if (catX > 35) {
      //stops cat from continuing out of canvas
      catX -= 8;
      flipped = true;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (catX < width - 115) {
      catX += 8;
      flipped = false;
    }
  }
}
