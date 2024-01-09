import { Injectable } from '@angular/core';
import {radiusToMass} from "@util/math";
import {_P5Particle, ParticleService} from "./particle.service";
import P5 from "p5";

export type GravityParticleStyle = 'circle' | 'stroke' | 'triangle';

class GravityParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  r: number;
  minForce = 0.1;
  maxForce = 0.8

  particleStyle: GravityParticleStyle = 'circle';

  isRotate = false;
  rotation = 0;
  rotateAcc = Math.PI / 60;

  color = '#42e8cf'

  get mass(): number {
    return radiusToMass(this.r);
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
    const alpha = this.p5.map(this.acc.mag(), this.minForce, this.maxForce, 50, 255)
    this.p5.stroke(this.color);
    this.p5.fill(this.color);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  render() {
    switch (this.particleStyle) {
      case "triangle":
        this.renderAsTriangle();
        break;
      case "stroke":
        this.renderAsStroke();
        break;
      case "circle":
      default:
        this.p5.circle(this.pos.x, this.pos.y, this.r * 2);
    }
  }

  renderAsTriangle() {
    const vecA = this.p5.createVector(0, -this.r * 2);

    if (this.isRotate) {
      vecA.rotate(this.rotation);
      this.rotation += this.rotateAcc;
    }

    const vecB = vecA.copy().rotate(Math.PI * 2 / 3);
    const vecC = vecA.copy().rotate(Math.PI * 4 / 3);
    const posA = P5.Vector.add(this.pos, vecA);
    const posB = P5.Vector.add(this.pos, vecB);
    const posC = P5.Vector.add(this.pos, vecC);

    this.p5.triangle(posA.x, posA.y, posB.x, posB.y, posC.x, posC.y);
  }

  renderAsStroke() {
    this.p5.rect(this.pos.x, this.pos.y, 1, 1);
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

  get mass(): number {
    return radiusToMass(this.r);
  }

  constructor(p5Context: P5, x: number, y: number, r: number) {
    this.p5 = p5Context;
    this.pos = new P5.Vector(x, y);
    this.originPos = this.pos.copy();
    this.r = r;
  }

  update() {
    this.p5.fill('white');
    this.p5.stroke('white');
  }

  render() {
    this.p5.circle(this.pos.x, this.pos.y, this.r * 2);
  }

}


@Injectable()
export class ParticleGravityService extends ParticleService {
  p5: P5;
  count = 1;
  attractorR = 16;
  particleR = 10;
  attractor: AttractorParticle;
  particles: GravityParticle[] = [];

  isShowTail = false;
  isShowAttractor = true;

  gravityParticleStyle: GravityParticleStyle = 'circle';
  gravityParticleColor = '#42e8cf';
  gravityParticleRotate = false;

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      this.p5 = p5;
      p5.setup = () => {
        const renderer = p5.createCanvas(w, h, canvasEl);
        p5.background(0, 0, 0);
        this.genAttractor(p5);
        this.genParticles(p5);
      }
      p5.draw = () => this.draw(p5);
    }
    this.P5instance = new P5(sketch);
  }

  override destroyP5Env() {
    this.P5instance.remove();
    this.particles = [];
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
      this.clear();
    }

    this.particles.forEach(particle => {
      const F = particle.getGravityByAttractor(this.attractor);
      particle.applyForce(F);
      particle.update();
      particle.render();
    })

    if (this.isShowAttractor) {
      this.attractor.update();
      this.attractor.render();
    }
  }

  clear() {
    this.p5.background(0);
  }

  toggleTail() {
    this.isShowTail = !this.isShowTail;
  }

  setGravity(g: number) {
    this.attractor.G = g;
  }

  setParticleStyle(type: GravityParticleStyle) {
    this.gravityParticleStyle = type;
    this.particles.forEach(particle => {
      particle.particleStyle = type;
    })
  }

  toggleRotation(flag: boolean) {
    this.gravityParticleRotate = flag;
    this.particles.forEach(particle => particle.isRotate = flag);
  }

  toggleAttractor() {
    this.isShowAttractor = !this.isShowAttractor;
  }

  setParticleCount(count: number) {
    this.clear();
    this.count = count;
    this.particles = [];

    this.genParticles(this.p5);

    // TODO bad assigment
    this.setParticleStyle(this.gravityParticleStyle);
    this.setColor(this.gravityParticleColor);
    this.toggleRotation(this.gravityParticleRotate);
  }

  setColor(color: string) {
    this.gravityParticleColor = color;
    this.particles.forEach(particle => particle.color = color);
  }
}
