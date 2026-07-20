import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DesignComponent } from './components/design/design.component';
import { PhotoComponent } from './components/photo/photo.component';
import { MotionComponent } from './components/motion/motion.component';
import { VectoberComponent } from './components/vectober/vectober.component';
import { LinksComponent } from './components/links/links.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'belphion' },
  { path: 'design', component: DesignComponent, title: 'Design | belphion' },
  { path: 'photo', component: PhotoComponent, title: 'Photo | belphion' },
  { path: 'motion', component: MotionComponent, title: 'Motion | belphion' },
  { path: 'vectober', component: VectoberComponent, title: 'Vectober | belphion' },
  { path: 'links', component: LinksComponent, title: 'Links | belphion' },
  { path: '**', redirectTo: '' }
];
