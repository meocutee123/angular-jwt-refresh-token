import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "@app/components/page-not-found/page-not-found.component";
import { HomeComponent } from "@app/pages/secure/home/home.component";
import { LeaseAddComponent } from "@app/pages/secure/lease/lease-add/lease-add.component";
import { PropertyAddComponent } from "@app/pages/secure/property/property-add/property-add.component";
import { PropertyDetailsComponent } from "@app/pages/secure/property/property-details/property-details.component";
import { PropertyComponent } from "@app/pages/secure/property/property.component";

export const SECURE_ROUTES: Routes = [
  { path: 'back-office', component: HomeComponent },
  { path: 'back-office/lease/create', component: LeaseAddComponent },
  { path: 'back-office/properties', component: PropertyComponent },
  { path: 'back-office/property/detail/:id', component: PropertyDetailsComponent },
  { path: 'back-office/property/create', component: PropertyAddComponent },
  { path: '**', component: PageNotFoundComponent},
];