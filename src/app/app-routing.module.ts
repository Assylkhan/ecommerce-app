import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account-settings/account/account.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ItemComponent } from './item/item.component';
import { ItemsDashboardComponent } from './admin/items-dashboard/items-dashboard.component';
import { AddItemFormComponent } from './admin/add-item-form';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ItemsListComponent } from './admin/items-list/items-list.component';
import { ItemsListTestComponent } from './admin/items-list-test/items-list-test.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { UsersDashboardComponent } from './admin/users-dashboard/users-dashboard.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: '', component: ItemsDashboardComponent,
        children: [
          { path: '', component: ItemsListComponent },
          { path: 'items-list-test', component: ItemsListTestComponent },
          { path: 'add-item', component: AddItemFormComponent },
          { path: 'edit-item/:id', component: AddItemFormComponent }
        ] },
      { path: 'settings', component: AdminSettingsComponent },
      { path: 'users', component: UsersDashboardComponent,
        children: [
          { path: '', component: AdminUsersComponent },
          { path: 'add-user', component: AdminUserComponent},
          { path: 'edit-user/:id', component: AdminUserComponent },
        ] }
    ]
  },
  { path: 'items/:id', component: ItemComponent},
  { path: 'cart', component: CartComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
