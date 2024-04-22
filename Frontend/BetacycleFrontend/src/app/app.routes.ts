import { Routes } from '@angular/router';
import { HomeComponent } from './features/Homepage/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AddressComponent } from './features/address/address.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'settings', component:SettingsComponent},
    {path: 'address', component:AddressComponent},
    {path: '', redirectTo:'login', pathMatch: 'full'}
];
