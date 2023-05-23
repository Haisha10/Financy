import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components Import
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';

// Services Import
import { AuthService } from './services/auth.service';

import { OfferWorkComponent } from './offer-work/offer-work.component'
import { FinancesComponent } from './finances/finances.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecommendsComponent } from './recommends/recommends.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'offer-work', component: OfferWorkComponent, canActivate: [AuthService]},
  { path: 'finances', component: FinancesComponent, canActivate: [AuthService] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthService] },
  { path: 'recommends', component: RecommendsComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
