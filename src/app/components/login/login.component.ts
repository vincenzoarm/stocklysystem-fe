import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup = null!;

  constructor(private userService: UserService, private route: Router) {}

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {
          // Successo: controlliamo se l'utente è autenticato
          if (this.userService.isAutenticated()) {
            console.log('Login successful');
            // Naviga alla dashboard o un'altra pagina
            this.route.navigate(['/home']);
          } else {
            console.log('Authentication failed');
            // Mostra un messaggio di errore
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Mostra un messaggio di errore all'utente
        }
      );
  }
}
