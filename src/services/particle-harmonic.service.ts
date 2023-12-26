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
  angleA = 0.02;
  particleStyle: HarmonicParticleStyle = 'circle';
  amplitudeRotation: number = 0;

  //multi waves
  pos2: P5.Vector;
  compositePos: P5.Vector;

  get base():number {
    return this.p5.height * 0.3;
  }
  get base2():number {
    return this.p5.height * 0.7;
  }
  get amplitude():number {
    return this.p5.height * 0.15;
  }

  amplitudeVec = new P5.Vector(0, 0);
  amplitudeVec2 = new P5.Vector(0, 0);
  compositeAmplitudeVec = new P5.Vector(0, 0);

  constructor(p5Context: P5, x: number, y: number, d: number, angle: number) {
    this.p5 = p5Context;
    this.pos = new P5.Vector(x, this.base);
    this.pos2 = new P5.Vector(x, this.base2);
    this.compositePos = new P5.Vector(x, y);
    this.d = d;
    this.angle = angle;
  }

  update() {
    const phase = this.angle + this.angleV;
    this.amplitudeVec.y = Math.sin(phase) * this.amplitude;
    this.amplitudeVec2.y = Math.cos(2 * phase) * this.amplitude;
    this.compositeAmplitudeVec.y = this.amplitudeVec.y + this.amplitudeVec2.y;

    this.angleV += this.angleA;
  }

  render() {
    const rotateVec = this.amplitudeVec.copy().rotate(this.amplitudeRotation);
    const rotateVec2 = this.amplitudeVec2.copy().rotate(this.amplitudeRotation);

    const outputPos = P5.Vector.add(this.pos, rotateVec);
    const outputPos2 = P5.Vector.add(this.pos2, rotateVec2);


    if (this.particleStyle === 'circle') {
      this.p5.circle(outputPos.x, outputPos.y, this.d);
      this.p5.circle(outputPos2.x, outputPos2.y, this.d);
    } else {
      this.p5.rect(outputPos.x - this.d / 2, outputPos.y - this.d / 2, this.d, this.d);
      this.p5.rect(outputPos2.x - this.d / 2, outputPos2.y - this.d / 2, this.d, this.d);
    }
  }

  renderComposite() {
    const rotateVec = this.compositeAmplitudeVec.copy().rotate(this.amplitudeRotation);
    const outputPos = P5.Vector.add(this.compositePos, rotateVec);

    if (this.particleStyle === 'circle') {
      this.p5.circle(outputPos.x, outputPos.y, this.d);
    } else {
      this.p5.rect(outputPos.x - this.d / 2, outputPos.y - this.d / 2, this.d, this.d);
    }
  }

}

@Injectable()
export class ParticleHarmonicService extends ParticleService {
  count = 60;
  particles: HarmonicParticle[] = [];
  angles: number[] = [];

  isComposite: boolean = false;

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

    if (this.isComposite) {
      this.particles.forEach(particle => {
        particle.update();
        particle.renderComposite();
      });
    } else {
      this.particles.forEach(particle => {
        particle.update();
        particle.render();
      });
    }

  }

  toggleComposite() {
    this.isComposite = !this.isComposite;
  }

  setParticleStyle(style: HarmonicParticleStyle) {
    this.particles.forEach(p => p.particleStyle = style || 'circle')
  }

  setAmplitudeRotation(angle: number) {
    this.particles.forEach(p => p.amplitudeRotation = angle)
  }
}
