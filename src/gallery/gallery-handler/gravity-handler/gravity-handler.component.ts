import {Component, Input} from '@angular/core';
import {ParticleGravityService} from "../../../services/particle-gravity.service";

@Component({
  selector: 'app-gravity-handler',
  templateUrl: './gravity-handler.component.html',
  styleUrl: './gravity-handler.component.scss',
  providers: [ParticleGravityService]
})
export class GravityHandlerComponent {
  @Input() particleService: ParticleGravityService;

  isShowTail = false;

  constructor() {
  }

  toggleTail() {
    this.particleService.toggleTail();
  }
}
