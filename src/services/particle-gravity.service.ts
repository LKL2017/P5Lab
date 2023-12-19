import { Injectable } from '@angular/core';
import {_P5Particle, ParticleService} from "./particle.service";
import P5 from "p5";

class GravityParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  r: number;
  minForce = 0.1;
  maxForce = 0.8

  get mass(): number {
    return this.r * this.r / 8;
  }

  constructor(p5Context: P5, x: number, y: number, r: number) {
    this.p5 = p5Context;
    this.pos = new P5.Vector(x, y);
    this.vel = new P5.Vector(this.p5.random(-2, 2), this.p5.random(-2, 2))
    this.acc = new P5.Vector(0, 0);
    this.r = r;
  }

  getGravityByAttractor(attractor: AttractorParticle): P5.Vector {
    const _d = this.p5.dist(this.pos.x, this.pos.y, attractor.pos.x, attractor.pos.y);
    const dist = this.p5.max(_d, 100);
    const uint = P5.Vector.sub(attractor.pos, this.pos).normalize();
    const F = attractor.G * this.mass * attractor.mass / (dist * dist);
    // because we are in 'pixel world', and mag can be very huge without constrain
    return uint.setMag(this.p5.constrain(F, this.minForce, this.maxForce));
  }

  applyForce(f: P5.Vector) {
    this.acc.set(f);
  }

  update() {
    this.p5.fill(50, 11 , 233, this.p5.map(this.acc.mag(), this.minForce, this.maxForce, 50, 255));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  render() {
    this.p5.circle(this.pos.x, this.pos.y, this.r * 2);
  }

}


class AttractorParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  originPos: P5.Vector;
  vel = new P5.Vector(0, 0);
  acc = new P5.Vector(0, 0);
  G = 60;
  r: number;

  isFollowingMouse = false;

  get mass(): number {
    return this.r * this.r / 8;
  }

  constructor(p5Context: P5, x: number, y: number, r: number) {
    this.p5 = p5Context;
    this.pos = new P5.Vector(x, y);
    this.originPos = this.pos.copy();
    this.r = r;
  }

  setMousePosition(x: number, y: number) {
    this.isFollowingMouse = true;
    this.pos.set(x, y);
  }

  update() {
    if (this.isFollowingMouse) return;
  }

  render() {
    this.p5.fill('white');
    this.p5.circle(this.pos.x, this.pos.y, this.r * 2);
  }

}


@Injectable()
export class ParticleGravityService extends ParticleService {
  count = 10;
  attractorR = 12;
  particleR = 6;
  attractor: AttractorParticle;
  particles: GravityParticle[] = [];

  isShowTail = false;


  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.context = canvasEl.getContext('2d');
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.setup = () => {
        const renderer = p5.createCanvas(w, h, canvasEl);
        p5.background(0, 0, 0);
        this.genAttractor(p5);
        this.genParticles(p5);
        // renderer.mouseMoved(_ => {
        //   this.attractor.setMousePosition(p5.mouseX, p5.mouseY);
        // });
      }
      p5.draw = () => this.draw(p5);
    }
    new P5(sketch);
  }

  genAttractor(p5: P5) {
    this.attractor = new AttractorParticle(p5, this.width / 2, this.height / 2, this.attractorR);
  }

  genParticles(p5: P5) {
    for (let i = 0; i < this.count; i++) {
      this.particles.push(new GravityParticle(p5, p5.random(0, this.width), p5.random(0, this.height), this.particleR));
    }
  }

  draw(p5: P5) {
    // clear
    if (this.isShowTail) {
      p5.background(0, 5);
    } else {
      p5.background(0);
    }

    this.particles.forEach(particle => {
      const F = particle.getGravityByAttractor(this.attractor);
      particle.applyForce(F);
      particle.update();
      particle.render();
    })

    this.attractor.update();
    this.attractor.render();
  }

  toggleTail() {
    this.isShowTail = !this.isShowTail;
  }

}
