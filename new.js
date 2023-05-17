// define the canvas
function setup() {
  createCanvas(600, 650);
  frameRate(35);
  background(4, 16, 77);
  textFont('Press Start 2P');
}

// variables used
let ground, cat, tree, firstCloud, secondCloud, mountain;
let cloudX = [0, 380]; // starting x-coordinates of the clouds
let cloudSpeed = 2; // speed at which the clouds move

// images
function preload() {
  ground = loadImage("images/ground.png");
  cat = loadImage("images/cat.png");
  mountain = loadImage("images/mountain.png");
  tree = loadImage("images/tree.png");
  firstCloud = loadImage("images/cloud.png");
  secondCloud = loadImage("images/cloud2.png");
  // Load the start image as well
  startButton = loadImage("images/start.png");
  sun = loadImage("images/sun.png");
}

function draw() {
  // draw background and tinted mountain - distance effect with tint
  background(135, 206, 235);
  tint(100, 128);
  image(mountain, 240, 200, 580, 450);
  noTint();
  image(sun, 430, 20, 260, 200);

  // update cloud positions and draw clouds
  noTint();
  for (let i = 0; i < cloudX.length; i++) {
    cloudX[i] -= cloudSpeed; // move the cloud to the left
    if (cloudX[i] <= -300) { // if cloud is off-screen to the left
      cloudX[i] = width; // move cloud to the right side of the canvas
    }
    if (i === 0) {
      image(firstCloud, cloudX[i], 0, 300, 200);
    } else {
      image(secondCloud, cloudX[i], 0, 300, 230);
    }
  }

    // Add text to the canvas
    fill(0, 0, 0);
    textSize(50);
    text("The cat got lost! Help it eat to get it home safely! 🐠" , 170, 280);

  // draw ground, tree, cat, and start button
  noTint();
  image(ground, -30, 300, 700, 600);
  tint(200, 255);
  image(tree, -90, 310, 250, 230);
  noTint();
  image(cat, 100, 480, 80, 60);
  image(startButton, 200, 340, 200, 130);
}
