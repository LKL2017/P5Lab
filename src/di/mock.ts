import {InjectionToken} from "@angular/core";

export interface Artifact {
  id: number;
  title: string;
  description?: string;
  // preview: string;
}

export const ArtifactToken = new InjectionToken<Artifact[]>('gallery-list');

export const MOCK_ARTIFACTS: Artifact[] = [
  {id: 1, title: 'Harmonic Motion'},
  {id: 2, title: 'Gravity'},
  {id: 3, title: 'Dancing Pixels'}
]
