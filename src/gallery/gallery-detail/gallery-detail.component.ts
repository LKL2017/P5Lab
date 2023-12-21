import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ParticleFactory} from "../../di/particle-factory";
import {ParticleService} from "../../services/particle.service";
import {GravityHandlerComponent} from "../gallery-handler/gravity-handler/gravity-handler.component";
import {HarmonicHandlerComponent} from "../gallery-handler/harmonic-handler/harmonic-handler.component";
import {ImageHandlerComponent} from "../gallery-handler/image-handler/image-handler.component";

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrl: './gallery-detail.component.scss',
  providers: [
    { provide: ParticleService, useFactory: ParticleFactory, deps: [ActivatedRoute] },
  ]
})
export class GalleryDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef;

  constructor(protected particleService: ParticleService,
              private router: Router,
              private route: ActivatedRoute
              ) {
  }

  ngAfterViewInit() {
    const canvasEl = this.canvasRef.nativeElement;
    this.particleService.initP5Env(800, 600, canvasEl);
  }

  ngOnDestroy() {
    this.particleService.destroyP5Env();
  }

  toGalleryHome() {
   this.router.navigate(['gallery/home'])
  }

  // @ts-ignore
  getHandlerComponent() {
    let type = '';
    this.route.params.subscribe(params => {
      type = params['type']
    });
    switch (type) {
      case 'harmonic':
        return HarmonicHandlerComponent;
      case 'gravity':
        return GravityHandlerComponent;
      case 'pixel':
        return ImageHandlerComponent;
      default:
        return null;
    }
  }
}
