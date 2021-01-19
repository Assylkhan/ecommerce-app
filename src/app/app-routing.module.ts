import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account-settings/account/account.component';
import { AuthGuard } from '@app/helpers';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'items/:id', component: ItemComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
