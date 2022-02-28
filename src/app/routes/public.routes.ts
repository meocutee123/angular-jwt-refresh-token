import { Routes } from "@angular/router";
import { LandingComponent } from "@app/pages/public/landing/landing.component";
import { LoginComponent } from "@app/pages/public/login/login.component";
import { RegisterComponent } from "@app/pages/public/register/register.component";

export const PUBLIC_ROUTES : Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: LandingComponent},

];