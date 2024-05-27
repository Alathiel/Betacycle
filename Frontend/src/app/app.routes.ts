import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { UpdatepswComponent } from './core/updatepsw/updatepsw.component';
import { UsersettingsComponent } from './features/usersettings/usersettings.component';
import { UpdateaddressComponent } from './features/usersettings/address/updateaddress/updateaddress.component';
import { RestoreComponent } from './core/restorepassword/restore/restore.component';
import { ProductComponent } from './features/product/product/product.component';


export const routes: Routes = [
    
    {path:'home',component:HomeComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'login',component:LoginComponent},
    {path:'registration',component:RegistrationComponent},
    {path:'restore',component:RestoreComponent},
    {path:'updatepsw',component:UpdatepswComponent},
    {path:'usersetting',component:UsersettingsComponent},
    {path: 'updateaddress',component:UpdateaddressComponent},
    {path:'product',component:ProductComponent},
    {path:'', redirectTo:'/home',pathMatch:'full'}
];
