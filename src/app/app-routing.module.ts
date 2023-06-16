import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components Import
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { MenuComponent } from './components/menu/menu.component';
import { FinancesListComponent } from './components/finances/finances-list/finances-list.component';
import { TipsComponent } from './components/tips/tips.component';
import { EmploymentListComponent } from './components/employment/employment-list/employment-list.component';
import { EmploymentAddEditComponent } from './components/employment/employment-add-edit/employment-add-edit.component';
import { EmploymentOverviewComponent } from './components/employment/employment-overview/employment-overview.component';

// Services Import
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employment/list', component: EmploymentListComponent, canActivate: [AuthService] },
  { path: 'employment/view', component: EmploymentListComponent, canActivate: [AuthService] },
  { path: 'employment/overview', component: EmploymentOverviewComponent, canActivate: [AuthService] },
  { path: 'finances', component: FinancesListComponent, canActivate: [AuthService] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthService] },
  { path: 'tips', component: TipsComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
