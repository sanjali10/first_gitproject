import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import { User } from '../interfaces/user';
import { TokenStorage } from '../../core/token.storage';

@Injectable()
export class AuthService {
    get isLoggedIn() {
        if (this.token.getToken()) {
            return true;
        }
        return false;
    }

    constructor(
        private http: HttpClient,
        private router: Router,
        private token: TokenStorage
    ) {}

    login(user: User): Observable<any> {
        if (user.userName !== '' && user.password !== '') {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
            const loginServiceUrl =
                this.token.getTenantValue() + '/RESTAPI/sessions';
            return this.http.post<any>(loginServiceUrl, user, httpOptions);
        }
    }

    logout() {
        this.token.signOut();
        this.router.navigate(['/login']);
    }
}
