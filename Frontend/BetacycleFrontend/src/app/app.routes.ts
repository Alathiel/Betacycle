import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { HomeComponent } from './feauters/home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'home', component: HomeComponent},
];