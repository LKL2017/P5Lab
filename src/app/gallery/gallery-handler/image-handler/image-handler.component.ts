import {Component, Input} from '@angular/core';
import {ImageParticlePattern, ImageParticleStyle, ParticleImageService} from "@services/particle-image.service";

@Component({
  selector: 'app-image-handler',
  templateUrl: './image-handler.component.html',
  styleUrl: './image-handler.component.scss'
})
export class ImageHandlerComponent {
  @Input() particleService: ParticleImageService

  particleStyle: ImageParticleStyle = 'square';
  particleSizeMin = 4;
  particleSizeMax = 12;
  particleSize = this.particleSizeMin;

  particleRenderPattern: ImageParticlePattern = 'fill';

  constructor() {
  }

  setParticleStyle(type: ImageParticleStyle) {
    this.particleService.setParticleStyle(type);
  }

  setParticleSize(size: number) {
    this.particleService.setParticleSize(size);
  }

  setParticleRenderPattern(pattern: ImageParticlePattern) {
    this.particleService.setParticleRenderPattern(pattern);
  }

}
