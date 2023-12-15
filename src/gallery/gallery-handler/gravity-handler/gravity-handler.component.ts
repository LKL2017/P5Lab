import { Component } from '@angular/core';
import {ParticleGravityService} from "../../../services/particle-gravity.service";

@Component({
  selector: 'app-gravity-handler',
  templateUrl: './gravity-handler.component.html',
  styleUrl: './gravity-handler.component.scss',
  providers: [ParticleGravityService]
})
export class GravityHandlerComponent {
  constructor(private particleGravityService: ParticleGravityService) {
  }
}
