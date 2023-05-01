import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OfferWorkComponent} from './offer-work/offer-work.component'
import { FinancesComponent } from './finances/finances.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RecommendsComponent } from './recommends/recommends.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'offer-work',component: OfferWorkComponent},
  { path: 'finances', component: FinancesComponent },
  { path:'main-menu',component:MainMenuComponent},
  { path:'recommends',component:RecommendsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
