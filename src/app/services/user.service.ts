import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService, User } from '../auth/login.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private loginService: LoginService) {}
  login(email: string, password: string): Observable<any> {
    return this.http
      .post('http://localhost:8080/StocklySystem/api/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((data) => {
          this.loginService.setUser(data as User); // Memorizza l'utente se necessario
          this.loginService.setToken('TOKEN');
        })
      );
  }

  isAutenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

  logout() {
    this.loginService.setToken(null!);
  }
}
