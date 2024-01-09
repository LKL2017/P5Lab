import { Injectable } from '@angular/core';
import P5 from "p5";
import {genRandomLinearGradient} from "@util/graphic";
import {_P5Particle, ParticleService} from "./particle.service";

export type HarmonicParticleStyle = 'circle' | 'rect' | 'toMouse' | 'pulse';

class HarmonicParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel = new P5.Vector(0, 0);
  acc = new P5.Vector(0, 0);
  color: string = '#56d997';
  d: number;
  angle: number;
  angleV = 0;
  angleA = 0.02;
  particleStyle: HarmonicParticleStyle = 'circle';
  amplitudeRotation: number = 0;
  amplitudeSize: number = 0.15;

  //multi waves
  pos2: P5.Vector;
  frequency = 1; // only apply to wave2
  compositePos: P5.Vector;

  get base():number {
    return this.p5.height * 0.3;
  }
  get base2():number {
    return this.p5.height * 0.7;
  }
  get amplitude():number {
    return this.p5.height * this.amplitudeSize;
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
    this.p5.stroke(this.color);
    this.p5.fill(this.color);

    const phase = this.angle + this.angleV;
    this.amplitudeVec.y = Math.sin(phase) * this.amplitude;
    this.amplitudeVec2.y = Math.cos(phase * this.frequency) * this.amplitude;
    this.compositeAmplitudeVec.y = this.amplitudeVec.y + this.amplitudeVec2.y;

    this.angleV += this.angleA;
  }

  render() {
    const rotateVec = this.amplitudeVec.copy().rotate(this.amplitudeRotation);
    const rotateVec2 = this.amplitudeVec2.copy().rotate(this.amplitudeRotation);

    const outputPos = P5.Vector.add(this.pos, rotateVec);
    const outputPos2 = P5.Vector.add(this.pos2, rotateVec2);


    switch (this.particleStyle) {
      case "rect":
        this.p5.rect(outputPos.x, outputPos.y, this.d, this.d);
        this.p5.rect(outputPos2.x, outputPos2.y, this.d, this.d);
        break;
      case "pulse":
        this.p5.line(this.pos.x, this.pos.y, outputPos.x, outputPos.y);
        this.p5.line(this.pos2.x, this.pos2.y, outputPos2.x, outputPos2.y);
        break;
      case "circle":
      default:
        this.p5.circle(outputPos.x, outputPos.y, this.d);
        this.p5.circle(outputPos2.x, outputPos2.y, this.d);
    }
  }

  renderComposite() {
    const rotateVec = this.compositeAmplitudeVec.copy().rotate(this.amplitudeRotation);
    const outputPos = P5.Vector.add(this.compositePos, rotateVec);

    switch (this.particleStyle) {
      case "rect":
        this.p5.rect(outputPos.x, outputPos.y, this.d, this.d);
        break;
      case "toMouse":
        this.p5.line(outputPos.x, outputPos.y, this.p5.mouseX, this.p5.mouseY);
        break;
      case "pulse":
        this.p5.line(this.compositePos.x, this.compositePos.y, outputPos.x, outputPos.y);
        break;
      case "circle":
      default:
        this.p5.circle(outputPos.x, outputPos.y, this.d);
    }
  }

}

@Injectable()
export class ParticleHarmonicService extends ParticleService {
  p5: P5;
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
        this.p5 = p5;
        p5.createCanvas(w, h, canvasEl);
        p5.background(0, 0, 0);
        p5.rectMode(p5.CENTER);
        this.genAngles();
        this.genParticles(p5);
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

  setAmplitudeSize(size: number) {
    this.particles.forEach(p => p.amplitudeSize = size)
  }

  setFrequencyForSecondWave(f: number) {
    this.particles.forEach(p => p.frequency = f)
  }

  setColor(color: string) {
    this.particles.forEach(p => p.color = color)
  }

  setRandomGradient() {
    const g = genRandomLinearGradient(this.p5.drawingContext, 0, 0, this.width, this.height)
    this.p5.drawingContext.fillStyle = g
    this.p5.drawingContext.strokeStyle = g;
  }
}
