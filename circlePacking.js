const timeScale = 1;
let listOfCircles = [], count = 0, dingSound;

function preload() {
    dingSound = loadSound('ding-sound.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    listOfCircles = [];
    count = 0;
    console.log("Refreshed.");
}

function draw() {
    colorMode(RGB);
    background(40);
    stroke(40);
    colorMode(HSL);
    if (count % timeScale == 0 && count < 2500) {
        buildNewCircle();
    } else if (count == 2500) {
        console.log("Finished.");
        dingSound.play();
    }
    listOfCircles.forEach(updateCircle);
    count++;
}

function buildNewCircle() {
    let newCircle = {x: random(width), y: random(height), r: 0, colour: null, growing: true};
    newCircle.colour = color(map(newCircle.y, 0, height, 0, 310), 100, 72);
    let validNewCircle = true;

    for (let i = 0; i < listOfCircles.length; i++) {
        let oldCircle = listOfCircles[i];

        if (dist(newCircle.x, newCircle.y, oldCircle.x, oldCircle.y) < oldCircle.r) {
            validNewCircle = false;
            break;
        }
    }

    if (validNewCircle) {
        listOfCircles.push(newCircle);
    }
}

function updateCircle(circleObject) {
    growCircle(circleObject);
    drawCircle(circleObject);
}

function growCircle(circleObject) {
    if (circleObject.growing) {
        if (circleObject.x - circleObject.r < 0 || circleObject.x + circleObject.r > width || circleObject.y - circleObject.r < 0 || circleObject.y + circleObject.r > height) {
            circleObject.growing = false;
        }
        
        for (let i = 0; i < listOfCircles.length; i++) {
            let otherCircle = listOfCircles[i];
            if (circleObject != otherCircle) {
                if (dist(circleObject.x, circleObject.y, otherCircle.x, otherCircle.y) < circleObject.r + otherCircle.r + 4) {
                    circleObject.growing = false;
                    break;
                }
            }
        }
    }
    if (circleObject.growing) {
        circleObject.r += 1 / timeScale;
    }
}

function drawCircle(circleObject) {
    strokeWeight(10);
    fill(circleObject.colour);
    ellipseMode(RADIUS);
    circle(circleObject.x, circleObject.y, circleObject.r);
}