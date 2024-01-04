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
let glassesParticles = [];
let bananaParticles = [];
let score = 0; // to store the score
let chickenX = 50; //starting x-coordinate of the chicken image
let startButton;
let isPaused = false;
let pauseStartTime;
let currentCat;
let music = new Audio("01 boba date.wav");

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
  startButton = loadImage("images/start.png");
  sun = loadImage("images/sun.png");
  gameOver = loadImage("images/gameover.png");
  deadCat = loadImage("images/deadcat.png");
  chicken = loadImage("images/chicken.png");
  newGame = loadImage("images/newgame.png");
  win = loadImage("images/win.png");
  loseText = loadImage("images/losetext.png");
  startText = loadImage("images/starttext.png");
  powerUpItem = loadImage("images/glasses.png");
  powerUpCat = loadImage("images/supercat.png");
  currentCat = cat;
  levelUp = loadImage("images/levelup.png");
  banana = loadImage("images/banana.png");
}

function pauseArray() {
  if (isPaused) {
    pauseStartTime = millis(500);
    isPaused = true;
  } else {
    isPaused = false;
  }
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

// we tried to rewrtie it in our own way, but after hours of trying we couldnt think of anything concrete, althought it is technically different :))
// here is the colision function originally inspired by https://tutorialedge.net/gamedev/aabb-collision-detection-tutorial/

function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2) {
    return true; // Collided
  }
  return false; // Not collided
}

