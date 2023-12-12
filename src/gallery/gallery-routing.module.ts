import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GalleryDetailComponent} from "./gallery-detail/gallery-detail.component";
import {GalleryHomeComponent} from "./gallery-home/gallery-home.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'home'},
  {path: 'home', component: GalleryHomeComponent},
  {path: 'detail/:type', component: GalleryDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
