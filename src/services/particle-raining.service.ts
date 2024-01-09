import { Injectable } from '@angular/core';
import P5 from "p5";
import {calcRelativeBrightness} from "@util/graphic";
import {_P5Particle, ParticleService} from "./particle.service";

interface RainingParticleModel {
  color: number[];
  x: number;
  y: number;
  brightness: number;
}

class RainingParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc = new P5.Vector(0, 0);
  models: RainingParticleModel[][];
  size: number;

  constructor(p5: P5, models: RainingParticleModel[][]) {
    this.p5 = p5;
    this.models = models;
    this.pos = new P5.Vector(this.p5.random(this.p5.width), 0);
    this.vel = new P5.Vector(0, 0);
    this.size = this.p5.random(2) + 3;
  }

  update() {
    const ceil: RainingParticleModel = this.models[Math.floor(this.pos.y)][Math.floor(this.pos.x)];
    this.p5.fill(ceil.color);
    this.vel.y = 4 - ceil.brightness // max brightness is 2.55
    this.pos.add(this.vel);
    if (this.pos.y >= this.p5.height) {
      this.pos.x = this.p5.random(this.p5.width);
      this.pos.y = 0;
    }
  }

  render() {
    // this.p5.circle(this.pos.x, this.pos.y, this.size);
    // this.p5.rect(this.pos.x, this.pos.y, this.size, 30);
    this.p5.arc(this.pos.x, this.pos.y, this.size, this.size, 0, Math.PI);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ParticleRainingService extends ParticleService<CanvasRenderingContext2D>{
  count = 800;
  particles: RainingParticle[] = [];
  pixels: number[];
  models: RainingParticleModel[][] = [];

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.setup = () => {
        p5.createCanvas(w, h, canvasEl);
        p5.pixelDensity(1);
        p5.loadImage('assets/images/wukong.jpeg', img => {
          p5.image(img, (w - img.width) / 2, (h - img.height) / 2);
          p5.filter(p5.DILATE);
          p5.loadPixels();
          this.pixels = p5.pixels;
          this.models = this.genModels(this.pixels);
          this.particles = this.genParticles(this.models, p5);
          p5.background(0);
        })

      }
      p5.draw = () => this.draw(p5);
    }
    this.P5instance = new P5(sketch);

  }

  override destroyP5Env() {
    this.P5instance.remove();
    this.particles = [];
  }

  genModels(pixels: number[]): RainingParticleModel[][] {
    const gap = 1; //fixed because we need see the image clearly
    const output: RainingParticleModel[][] = [];
    for (let y = 0; y < this.height; y += gap) {
      const row: RainingParticleModel[] = [];
      for (let x = 0; x < this.width; x += gap) {
        const index = (y * this.width + x) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const alpha = pixels[index + 3];

        // no filter
        row.push({
          x,
          y,
          color: [r, g, b],
          brightness: calcRelativeBrightness(r, g, b)
        })
      }
      output.push(row);
    }
    return output;
  }

  genParticles(models: RainingParticleModel[][], p5: P5): RainingParticle[] {
    return new Array(this.count).fill('').map(_ => {
      return new RainingParticle(p5, models);
    })
  }

  draw(p5: P5) {
    p5.background(10, 5);
    this.particles.forEach(particle => {
      particle.update();
      particle.render();
    })
  }

}
