import {Component, Input, OnInit} from '@angular/core';
import {HarmonicParticleStyle, ParticleHarmonicService} from "../../../services/particle-harmonic.service";

@Component({
  selector: 'app-harmonic-handler',
  templateUrl: './harmonic-handler.component.html',
  styleUrl: './harmonic-handler.component.scss',
})
export class HarmonicHandlerComponent implements OnInit{
  // use the output service from factory
  @Input() particleService: ParticleHarmonicService;

  isComposite = false;
  particleStyle: HarmonicParticleStyle = "circle";
  amplitudeRotation: number = 0;

  // not fr strict calculation
  approachPI = 3.14

  constructor() {
  }

  ngOnInit() {
  }

  toggleComposite() {
    this.particleService.toggleComposite();
  }

  setParticleParticle(style: HarmonicParticleStyle) {
    this.particleService.setParticleStyle(style);
  }

  setAmplitudeRotation(angle: number) {
    this.particleService.setAmplitudeRotation(angle);
  }

  formatRotation(value: number) {
    // TODO here [this] is pointing to the mat-slider, is it a feature?
    return value / 3.14 + 'PI';
  }
}
