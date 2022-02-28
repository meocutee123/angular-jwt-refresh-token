import { Routes } from "@angular/router";
import { HomeComponent } from "@app/pages/secure/home/home.component";

export const SECURE_ROUTES : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'secure', component: HomeComponent}
];