import {Component, Input} from '@angular/core';
import {GravityParticleStyle, ParticleGravityService} from "@services/particle-gravity.service";

@Component({
  selector: 'app-gravity-handler',
  templateUrl: './gravity-handler.component.html',
  styleUrl: './gravity-handler.component.scss',
  providers: [ParticleGravityService]
})
export class GravityHandlerComponent {
  @Input() particleService: ParticleGravityService;

  gravityMin = 10;
  gravityMax = 200;
  gravity: number = 60;

  isShowTail = false;
  isShowAttractor = true;

  particleStyle: GravityParticleStyle = "circle";
  isRotate = false;
  particleCount = 1;

  currentColor = '#42e8cf';

  constructor() {
  }

  toggleTail() {
    this.particleService.toggleTail();
  }

  toggleAttractor() {
    this.particleService.toggleAttractor();
  }

  setGravity() {
    this.particleService.setGravity(this.gravity);
  }

  setParticleStyle() {
    this.particleService.setParticleStyle(this.particleStyle);
  }

  toggleRotation() {
    this.particleService.toggleRotation(this.isRotate);
  }

  particleCountDisplay(value: number): string {
    return value.toString();
  }

  setParticleCount() {
    this.particleService.setParticleCount(this.particleCount);
  }

  setColor() {
    this.particleService.setColor(this.currentColor);
  }
}
