import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  amplitudeSize = 0.15;
  frequency = 1// maybe px in this program
  currentColor = '#56d997';
  colorMode: 'pure' | 'gradient' = 'pure';

  // not strict calculation
  approachPI = 3.14

  constructor() {
  }

  ngOnInit() {
  }

  toggleComposite() {
    this.particleService.toggleComposite();

    if (!this.isComposite && this.particleStyle === 'toMouse') {
      this.particleStyle = 'circle';
      this.setParticleParticle(this.particleStyle);
    }
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

  setAmplitudeSize(size: number) {
    this.particleService.setAmplitudeSize(size);
  }

  formatAmplitudeSize(value: number) {
    return Math.round(value * 100) + '%';
  }

  setFrequencyForSecondWave(value: number) {
    this.particleService.setFrequencyForSecondWave(value);
  }

  formatFrequency(value: number) {
    return value.toString();
  }

  setColor() {
    this.particleService.setColor(this.currentColor);
  }

  setRandomGradient() {
    this.particleService.setRandomGradient();
  }

  onColorModeChange() {
    if (this.colorMode === 'pure') this.setColor();
    if (this.colorMode === 'gradient') this.setRandomGradient();
  }
}
