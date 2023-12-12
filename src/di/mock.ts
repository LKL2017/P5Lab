import {InjectionToken} from "@angular/core";

export interface Artifact {
  type: 'harmonic' | 'gravity' | 'dancing'
  title: string;
  description?: string;
  // preview: string;
}

export const ArtifactToken = new InjectionToken<Artifact[]>('gallery-list');

export const MOCK_ARTIFACTS: Artifact[] = [
  {type: 'harmonic', title: 'Harmonic Motion'},
  {type: 'gravity', title: 'Gravity'},
  {type: 'dancing', title: 'Dancing Pixels'}
]
