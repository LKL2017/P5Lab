import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {GalleryDetailComponent} from "./gallery-detail/gallery-detail.component";
import {GalleryHomeComponent} from "./gallery-home/gallery-home.component";

import { GalleryRoutingModule } from './gallery-routing.module';
import { HarmonicHandlerComponent } from './gallery-handler/harmonic-handler/harmonic-handler.component';
import { GravityHandlerComponent } from './gallery-handler/gravity-handler/gravity-handler.component';
import { ImageHandlerComponent } from './gallery-handler/image-handler/image-handler.component';


@NgModule({
  declarations: [
    GalleryHomeComponent,
    GalleryDetailComponent,
    HarmonicHandlerComponent,
    GravityHandlerComponent,
    ImageHandlerComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatRadioModule,
    MatSliderModule
  ]
})
export class GalleryModule { }
