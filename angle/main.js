const canvasSize = 600;
let circleSize = 10;
let total = canvasSize / circleSize;
let angles = [];
let angleV = 0;

function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < total; i++) {
        const angle = map(i * circleSize, 0, canvasSize, 0, TWO_PI);
        angles.push(angle);
    }
}


function draw() {
    background(10);
    for (let i = 0; i < total; i++) {
        const x = i * circleSize;
        const wave1 = map(sin(angles[i] + 2 * angleV), -1, 1, 100, 200);
        const wave2 = map(cos(2 * angles[i] + angleV), -1, 1, 100, 200);
        circle(x, wave1 + wave2, circleSize);
    }
    angleV += 0.05;
}
