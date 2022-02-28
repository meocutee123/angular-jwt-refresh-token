import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './layouts/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { PUBLIC_ROUTES } from './routes/public.routes';
import { SECURE_ROUTES } from './routes/secure.routes';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: PublicComponent, data: { title: 'Public view' }, children: PUBLIC_ROUTES },
  { path: '', component: SecureComponent, data: { title: 'Secure view' }, children: SECURE_ROUTES , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
