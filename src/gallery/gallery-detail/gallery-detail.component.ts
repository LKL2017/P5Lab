import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ParticleFactory} from "../../di/particle-factory";
import {ParticleService} from "../../services/particle.service";

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrl: './gallery-detail.component.scss',
  providers: [
    { provide: ParticleService, useFactory: ParticleFactory, deps: [ActivatedRoute] }
  ]
})
export class GalleryDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;

  constructor(private particleService: ParticleService,
              private router: Router) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvasEl = this.canvasRef.nativeElement;
    this.particleService.initP5Env(800, 600, canvasEl);
  }

  toGalleryHome() {
   this.router.navigate(['gallery/home'])
  }
}
