import { Injectable } from '@angular/core';
import P5 from "p5";
import {_P5Particle, ParticleService} from "./particle.service";

class HarmonicParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel = new P5.Vector(0, 0);
  acc = new P5.Vector(0, 0);
  d: number;
  angle: number;
  angleV = 0;

  constructor(p5Context: P5, x: number, y: number, d: number, angle: number) {
    this.p5 = p5Context;
    this.pos = new P5.Vector(x, y);
    this.d = d;
    this.angle = angle;
  }

  update() {
    const y = this.p5.map(Math.sin(this.angle + this.angleV), -1, 1, 100, 200);
    this.pos.y = y;
    this.angleV += 0.02;
  }

  render() {
    this.p5.circle(this.pos.x, this.pos.y, this.d);
  }
}

@Injectable()
export class ParticleHarmonicService extends ParticleService {
  count = 60;
  particles: HarmonicParticle[] = [];
  angles: number[] = [];

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    console.log('init P5 Env')
    this.context = canvasEl.getContext('2d');
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.setup = () => {
        p5.createCanvas(w, h, canvasEl);
        p5.background(255, 255, 0);
        this.genAngles();
        this.genParticles(p5);
        this.setupParticles(p5);
      }
      p5.draw = () => this.draw(p5);
    }
    new P5(sketch);
  }

  genParticles(p5: P5) {
    const d = this.width / (this.count + 1);
    const y = this.height / 2;
    for(let i = 0; i < this.count; i++) {
      const x = d * (i + 1);
      this.particles.push(new HarmonicParticle(p5, x, y, d, this.angles[i]));
    }
  }

  genAngles() {
    const gap = 15;
    for(let i = 0; i < this.count; i++) {
      this.angles.push(Math.PI / 180 * gap * i);
    }
  }


  setupParticles(p5: P5) {
    p5.fill('lightgreen');
  }

  draw(p5: P5) {
    // clear
    p5.background(255, 255, 0);

    // update pos
    this.particles.forEach(particle => particle.update());

    // render
    this.particles.forEach(particle => particle.render());
  }
}
