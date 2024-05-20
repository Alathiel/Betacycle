import { Routes } from '@angular/router';
import { HomeComponent } from './features/Homepage/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AddressComponent } from './features/address/address.component';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login.component';
import { AdminMenuComponent } from './features/admin/admin-menu/admin-menu.component';
import { LogsViewerComponent } from './features/admin/logs-viewer/logs-viewer.component';
import { ProductsViewerComponent } from './features/admin/products-viewer/products-viewer.component';
import {CartComponent} from './features/cart/cart.component';

export const routes: Routes = [
    
    {path: 'login', component: LoginComponent},
    {path: 'cart', component: CartComponent},
    {path: 'home', component: HomeComponent},
    {path: 'settings', component:SettingsComponent},
    {path: 'address', component:AddressComponent},
    {path: 'admin-login', component:AdminLoginComponent},
    {path: 'admin-menu', component:AdminMenuComponent},
    {path: 'logs-viewer', component:LogsViewerComponent},
    {path: 'products-viewer', component:ProductsViewerComponent},
    {path: '', redirectTo:'login', pathMatch: 'full'}
];
