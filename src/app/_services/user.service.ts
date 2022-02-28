import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { first, pipe } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/Auth`);
    }

    findByEmailAddress(email : string) {
        return this.http.get<any>(`${environment.apiUrl}/User/findByEmail?emailAddress=${email}`).subscribe(res => res);
    }


}