function isGameLost() {
  if (score < 0) {
    return true;
  }
  return false;
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
  // cloud code inspired by Jovan's code for snow in Lunar Lander, that was originally inspired by Garrit's code
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

  // draw ground, tree, cat, and start button
  tint(200, 255);
  image(tree, -90, 310, 250, 230);
  noTint();
  image(ground, -30, 300, 700, 600);
  noTint();
  image(cat, 100, 480, 80, 60);
  image(startButton, 200, 340, 200, 130);
  image(startText, -50, -30, 700, 530);

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

// paritcles code changed from the original code, as requested. now there is a function for it being called every time particles are used
function Particles(
  expected_no_of_Particles,
  particles,
  img,
  imgH,
  imgW,
  glasses = false,
  secondLvl = false
) {
  if (particles.length < expected_no_of_Particles) {
    if (glasses == true || secondLvl == true) {
      particles.push([Math.random() * (width - 24) + 12, 0]);
    } else {
      particles.push([
        Math.random() * (width - 24) + 12,
        Math.random() * (height - 630) + 100,
      ]);
    }
  }

  for (let i = 0; i < particles.length; i++) {
    if (glasses == true) {
      particles[i][1] += 2;
    }
    if (secondLvl == true) {
      particles[i][1] += 6;
    } else {
      particles[i][1] += 4;
    }
    if (particles[i][1] > height) {
      particles[i][1] = 0;
      particles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }
    // Draw particles(dog)
    if (glasses == true) {
      image(img, particles[i][0] + 10, particles[i][1] + 30, imgH, imgW);
    } else {
      image(img, particles[i][0] + 40, particles[i][1] + 30, imgH, imgW);
    }
  }
}

//
// FIRST LEVEL SCREEN
//

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

  // play background music
  music.play();

  noTint();

  push();

  // for dog particles
  // for fish particles
  // for mushroom particles

  let max_no_of_particles = 4;
  let expected_no_of_fishParticles = Math.min(
    max_no_of_particles,
    millis() / 4000
  );
  Particles(expected_no_of_fishParticles, fishParticles, fish, 30, 20);

  if (!isPaused) {
    let expected_no_of_dogParticles = Math.min(
      max_no_of_particles,
      millis() / 2000
    );
    let expected_no_of_mushroomParticles = Math.min(
      max_no_of_particles,
      millis() / 2000
    );

    Particles(expected_no_of_dogParticles, dogParticles, dog, 70, 55);
    Particles(
      expected_no_of_mushroomParticles,
      mushroomParticles,
      mushroom,
      35,
      25
    );
    Particles(1, glassesParticles, powerUpItem, 70, 55, true);
  }

  pop();

  push();
  function BananaParticles() {
    let max_no_of_bananaParticles = 1;
    let expected_no_of_bananaParticles = Math.min(
      max_no_of_bananaParticles,
      millis() / 2000
    );

    // new banana created every 2 seconds
    for (let i = 0; i < expected_no_of_bananaParticles; i++) {
      if (bananaParticles.length < expected_no_of_bananaParticles) {
        bananaParticles.push({
          x: Math.random() * (width - 200) + 14,
          y: Math.random() * (height - 530) + 144,
          xSpeed: (-1, 8),
          ySpeed: (-8, 4),
        });
      }

      // Update and draw banana particles
      bananaParticles[i].x += bananaParticles[i].xSpeed;
      bananaParticles[i].y += bananaParticles[i].ySpeed;

      // Bounce off the horizontal boundaries
      if (bananaParticles[i].x > width - 40 || bananaParticles[i].x < -30) {
        bananaParticles[i].xSpeed *= -1;
      }

      // Bounce off the vertical boundaries
      if (bananaParticles[i].y > height - 30 || bananaParticles[i].y < 40) {
        bananaParticles[i].ySpeed *= -1;
      }

      // Draw banana particle
      image(
        banana,
        bananaParticles[i].x + 40,
        bananaParticles[i].y + 30,
        30,
        30
      );

      // Check for collision with cat object
      if (
        checkCollision(
          bananaParticles[i].x + 40,
          bananaParticles[i].y + 30,
          30,
          30,
          catX,
          480,
          80,
          20
        )
      ) {
        bananaParticles.splice(i, 1); // remove the particle from the array
        if (!isPaused) {
          score--; // decrease the score
        }
        continue; // skip drawing this particle
      }
    }
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

  let detected_glasses = false;
  let intervalID = 0;
  for (let i = 0; i < glassesParticles.length; i++) {
    glassesParticles[i][1] += 1;
    if (glassesParticles[i][1] > height) {
      glassesParticles[i][1] = 5;
      glassesParticles[i][0] = Math.random() * (width - 24) + 12; // generate new x position
    }

    // check for collision of glasses with cat object
    if (
      checkCollision(
        glassesParticles[i][0] + 40,
        glassesParticles[i][1] + 30,
        30,
        20,
        catX,
        480,
        80,
        20
      )
    ) {
      glassesParticles.splice(i, 1); // remove the particle from the array

      isPaused = true;
      detected_glasses = true;
      currentCat = powerUpCat;
      intervalID = setInterval(() => {
        console.log("superPower");
      }, 1000);
      continue; // skip drawing this particle
    }
  }
  if (detected_glasses) {
    setTimeout(() => {
      // Remove mushroomParticles and dogParticles under Y 325
      mushroomParticles = mushroomParticles.filter((particle) => {
        return particle[1] < 325;
      });
      dogParticles = dogParticles.filter((particle) => {
        return particle[1] < 325;
      });
      isPaused = false;
      currentCat = cat;
      clearInterval(intervalID);
    }, 5000);
  }

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
        20
      )
    ) {
      fishParticles.splice(i, 1); // remove the particle from the array
      score++; // increase the score
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    // image(fish, fishParticles[i][0] + 40);
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
        20
      )
    ) {
      console.log(
        "dog",
        dogParticles[i][0] + 40,
        dogParticles[i][1] + 30,
        catX
      );
      dogParticles.splice(i, 1); // remove the particle from the array
      if (!isPaused) {
        console.log("detected glasses> " + isPaused);
        score--; // decrease the score
      }
      continue; // skip drawing this particle
    }

    // Draw particles(fish)
    // image(dog, dogParticles[i][0] + 40);
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
        20
      )
    ) {
      console.log(
        "mushroom",
        mushroomParticles[i][0] + 40,
        mushroomParticles[i][1] + 30,
        catX
      );
      mushroomParticles.splice(i, 1); // remove the particle from the array
      if (!isPaused) {
        console.log("detected glasses> " + isPaused);
        score--; // decrease the score
      }
      continue; // skip drawing this particle
    }
    // Draw particles(mushroom)
    // image(mushroom, mushroomParticles[i][0] + 40, mushroomParticles[i][1] + 30);
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
  image(currentCat, 0, 510, 80, 60);
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
    state = "level up"; // go to the second level
    score = 0; // reset the score
  }

  if (score <= -1) {
    state = "lose";
    score = 0; // reset the score
  }

  BananaParticles();
}

