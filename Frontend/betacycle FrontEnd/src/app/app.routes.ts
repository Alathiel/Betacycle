import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductComponent } from './features/product/product.component';
import { SaleComponent } from './features/sale/sale.component';
import { CustomerComponent } from './features/admin/customer/customer.component';
import { LogoutComponent } from './core/logout/logout.component';
import { LoginjwtComponent } from './core/loginjwt/loginjwt.component';
import { RegisterComponent } from './core/Register/register/register.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'loginjwt', component:LoginjwtComponent},
  {path: 'product', component:ProductComponent},
  {path: 'sale', component:SaleComponent},
  {path: 'customer',component: CustomerComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'register', component:RegisterComponent}
];
