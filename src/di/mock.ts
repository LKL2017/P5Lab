import {InjectionToken} from "@angular/core";

export interface Artifact {
  type: 'harmonic' | 'gravity' | 'pixel' | 'raining' | 'possibility';
  title?: string;
  description?: string;
  preview?: string;
}

export const ArtifactToken = new InjectionToken<Artifact[]>('gallery-list');

export const MOCK_ARTIFACTS: Artifact[] = [
  {type: 'harmonic', title: 'Harmonic Motion', preview: 'assets/images/harmonic-preview.png'},
  {type: 'gravity', title: 'Gravity', preview: 'assets/images/gravity-preview.png'},
  {type: 'pixel', title: 'Pixels', preview: 'assets/images/image-preview.png'},
  {type: 'raining', title: 'Raining', preview: 'assets/images/raining-preview.png'},
  {type: 'possibility', title: 'Keep Exploring...' },
]
