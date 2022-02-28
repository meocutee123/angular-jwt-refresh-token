import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("ERROR INTERCEPTER");
        return next.handle(request).pipe(tap({
            next: () => null,
            error: (error: HttpErrorResponse) => {
                if ([401, 403].includes(error.status) && this.authenticationService.userValue) {
                    // auto logout if 401 or 403 response returned from api
                    this.authenticationService.logout();
                }
            }
        }))
    }
}