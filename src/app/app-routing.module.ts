import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  { path: 'signup', component: SignupFormComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
