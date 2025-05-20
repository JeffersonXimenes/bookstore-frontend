import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly TYPE_KEY = 'auth_type';
  private readonly NAME_KEY = 'user_name';

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
