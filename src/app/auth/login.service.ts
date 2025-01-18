import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user: User = null!;
  private token: string | null = null!;

  private isSessionStorageAvailable(): boolean {
    return (
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
    );
  }
  constructor() {
    if (this.isSessionStorageAvailable()) {
      this.token = sessionStorage.getItem('token');
    } else {
      console.warn('Session storage not available');
    }
  }
  isAuthenticated() {
    return this.token !== null;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string) {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem('token', token);
      this.token = token;
    } else {
      console.warn('Session storage not available');
    }
  }

  isAdminUser() {
    return this.user.ruolo === 'admin' ? true : false;
  }

  getUser(): User {
    return this.user !== null ? this.user : null!;
  }

  setUser(user: User) {
    this.user = user;
  }
}

export interface User {
  username: string;
  password: string;
  email: string;
  nome: string;
  cognome: string;
  ruolo: string;
}
