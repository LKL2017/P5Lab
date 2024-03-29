import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Artifact, ArtifactToken, MOCK_ARTIFACTS} from "@di/mock";

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.scss',
  providers: [
    { provide: ArtifactToken, useValue: MOCK_ARTIFACTS }
  ]
})
export class GalleryHomeComponent {
  artifacts!: Artifact[]

  constructor(private router: Router, @Inject(ArtifactToken) list: Artifact[]) {
    this.artifacts = list;
  }

  toDetail(artifact: Artifact) {
    this.router.navigate(['gallery/detail', artifact.type]);
  }
}
