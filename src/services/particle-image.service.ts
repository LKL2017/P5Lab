import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {_P5Particle, ParticleService} from "./particle.service";
import P5 from 'p5';

export type ImageParticleStyle = 'square' | 'circle' | 'ascii';
interface ImageParticleModel {
  color: string,
  x: number,
  y: number,
  size: number
}

const asciiStrings = ['@', '#', '$', '%', '&', '*', '+', '-'];

class ImageParticle implements _P5Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  color: string;
  size: number;

  originalPos: P5.Vector;
  particleStyle: ImageParticleStyle = 'square';

  get textSize(): number {
    return Math.floor(this.size * 1.2);
  }

  constructor(p5: P5, x: number, y: number, color: string, size: number) {
    this.p5 = p5;
    this.pos = new P5.Vector(x, y);
    this.originalPos = this.pos.copy();
    this.color = color;
    this.size = size;
  }

  update() {
    this.p5.fill(this.color);
    this.p5.textSize(this.textSize);
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP);
  }

  render() {
    if (this.particleStyle === 'circle') {
      this.p5.circle(this.pos.x + this.size / 2, this.pos.y + this.size / 2, this.size);
    } else if (this.particleStyle === 'ascii') {
      const str = asciiStrings[Math.floor(Math.random() * asciiStrings.length)];
      this.p5.text(str, this.pos.x, this.pos.y);
    } else {
      // default: rect
      this.p5.rect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
}

@Injectable()
export class ParticleImageService extends ParticleService {
  p5: P5;
  models: ImageParticleModel[][] = [];
  particles: ImageParticle[] = [];
  pixels: number[];
  gap = 4;
  particleStyle: ImageParticleStyle = 'square';

  drawOnce$ = new Subject<void>();
  drawOnceOb = this.drawOnce$.asObservable();

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.context = canvasEl.getContext('2d');
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.draw = () => this.draw(p5);

      p5.setup = () => {
        this.p5 = p5;

        p5.createCanvas(w, h, canvasEl);
        p5.pixelDensity(1);
        p5.loadImage('assets/images/6.png', img => {
          p5.image(img, (w - img.width) / 2, (h - img.height) / 2);
          p5.loadPixels();
          this.pixels = p5.pixels;
          this.models = this.genModels(this.pixels);
          this.particles = this.genParticles(this.models, p5);
          // call once when image loaded
          p5.draw();
        })
        p5.noLoop();
      }

      this.drawOnceOb.subscribe(_ => {
        p5.redraw();
      })

    }

    this.P5instance = new P5(sketch);
  }

  override destroyP5Env() {
    this.P5instance.remove();
    this.particles = [];
    this.pixels = [];

    this.drawOnce$.complete();
  }

  genModels(
    pixels: number[],
    filterFn = (r: number, g: number, b: number) => r + g + b > 255
  ) {
    const output: ImageParticleModel[][] = [];
    for (let y = 0; y < this.height; y += this.gap) {
      const row = [];
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const alpha = pixels[index + 3];
        // TODO: change here to filter
        if (filterFn(r, g, b)) {
          row.push({
            x,
            y,
            color: `rgb(${r}, ${g}, ${b})`,
            size: this.gap
          })
        }
      }
      output.push(row);
    }
    return output;
  }

  genParticles(models: ImageParticleModel[][], p5: P5): ImageParticle[] {
    const particles = [];
    for (let rows of models) {
      for (let item of rows) {
        particles.push(new ImageParticle(p5, item.x, item.y, item.color, item.size));
      }
    }
    return particles;
  }

  draw(p5: P5) {
    p5.background(0);
    this.particles.forEach(particle => {
      particle.update();
      particle.render();
    });
  }

  setParticleStyle(type: ImageParticleStyle) {
    this.particleStyle = type;
    this.particles.forEach(particle => particle.particleStyle = type);
    this.drawOnce$.next();
  }

  setParticleSize(size: number) {
    this.gap = size;
    this.models = this.genModels(this.pixels);
    this.particles = this.genParticles(this.models, this.p5);
    // cause the particles were re-constructed
    this.setParticleStyle(this.particleStyle);
  }
}
