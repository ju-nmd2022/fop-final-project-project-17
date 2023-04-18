let groundImage;
let widthGround = 3900;
let heightGround = 3400;

function preload() {
  groundImage = loadImage("images/ground.png");
}

// Canvas and framerate
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  let canvasWidth = min(windowWidth, 1500);
  let canvasHeight = min(windowHeight, 1500);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
}

function draw() {
  background(0);

  let numImages = 4;
  let imgWidth = (width / numImages) * 1.2;
  let imgHeight = (imgWidth * heightGround) / widthGround;

  for (let i = 0; i < numImages; i++) {
    let x = i * imgWidth - (numImages - 1) * imgWidth * 0.1;
    let y = height - imgHeight;
    image(groundImage, x, y, imgWidth + 40, imgHeight);
  }
}

/*
// Draw the ground
 function draw() {
  background(0, 0, 0);

  // define the image size
  let imgWidth = width / 3;
  let imgHeight = (imgWidth * heightGround) / widthGround;

  image(groundImage, -20, height - imgHeight, imgWidth, imgHeight);

  image(
    groundImage,
    width / 9.5 + imgWidth / 2,
    height - imgHeight,
    imgWidth,
    imgHeight
  );

  image(
    groundImage,
    width / 2.5 + imgWidth / 2,
    height - imgHeight,
    imgWidth,
    imgHeight
  );

  image(
    groundImage,
    width / 1.4 + imgWidth / 2,
    height - imgHeight,
    imgWidth,
    imgHeight
  );
}
*/

// Resize the canvas when the window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
