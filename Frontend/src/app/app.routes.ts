import { Routes } from '@angular/router';
import { NavigationbarComponent} from './app/core/navigationbar/navigationbar.component';
import { LoginComponent } from './app/features/account/login/login.component';
import { HomeComponent } from './app/features/home/home.component';
import { RegistrationComponent } from './app/features/account/registration/registration.component';

export const routes: Routes = 
[
    {path:'navbar',component:NavigationbarComponent},
    {path:'home',component:HomeComponent},
    {path:'register',component:RegistrationComponent},
    {path:'login',component:LoginComponent},
    {path:'', redirectTo:'/home',pathMatch:'full'}
];
