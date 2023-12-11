import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ParticleFactory} from "../../di/particle-factory";
import {EffectService} from "../../services/effect.service";
import {ParticleService} from "../../services/particle.service";

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrl: './gallery-detail.component.scss',
  providers: [
    { provide: ParticleService, useFactory: ParticleFactory, deps: [EffectService] }
  ]
})
export class GalleryDetailComponent implements OnInit {
  constructor(private effectService: EffectService,
              private particleService: ParticleService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.particleService.render();
  }

}
