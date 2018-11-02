import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { TokenStorage } from '../../core/token.storage';

@Injectable()
export class UserService {
    private getUserNameUrl
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
  ) { }

  getUserName(): Observable<any> {
    let getUserNameUrl = this.token.getTenantValue()+'/RESTAPI/users/'+this.token.getUsedId();
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    "Authorization": "TeleOffice " + this.token.getToken(),
                   })
            };
            return this.http.get<any>(getUserNameUrl, httpOptions);
        }





}
