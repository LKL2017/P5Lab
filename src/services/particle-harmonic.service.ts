import { Injectable } from '@angular/core';
import P5 from "p5";
import {_P5Particle, ParticleService} from "./particle.service";

export type HarmonicParticleStyle = 'circle' | 'rect';

class HarmonicParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel = new P5.Vector(0, 0);
  acc = new P5.Vector(0, 0);
  d: number;
  angle: number;
  angleV = 0;
  particleStyle: HarmonicParticleStyle = 'circle';

  //multi waves
  isComposite = false;
  pos2: P5.Vector;

  get crest(): number {
    return this.p5.height * 0.45;
  }

  get trough(): number {
    return this.p5.height * 0.15;
  }

  get crest2(): number {
    return this.p5.height * 0.85;
  }

  get trough2(): number {
    return this.p5.height * 0.55;
  }

  constructor(p5Context: P5, x: number, y: number, d: number, angle: number) {
    this.p5 = p5Context;
    this.pos = new P5.Vector(x, y);
    this.pos2 = new P5.Vector(x, y);
    this.d = d;
    this.angle = angle;
  }

  update() {
    this.pos.y = this.p5.map(Math.sin(this.angle + this.angleV), -1, 1, this.trough, this.crest);
    this.pos2.y = this.p5.map(Math.cos(2 * this.angle + 2 * this.angleV), -1, 1, this.trough2, this.crest2);
    this.angleV += 0.02;
  }

  render() {
    if (this.isComposite) {
      const sumY = this.p5.map(this.pos.y + this.pos2.y, this.trough + this.trough2, this.crest + this.crest2, this.p5.height * 0.2, this.p5.height * 0.8);
      if (this.particleStyle === 'circle') {
        this.p5.circle(this.pos.x, sumY, this.d);
      } else {
        this.p5.rect(this.pos.x - this.d / 2, sumY - this.d / 2, this.d, this.d);
      }
    } else {
      if (this.particleStyle === 'circle') {
        this.p5.circle(this.pos.x, this.pos.y, this.d);
        this.p5.circle(this.pos2.x, this.pos2.y, this.d);
      } else {
        this.p5.rect(this.pos.x - this.d / 2, this.pos.y - this.d / 2, this.d, this.d);
        this.p5.rect(this.pos2.x - this.d / 2, this.pos2.y - this.d / 2, this.d, this.d);
      }
    }
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
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.setup = () => {
        p5.createCanvas(w, h, canvasEl);
        p5.background(0, 0, 0);
        this.genAngles();
        this.genParticles(p5);
        this.setupParticles(p5);
      }
      p5.draw = () => this.draw(p5);
    }
    this.P5instance = new P5(sketch);
  }

  override destroyP5Env() {
    this.P5instance.remove();
    this.angles = [];
    this.particles = [];
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
    p5.background(0, 0, 0);

    this.particles.forEach(particle => {
      particle.update();
      particle.render();
    });
  }

  toggleComposite() {
    this.particles.forEach(p => p.isComposite = !p.isComposite)
  }

  setParticleStyle(style: HarmonicParticleStyle) {
    this.particles.forEach(p => p.particleStyle = style || 'circle')
  }
}
