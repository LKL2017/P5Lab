import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class GalleryDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;

  constructor(private particleService: ParticleService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvasEl = this.canvasRef.nativeElement;
    this.particleService.initP5Env(600, 400, canvasEl);
  }

}
