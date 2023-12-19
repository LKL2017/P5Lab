import {Component, Input} from '@angular/core';
import {ParticleImageService} from "../../../services/particle-image.service";

@Component({
  selector: 'app-image-handler',
  templateUrl: './image-handler.component.html',
  styleUrl: './image-handler.component.scss'
})
export class ImageHandlerComponent {
  @Input() particleService: ParticleImageService

  constructor() {
  }

}