// level up screen
function NextLevelScreen() {
  // draw background and tinted house - distance effect with tint
  background(24, 47, 158);
  tint(100, 128);
  image(mountain, -200, 200, 580, 450);
  tint(150, 255);
  image(house, 440, 350, 240, 180);
  noTint();
  image(levelUp, 90, 100, 450, 350);
  image(nightStars, 470, 100, 70, 50);
  image(nightStars, 70, 200, 70, 50);
  tint(200, 255);
  image(nightStars, 320, 25, 50, 40);
  image(nightStars, 120, 80, 50, 30);
  noTint();
  image(ground, -30, 300, 700, 600);
  noTint();
  image(cat, 250, 480, 80, 60);

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

  // Check if the spacebar is pressed to start the game
  if (keyIsDown(32)) {
    state = "end"; // Transition to the second screen
  }
}

// SECOND LEVEL SCREEN
function ThirdScreen() {
  // draw background and mountain
  background(4, 16, 77);
  tint(100, 255);
  image(house, -5, 235, 400, 300);
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
  let max_no_of_dogParticles = 5;
  let expected_no_of_dogParticles = Math.min(
    max_no_of_dogParticles,
    millis() / 2000
  );

  // for fish particles
  let max_no_of_fishParticles = 3;
  let expected_no_of_fishParticles = Math.min(
    max_no_of_fishParticles,
    millis() / 4000
  );

  // for mushroom particles
  let max_no_of_mushroomParticles = 5;
  let expected_no_of_mushroomParticles = Math.min(
    max_no_of_mushroomParticles,
    millis() / 2000
  );

  // caculates where to and draws particles
  Particles(
    expected_no_of_dogParticles,
    dogParticles,
    dog,
    80,
    65,
    false,
    true
  );
  Particles(
    expected_no_of_fishParticles,
    fishParticles,
    fish,
    30,
    20,
    false,
    true
  );
  Particles(
    expected_no_of_mushroomParticles,
    mushroomParticles,
    mushroom,
    45,
    35,
    false,
    true
  );

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
        20
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
        20
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
        20
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

  if (score >= 12) {
    state = "win"; // go to the win level
    score = 0; // reset the score
  }

  if (score <= -1) {
    state = "lose"; // change end to game over when fixed todo
    score = 0; // reset the score
  }
}

// game over screen
function GameOverScreen() {
  // draw background and tinted mountain - distance effect with tint
  background(0, 0, 0);

  image(ground, -30, 300, 700, 600);
  image(deadCat, 50, 400, 180, 160);
  image(gameOver, 110, 20, 400, 300);
  image(newGame, 440, 460, 150, 90);
  image(loseText, 165, 240, 300, 200);

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

  if (chickenX >= 440 && chickenX <= 460) {
    // transition to start screen
    window.location.reload();
    chickenX = 50;
  }
}

function WinScreen() {
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

function keyPressed() {
  if (state === "win" && keyCode === 32) {
    state = "start";
  }
}

// inspired by Jovan's lunar lander game code
function draw() {
  if (state === "start") {
    StartScreen();
  } else if (state === "game") {
    SecondScreen();
  } else if (state === "level up") {
    NextLevelScreen();
  } else if (state === "end") {
    ThirdScreen();
  } else if (state === "lose") {
    GameOverScreen();
  } else if (state === "win") {
    WinScreen();
  }
}
