// start game screen
function FirstScreen() {
    // draw background and tinted mountain - distance effect with tint
    background(135, 206, 235);
    tint(100, 128);
    image(mountain, 240, 200, 580, 450);

    // update cloud positions and draw clouds
    noTint();
    for (let i = 0; i < cloudX.length; i++) {
        cloudX[i] -= cloudSpeed; // move the cloud to the left
        if (cloudX[i] <= -300) { // if cloud is off-screen to the left
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
    image(cat, 100, 480, 80, 60);
    image(start, 320, 240, 300, 230);
}

