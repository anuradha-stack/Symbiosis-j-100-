import { Routes } from '@angular/router';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';

export const routes: Routes = [
    { path:' ', pathMatch:'full',redirectTo:'seat-selection component'},
    { path:'', component:SeatSelectionComponent}
];
