import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  private authURL: string;
  constructor(private httpClient: HttpClient) {
    this.authURL = 'http://localhost:3000/auth/v1/';
  }
  authenticateUser(data: any) {
    return this.httpClient.post(this.authURL, data);
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearer token', token);
  }
  getBearerToken() {
    return localStorage.getItem('bearer token');
  }

  isUserAuthenticated(token: string): Promise<boolean> {
    return this.httpClient.post<boolean>(`${this.authURL}isAuthenticated`, {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    }).map((res) => {
      return res['isAuthenticated'];
    })
    .toPromise();
  }
}

