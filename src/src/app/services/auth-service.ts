import {Component, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUrls } from '../constants/api-urls';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor(
  //   private http: HttpClient
  // ) {}

  private readonly TOKEN_KEY = 'auth_token';
  private readonly TYPE_KEY = 'auth_type';
  private readonly NAME_KEY = 'user_name';

  // login(email: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     email,
  //     password
  //   });
  //
  //   return this.http.get<any>(AuthUrls.LOGIN, { headers });
  // }
  //
  // register(name: string, email: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     name,
  //     email,
  //     password
  //   });
  //
  //   return this.http.post(AuthUrls.REGISTER, null, { headers, observe: 'response' });
  // }

  getAuthHeader(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const type = localStorage.getItem(this.TYPE_KEY);

    return token && type ? `${type}${token}` : '';
  }

  saveAuthData(token: string, type: string, name: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.TYPE_KEY, type);
    localStorage.setItem(this.NAME_KEY, name);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.NAME_KEY);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TYPE_KEY);
    localStorage.removeItem(this.NAME_KEY);
  }

  logout(): void {
    localStorage.clear();
  }
}
