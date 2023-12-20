import { Injectable } from '@angular/core';
import {_P5Particle, ParticleService} from "./particle.service";
import P5 from 'p5';

class ImageParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  color: string;
  size: number;

  originalPos: P5.Vector;

  constructor(p5: P5, x: number, y: number, color: string, size: number) {
    this.p5 = p5;
    this.pos = new P5.Vector(x, y);
    this.color = color;
    this.size = size;
  }

  update() {
    this.p5.fill(this.color);
  }

  render() {
    this.p5.rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}

@Injectable()
export class ParticleImageService extends ParticleService {
  particles: ImageParticle[] = [];
  pixels: number[];
  gap = 4;

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.context = canvasEl.getContext('2d');
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.setup = () => {
        p5.createCanvas(w, h, canvasEl);
        p5.loadImage('assets/images/6.png', img => {
          p5.image(img, (w - img.width) / 2, (h - img.height) / 2);
          p5.loadPixels();
          this.pixels = p5.pixels;

          this.genParticles(p5, this.pixels);
        })
      }

      p5.draw = () => this.draw(p5)
    }

    this.P5instance = new P5(sketch);
  }

  override destroyP5Env() {
    this.P5instance.remove();
    this.particles = [];
    this.pixels = [];
  }

  genParticles(p5: P5, pixels: number[]) {
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const alpha = pixels[index + 3];
        // TODO: change here to filter
        if (r + g + b > 255) {
          this.particles.push(new ImageParticle(p5, x, y, `rgb(${r}, ${g}, ${b})`, this.gap))
        }
      }
    }
  }

  draw(p5: P5) {
    p5.background(0);
    this.particles.forEach(particle => {
      particle.update();
      particle.render();
    })
  }
}
