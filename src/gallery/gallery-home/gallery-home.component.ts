import { Component } from '@angular/core';

interface Artifact {
  title: string;
  description: string;
  // preview: string;
}

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.scss'
})
export class GalleryHomeComponent {
  artifacts: Artifact[] = new Array(10).fill('').map(_ => {
    return { title: 'Arc', description: 'Art of Pixels'}
  })

  constructor() {
  }
}
