import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "@app/components/page-not-found/page-not-found.component";
import { LandingComponent } from "@app/pages/public/landing/landing.component";
import { LoginComponent } from "@app/pages/public/login/login.component";
import { RegisterComponent } from "@app/pages/public/register/register.component";

export const PUBLIC_ROUTES : Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];