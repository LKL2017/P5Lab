let movers;
let G = 10;  // here G is not real, and can be an any constant you want

function setup() {
    createCanvas(600, 600);
    movers = new Array(20).fill('').map(_ => new Mover(300, 100, 4))
    background(200)

}

function draw() {
    background(220, 5);

    const attractor = createVector(300, 300);

    for (let mover of movers) {
        const f = p5.Vector.sub(attractor, mover.pos);
        const distance = f.mag();
        // F = G * m1 * m2  / r * r
        const mag = constrain(G * mover.m / (distance * distance), 0.1, 4);
        const gravitation = f.copy().setMag(mag);
        mover.applyForce(gravitation);
        mover.update();
        mover.draw();
    }
}



