import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule, } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
// MatDrawerContainer

import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AccountComponent } from './account-settings/account/account.component';
import { BasicInfoComponent } from './account-settings/basic-info/basic-info.component';
import { BillingInfoComponent } from './account-settings/billing-info/billing-info.component';
import { ChangePasswordComponent } from './account-settings/change-password/change-password.component';
import { AddItemFormComponent } from './admin/add-item-form/add-item-form.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ItemsDashboardComponent } from './admin/items-dashboard/items-dashboard.component';
import { ItemsListComponent } from './admin/items-list/items-list.component';
import { ItemComponent } from './item/item.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { DropzoneDirective } from './dropzone.directive';
import { ClientConfig } from '../client-config';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { ItemsListTestComponent } from './admin/items-list-test/items-list-test.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { UsersDashboardComponent } from './admin/users-dashboard/users-dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { OrderComponent } from './order/order.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CheckoutComponent } from './checkout/checkout.component';

var firebaseConfig = {
  apiKey: ClientConfig.config.apiKey,
  authDomain: ClientConfig.config.authDomain,
  projectId: ClientConfig.config.projectId,
  storageBucket: ClientConfig.config.storageBucket,
  messagingSenderId: ClientConfig.config.messagingSenderId,
  appId: ClientConfig.config.appId,
  measurementId: ClientConfig.config.measurementId
};

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    HomeComponent,
    AccountComponent,
    BasicInfoComponent,
    BillingInfoComponent,
    ChangePasswordComponent,
    AddItemFormComponent,
    AdminDashboardComponent,
    ItemsDashboardComponent,
    ItemsListComponent,
    ItemComponent,
    AdminUsersComponent,
    AdminSettingsComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    ItemsListTestComponent,
    AdminUserComponent,
    UsersDashboardComponent,
    CartComponent,
    CartIconComponent,
    OrderComponent,
    ProfileDropdownComponent,
    ConfirmationDialogComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    // MatDrawerContainer,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatSortModule,
    MatGridListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
