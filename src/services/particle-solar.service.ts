import { Injectable } from '@angular/core';
import {ParticleService} from "@services/particle.service";
import P5 from "p5";

const maxMoonCount = 2;
const maxMoonLevel = 2;

class Planet {
  p5: P5;
  distance: number;
  radius: number;
  pos: P5.Vector;
  instance: P5;
  children: Planet[];

  axis = P5.Vector.random3D();

  constructor(p5: P5, d: number, r: number) {
    this.p5 = p5;
    this.distance = d;
    this.radius = r;
    this.pos = P5.Vector.random3D().mult(d);
  }

  spawnMoons(count: number, level: number) {
    this.children = [];
    for (let i = 0; i < count; i++) {
      const r = this.radius / 2;
      const d = this.distance + this.radius + r;
      const planet = new Planet(this.p5, d, r);
      planet.axis = P5.Vector.sub(planet.pos, this.pos).cross(P5.Vector.random3D());
      this.children.push(planet);
      if (level < 2) {
        planet.spawnMoons(count, level + 1);
      }
    }
  }

  orbit(angle: number) {
    this.p5.fill(200,0, 200);
    this.p5.push();
    this.p5.translate(this.pos);
    const sphere = this.p5.sphere(this.radius);
    sphere.rotate(angle, new P5.Vector(1, 0, 0));
    this.p5.pop();

    if (this.children) {
      this.children.forEach(planet => {
        planet.orbit(angle);
      })
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ParticleSolarService extends ParticleService<WebGLRenderingContext>{
  p5: P5;
  sun: Planet;

  angleV = 1;
  angleA = 0.2;

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      this.p5 = p5;
      p5.setup = () => {
        p5.createCanvas(w, h, p5.WEBGL, canvasEl);

        this.sun = new Planet(p5, 0, 100);
        this.sun.spawnMoons(1, 1);
      }
      p5.draw = () => this.draw(p5);
    }

    this.P5instance = new P5(sketch);
  }

  override destroyP5Env() {
    this.P5instance.remove();
  }

  draw(p5: P5) {
    p5.background('lightblue');
    this.sun.orbit(this.angleV);
    this.angleV += this.angleA;
  }
}
