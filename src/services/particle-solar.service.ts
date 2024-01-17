import { Injectable } from '@angular/core';
import {ParticleService} from "@services/particle.service";
import P5 from "p5";

const maxMoonLevel = 3;
const texturePaths = [
  'assets/texture/earthmap1k.jpg',
  'assets/texture/jupitermap.jpg',
  'assets/texture/mars_1k_color.jpg',
  'assets/texture/mercurymap.jpg',
  'assets/texture/venusmap.jpg',
]

class Planet {
  p5: P5;
  distance: number;
  radius: number;
  pos: P5.Vector; // relative to its parent origin
  instance: P5;
  children: Planet[];

  axis = P5.Vector.random3D();

  texture: P5.Image;

  constructor(p5: P5, d: number, r: number, texture: P5.Image) {
    this.p5 = p5;
    this.distance = d;
    this.radius = r;
    this.pos = P5.Vector.random3D().mult(d);
    this.texture = texture;
  }

  spawnMoons(count: number, level: number, fn: () => P5.Image) {
    this.children = [];
    for (let i = 0; i < count; i++) {
      const r = this.radius / ((level + 1) * 0.8);
      const d = this.p5.random(this.radius + r, (this.radius + r) * 2.5);
      const planet = new Planet(this.p5, d, r, fn());
      planet.axis = planet.pos.cross(P5.Vector.random3D());
      this.children.push(planet);
      if (level < maxMoonLevel) {
        planet.spawnMoons(count, level + 1, fn);
      }
    }
  }

  orbit(angle: number) {
    this.p5.push();
    this.p5.fill(200,0, 200);
    this.p5.translate(this.pos);
    this.p5.rotate(angle, this.axis);
    this.p5.texture(this.texture);
    this.p5.sphere(this.radius);

    if (this.children) {
      this.children.forEach(planet => {
        planet.orbit(angle);
      })
    }
    this.p5.pop();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ParticleSolarService extends ParticleService<WebGLRenderingContext>{
  p5: P5;
  sun: Planet;

  angleV = 1;
  angleA = 0.01;

  sunTexture: P5.Image;
  texturesArr: P5.Image[];

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      this.p5 = p5;

      p5.preload = () => {
        this.sunTexture = p5.loadImage('assets/texture/sunmap.jpg');
        this.texturesArr = texturePaths.map(path => p5.loadImage(path));
      }

      p5.setup = () => {
        p5.createCanvas(w, h, p5.WEBGL, canvasEl);

        this.sun = new Planet(p5, 0, 100, this.sunTexture);
        const genTextureFn = () => {
          return this.texturesArr[Math.floor(Math.random() * this.texturesArr.length)];
        }
        this.sun.spawnMoons(2, 1, genTextureFn);
      }
      p5.draw = () => this.draw(p5);
    }

    this.P5instance = new P5(sketch);
  }

  override destroyP5Env() {
    this.P5instance.remove();
  }

  draw(p5: P5) {
    p5.background('black');
    p5.noStroke();
    p5.lights();
    this.sun.orbit(this.angleV);
    this.angleV += this.angleA;
  }
}
