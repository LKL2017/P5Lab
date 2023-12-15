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
}
