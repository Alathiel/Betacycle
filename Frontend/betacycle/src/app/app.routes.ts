import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ProductComponent } from './features/product/product.component';
import { NewUserPwdComponent } from './core/newuserpwd/newuserpwd.component';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { UsersettingsComponent } from './features/usersettings/usersettings.component';

export const routes: Routes = 
[
    {path:'navbar',component:NavbarComponent},
    {path:'products',component:ProductComponent},
    {path:'login',component:LoginComponent},
    {path:'newuserpwd',component:NewUserPwdComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent},
    {path:'settings',component:UsersettingsComponent},
    {path:'', redirectTo:'/home',pathMatch:'full'}
];
