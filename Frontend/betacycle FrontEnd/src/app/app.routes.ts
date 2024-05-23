import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductComponent } from './features/product/product.component';
import { SaleComponent } from './features/sale/sale.component';
import { CustomerComponent } from './features/admin/customer/customer.component';
import { LoginjwtComponent } from './core/loginjwt/loginjwt.component';
import { RegisterComponent } from './core/Register/register/register.component';
import { SettingComponentComponent } from './features/setting-component/setting-component.component';
import { CaroselloComponent } from './features/carosello/carosello.component';
import { ContactComponent } from './features/contact/contact.component';
import { PagehomeComponent } from './features/pagehome/pagehome.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'loginjwt', component:LoginjwtComponent},
  {path: 'product', component:ProductComponent},
  {path: 'sale', component:SaleComponent},
  {path: 'customer',component: CustomerComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'Setting-component' , component: SettingComponentComponent},
  {path: 'Carosello' , component: CaroselloComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'pagehome', component: PagehomeComponent}

];
