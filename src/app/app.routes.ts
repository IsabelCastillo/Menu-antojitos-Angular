import {Routes} from '@angular/router';
import { CategoriasComponent } from './components/categoria/categoria.component';
import { PlatillosComponent } from './components/platillos/platillos.component';

export const ROUTES: Routes = [
    {path: 'categoria', component:CategoriasComponent},
    {path: 'platillos', component: PlatillosComponent},
    {path: '', pathMatch:'full', redirectTo: 'categoria'},
    {path: '**', pathMatch:'full', redirectTo: 'categoria'},

];

