import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthenticateResponse, AuthenticateRequest, RegisterRequest } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<AuthenticateResponse>;
  public user: Observable<AuthenticateResponse>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<AuthenticateResponse>(null as any);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): AuthenticateResponse {
    return this.userSubject.value;
  }

  login(loginRequest : AuthenticateRequest) {
    console.log("AUTHENTICATION SERVICE - LOGIN")
    return this.http.post<AuthenticateResponse>(`${environment.apiUrl}/Auth/authenticate`, loginRequest, { withCredentials: true })
      .pipe(map((user : AuthenticateResponse) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  register(registerRequest: RegisterRequest) {
    console.log("AUTHENTICATION SERVICE - REGISTER", registerRequest)
    return this.http.post(`${environment.apiUrl}/Auth/register`, registerRequest, { withCredentials: true })
      .pipe(map(user => {
        this.router.navigate(['/login'])
      }));
  }

  logout() {
    console.log("AUTHENTICATION SERVICE - LOGOUT")
    this.http.post(`${environment.apiUrl}/Auth/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null as any);
    this.router.navigate(['/login']);
  }

  refreshToken() {
    console.log("AUTHENTICATION SERVICE - REFESH TOKEN")
    return this.http.post<AuthenticateResponse>(`${environment.apiUrl}/Auth/refresh-token`, {}, { withCredentials: true })
      .pipe(map((user : AuthenticateResponse) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  // helper methods

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken?.split('.')[1] || ""));
    
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}