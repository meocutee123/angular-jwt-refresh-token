import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/secure/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { PublicComponent } from './layouts/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';

import { appInitializer, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AuthenticationService } from './_services';
import { TransformPipe } from './pipes/transform/transform.pipe';
import { LandingComponent } from './pages/public/landing/landing.component';
import { ProgressComponent } from './components/progress/progress.component';
import { HighlightDirective } from './_helpers/directives/highlight.directive';
import { LeaseAddComponent } from './pages/secure/lease/lease-add/lease-add.component';
import { LeaseEditComponent } from './pages/secure/lease/lease-edit/lease-edit.component';
import { PropertyAddComponent } from './pages/secure/property/property-add/property-add.component';
import { PropertyComponent } from './pages/secure/property/property.component';
import { PropertyDetailsComponent } from './pages/secure/property/property-details/property-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    PublicComponent,
    SecureComponent,
    TransformPipe,
    LandingComponent,
    ProgressComponent, 
    LeaseAddComponent,
    LeaseEditComponent,
    PropertyComponent,
    PropertyDetailsComponent,
    PropertyAddComponent,
    HighlightDirective,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,

  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // ngfakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
