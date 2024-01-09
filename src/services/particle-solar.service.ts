import { Injectable } from '@angular/core';
import {ParticleService} from "@services/particle.service";
import P5 from "p5";
import {filter} from "rxjs";

class Planet {
  p5: P5;
  position: P5.Vector;
  radius: number;
  distance: number;

  moons: Planet[];

  constructor(p5: P5, pos: P5.Vector, r: number, d: number) {
    this.p5 = p5;
    this.position = pos;
    this.radius = r;
    this.distance = d;
    this.moons = [];
  }

  spawnMoons(count: number, level: number) {
    for (let i = 0; i < count; i++) {
      const r = this.radius / 2;
      const d = this.radius + r;

      const position = P5.Vector.add(this.position, P5.Vector.random3D().mult(d));
      const moon = new Planet(this.p5, position, r, d);
      this.moons.push(moon);
      if (level < 2) {
        moon.spawnMoons(count, level + 1);
      }
    }
  }

  show() {
    console.log('show invoked')
    this.p5.push();
    this.p5.translate(this.position);
    this.p5.sphere(this.radius);
    this.moons.forEach(moon => {
      moon.show();
    })
    this.p5.pop();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ParticleSolarService extends ParticleService<WebGL2RenderingContext>{
  sun: Planet;

  constructor() {
    super();
  }

  override initP5Env(w: number, h: number, canvasEl: HTMLCanvasElement) {
    this.width = w;
    this.height = h;

    const sketch = (p5: P5) => {
      p5.setup = () => {
        p5.createCanvas(w, h, p5.WEBGL, canvasEl);
        this.sun = new Planet(
          p5,
          p5.createVector(0, 0, 0),
          100,
          0
        )
        this.sun.spawnMoons(1, 1);
        console.log(this.sun)
        p5.fill(0, 255, 255);
        p5.noLoop();
      }
      p5.draw = () => this.draw(p5);
    }

    this.P5instance = new P5(sketch)
  }

  override destroyP5Env() {
    this.P5instance.remove();
  }

  draw(p5: P5) {
    p5.background(205, 102, 94);
    this.sun.show();
  }

}
