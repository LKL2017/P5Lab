import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {GalleryDetailComponent} from "./gallery-detail/gallery-detail.component";
import {GalleryHomeComponent} from "./gallery-home/gallery-home.component";

import { GalleryRoutingModule } from './gallery-routing.module';


@NgModule({
  declarations: [GalleryHomeComponent, GalleryDetailComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    MatCardModule
  ]
})
export class GalleryModule { }
