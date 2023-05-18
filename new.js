let state = "start";

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
let startButton;

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

// home screen
function StartScreen() {
  // draw background and tinted mountain - distance effect with tint
  background(135, 206, 235);
  tint(100, 128);
  image(mountain, 240, 200, 580, 450);
  noTint();
  image(sun, 430, 20, 260, 200);

  // update cloud positions and draw clouds
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

  // Add text to the canvas
  fill(0, 0, 0);
  textSize(50);
  text("The cat got lost! Help it eat to get it home safely! 🐠", 170, 280);

  // draw ground, tree, cat, and start button
  tint(200, 255);
  image(tree, -90, 310, 250, 230);
  noTint();
  image(ground, -30, 300, 700, 600);
  noTint();
  image(cat, 100, 480, 80, 60);
  image(startButton, 200, 340, 200, 130);

  // Check if the start button is pressed
  if (
    mouseIsPressed &&
    mouseX >= 200 &&
    mouseX <= 400 &&
    mouseY >= 340 &&
    mouseY <= 470
  ) {
    state = "game"; // Transition to the second screen
  }
}

// first level screen
function SecondScreen() {
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

  noTint();

  push();

  // for dog particles
  let max_no_of_dogParticles = 4;
  let expected_no_of_dogParticles = Math.min(
    max_no_of_dogParticles,
    millis() / 2000
  );
  if (dogParticles.length < expected_no_of_dogParticles) {
    dogParticles.push([Math.random() * (width - 24) + 12, 0]);
  }

  for (let i = 0; i < dogParticles.length; i++) {
    dogParticles[i][1] += 2;
    if (dogParticles[i][1] > height) {
      dogParticles[i][1] = 0;
      dogParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(dog)
    image(dog, dogParticles[i][0] + 40, dogParticles[i][1] + 30, 70, 55);
  }

  // for fish particles
  let max_no_of_fishParticles = 4;
  let expected_no_of_fishParticles = Math.min(
    max_no_of_fishParticles,
    millis() / 4000
  );
  if (fishParticles.length < expected_no_of_fishParticles) {
    fishParticles.push([Math.random() * (width - 24) + 12, 0]);
  }

  for (let i = 0; i < fishParticles.length; i++) {
    fishParticles[i][1] += 2;
    if (fishParticles[i][1] > height) {
      fishParticles[i][1] = 0;
      fishParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(fish)
    image(fish, fishParticles[i][0] + 40, fishParticles[i][1] + 30, 30, 20);
  }

  // for mushroom particles
  let max_no_of_mushroomParticles = 4;
  let expected_no_of_mushroomParticles = Math.min(
    max_no_of_mushroomParticles,
    millis() / 2000
  );
  if (mushroomParticles.length < expected_no_of_mushroomParticles) {
    mushroomParticles.push([Math.random() * (width - 24) + 12, 0]);
  }

  for (let i = 0; i < mushroomParticles.length; i++) {
    mushroomParticles[i][1] += 2;
    if (mushroomParticles[i][1] > height) {
      mushroomParticles[i][1] = 0;
      mushroomParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(mushroom)
    image(
      mushroom,
      mushroomParticles[i][0] + 40,
      mushroomParticles[i][1] + 30,
      35,
      25
    );
  }

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

  push();

  // fish collision with the cat

  for (let i = 0; i < fishParticles.length; i++) {
    fishParticles[i][1] += 1;
    if (fishParticles[i][1] > height) {
      fishParticles[i][1] = 5;
      fishParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision with cat object
    if (
      checkCollision(
        fishParticles[i][0] + 40,
        fishParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        80
      )
    ) {
      fishParticles.splice(i, 1); // remove the particle from the array
      score++; // increase the score
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    image(fish, fishParticles[i][0] + 40);
  }

  // dog collision with the cat

  for (let i = 0; i < dogParticles.length; i++) {
    dogParticles[i][1] += 1;
    if (dogParticles[i][1] > height) {
      dogParticles[i][1] = 2;
      dogParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision with cat object
    if (
      checkCollision(
        dogParticles[i][0] + 40,
        dogParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        80
      )
    ) {
      dogParticles.splice(i, 1); // remove the particle from the array
      score--; // decrease the score
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    image(dog, dogParticles[i][0] + 40);
  }

  // mushroom collision with the cat

  for (let i = 0; i < mushroomParticles.length; i++) {
    mushroomParticles[i][1] += 1;
    if (mushroomParticles[i][1] > height) {
      mushroomParticles[i][1] = 5;
      mushroomParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision with cat object
    if (
      checkCollision(
        mushroomParticles[i][0] + 40,
        mushroomParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        80
      )
    ) {
      mushroomParticles.splice(i, 1); // remove the particle from the array
      score--; // decrease the score
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    image(mushroom, mushroomParticles[i][0] + 20);
  }

  // Draw the score bar
  scoreBar(0, score);

  pop();

  // draw ground, tree, cat, and start button
  noTint();
  image(ground, -30, 300, 700, 600);
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
    // move cat to the left
    catX -= 8;
    flipped = true;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // move cat to the right
    catX += 8;
    flipped = false;
  }

  // make sure the cat stays within the canvas boundaries
  catX = constrain(catX, 0, width - 80);

  if (score >= 12) {
    state = "end"; // go to the second level
    score = 0; // reset the score
  }

  if (score == -1) {
    state = "end"; // change end to game over when fixed todo
    score = 0; // reset the score
  }
}

// second level screen
function ThirdScreen() {
  // draw background and mountain
  background(4, 16, 77);
  tint(100, 255);
  image(house, 0, 285, 290, 250);
  tint(200, 255);
  image(postbox, 420, 410, 150, 130);
  scoreBar(0);
  noTint();
  scoreBarBackground();
  image(moon, 10, 30, 220, 160);
  image(nightStars, 470, 20, 70, 50);
  tint(200, 255);
  image(nightStars, 270, 40, 50, 40);
  image(nightStars, 30, 10, 70, 50);

  noTint();
  push();

  // for dog particles
  let max_no_of_dogParticles = 4;
  let expected_no_of_dogParticles = Math.min(
    max_no_of_dogParticles,
    millis() / 2000
  );
  if (dogParticles.length < expected_no_of_dogParticles) {
    dogParticles.push([Math.random() * (width - 24) + 12, 0]);
  }

  for (let i = 0; i < dogParticles.length; i++) {
    dogParticles[i][1] += 2;
    if (dogParticles[i][1] > height) {
      dogParticles[i][1] = 0;
      dogParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(dog)
    image(dog, dogParticles[i][0] + 40, dogParticles[i][1] + 30, 70, 55);
  }

  // for fish particles
  let max_no_of_fishParticles = 4;
  let expected_no_of_fishParticles = Math.min(
    max_no_of_fishParticles,
    millis() / 4000
  );
  if (fishParticles.length < expected_no_of_fishParticles) {
    fishParticles.push([Math.random() * (width - 24) + 12, 0]);
  }

  for (let i = 0; i < fishParticles.length; i++) {
    fishParticles[i][1] += 2;
    if (fishParticles[i][1] > height) {
      fishParticles[i][1] = 0;
      fishParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(fish)
    image(fish, fishParticles[i][0] + 40, fishParticles[i][1] + 30, 30, 20);
  }

  // for mushroom particles
  let max_no_of_mushroomParticles = 4;
  let expected_no_of_mushroomParticles = Math.min(
    max_no_of_mushroomParticles,
    millis() / 2000
  );
  if (mushroomParticles.length < expected_no_of_mushroomParticles) {
    mushroomParticles.push([Math.random() * (width - 24) + 12, 0]);
  }

  for (let i = 0; i < mushroomParticles.length; i++) {
    mushroomParticles[i][1] += 2;
    if (mushroomParticles[i][1] > height) {
      mushroomParticles[i][1] = 0;
      mushroomParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(mushroom)
    image(
      mushroom,
      mushroomParticles[i][0] + 40,
      mushroomParticles[i][1] + 30,
      55,
      45
    );
  }

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
      image(nightCloud1, cloudX[i], -20, 300, 200);
    } else {
      image(nightCloud2, cloudX[i], -20, 300, 230);
    }
  }

  pop();

  push();

  // fish collision with the cat

  for (let i = 0; i < fishParticles.length; i++) {
    fishParticles[i][1] += 1;
    if (fishParticles[i][1] > height) {
      fishParticles[i][1] = 5;
      fishParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision with cat object
    if (
      checkCollision(
        fishParticles[i][0] + 40,
        fishParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        80
      )
    ) {
      fishParticles.splice(i, 1); // remove the particle from the array
      score++; // increase the score
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    image(fish, fishParticles[i][0] + 40);
  }

  // dog collision with the cat

  for (let i = 0; i < dogParticles.length; i++) {
    dogParticles[i][1] += 1;
    if (dogParticles[i][1] > height) {
      dogParticles[i][1] = 2;
      dogParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision with cat object
    if (
      checkCollision(
        dogParticles[i][0] + 40,
        dogParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        80
      )
    ) {
      dogParticles.splice(i, 1); // remove the particle from the array
      if (score > 0) {
        score--; // increase the score
      }
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    image(dog, dogParticles[i][0] + 40);
  }

  // mushroom collision with the cat

  for (let i = 0; i < mushroomParticles.length; i++) {
    mushroomParticles[i][1] += 1;
    if (mushroomParticles[i][1] > height) {
      mushroomParticles[i][1] = 5;
      mushroomParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision with cat object
    if (
      checkCollision(
        mushroomParticles[i][0] + 40,
        mushroomParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        80
      )
    ) {
      mushroomParticles.splice(i, 1); // remove the particle from the array
      if (score > 0) {
        score--; // increase the score
      }
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    image(mushroom, mushroomParticles[i][0] + 20);
  }

  // Draw the score bar
  scoreBar(0, score);

  pop();

  // draw ground, cat, and start button
  noTint();
  image(ground, -30, 300, 700, 600);
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
    // move cat to the left
    catX -= 8;
    flipped = true;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // move cat to the right
    catX += 8;
    flipped = false;
  }

  // make sure the cat stays within the canvas boundaries
  catX = constrain(catX, 0, width - 80);
}

function draw() {
  if (state === "start") {
    StartScreen();
  } else if (state === "game") {
    SecondScreen();
  } else if (state === "end") {
    ThirdScreen();
  }
}
