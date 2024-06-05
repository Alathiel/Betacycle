import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { UpdatepswComponent } from './core/updatepsw/updatepsw.component';
import { UsersettingsComponent } from './features/usersettings/usersettings.component';
import { RestoreComponent } from './core/restorepassword/restore/restore.component';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login.component';
import { AdminMenuComponent } from './features/admin/admin-menu/admin-menu.component';
import { LogsViewerComponent } from './features/admin/logs-viewer/logs-viewer.component';
import { ProductsViewerComponent } from './features/admin/products-viewer/products-viewer.component';
import { SupportChatComponent } from './features/admin/support-chat/support-chat.component';
import { CartComponent } from './features/cart/cart.component';
import { ConfirmOrderComponent } from './features/confirm-order/confirm-order.component';
import { ChiSiamoComponent } from './features/chi-siamo/chi-siamo.component';
import { ContactsComponent } from './features/contacts/contacts.component';
import { ProductComponent } from './features/product/product/product.component';
import { ProductdetailsComponent } from './features/product/productdetails/productdetails.component';
import { LoginFormComponent } from './core/loginNew/login-form/login-form.component';
import { LoginComponent } from './core/loginNew/login.component';


export const routes: Routes = [
    
    {path:'home',component:HomeComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'login',component:LoginComponent},
    {path:'registration',component:RegistrationComponent},
    {path:'restore',component:RestoreComponent},
    {path:'updatepsw',component:UpdatepswComponent},
    {path:'usersetting',component:UsersettingsComponent},
    {path:'product',component:ProductComponent},
    {path: 'admin-login', component:AdminLoginComponent},
    {path: 'admin-menu', component:AdminMenuComponent},
    {path: 'logs-viewer', component:LogsViewerComponent},
    {path: 'products-viewer', component:ProductsViewerComponent},
    {path:'productDetails',component:ProductdetailsComponent},
    {path: 'chisiamo', component:ChiSiamoComponent},
    {path:'contact',component:ContactsComponent},
    {path: 'support-chat', component:SupportChatComponent},
    {path: 'cart', component:CartComponent},
    {path: 'confirm-order', component:ConfirmOrderComponent},
    {path:'', redirectTo:'/home',pathMatch:'full'}
];
