class Mover {
    constructor(x, y, m) {
        this.pos = createVector(x + random(-10, 10), y + random(-10, 10));
        this.m = m;
        this.r = Math.floor(Math.sqrt(m) * 4);
        this.vel = createVector(random(1) > 0.5 ? 1 : -2, 0);
        this.acc = createVector(0, 0);
        this.strokeColor = [random(80, 120), 20, random(220, 260)];
    }

    applyForce(force) {
        this.acc = force;
    }

    update() {
        this.vel.add(this.acc);
    }

    draw() {
        this.pos.add(this.vel);
        stroke(this.strokeColor);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}
