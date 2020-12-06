import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './home/home/home.component';
import { IssuesComponent } from './issues/issues/issues.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'issues', component: IssuesComponent },
  { path: "**",redirectTo:"/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
