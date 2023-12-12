import { Injectable } from '@angular/core';
import P5 from "p5";
import {_P5Particle, ParticleService} from "./particle.service";

class HarmonicParticle implements _P5Particle {
  pos: P5.Vector;
  vel = new P5.Vector(0, 0);
  acc = new P5.Vector(0, 0);

  constructor(x: number, y: number) {
    this.pos = new P5.Vector(x, y);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }

  render() {

  }
}

@Injectable()
export class ParticleHarmonicService extends ParticleService {
  count = 100;
  particles: HarmonicParticle[] = [];

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
      }
      p5.draw = () => {
        this.draw(p5);
      }
    }
    new P5(sketch);
  }

  genParticles() {
    this.particles = new Array(this.count).fill('').map(_ => {
      return new HarmonicParticle(0, 0);
    })
  }

  setup(p5: P5) {
    console.log('[update] harmonic')
  }

  draw(p5: P5) {
    p5.stroke('red');
    p5.rect(10,10,20,20);
  }
}
