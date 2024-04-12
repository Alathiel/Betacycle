import { Routes } from '@angular/router';
import { NavigationbarComponent} from './app/core/navigationbar/navigationbar.component';
import { HomeComponent } from './app/features/home/home.component';


export const routes: Routes = 
[
    {path:'navbar',component:NavigationbarComponent},
    {path:'home',component:HomeComponent},
    {path:'', redirectTo:'/home',pathMatch:'full'}
];
