import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: 'gallery' },
  { path: 'gallery', loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryModule)},
];
