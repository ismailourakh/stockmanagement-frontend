import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Optional for styling
})
export class LoginComponent {
  private authService = inject(AuthService);

  username = new FormControl('');
  password = new FormControl('');

  onSubmit() {
    console.log(' Formulaire soumis:', this.username.value, this.password.value);

    if (this.username.value && this.password.value) {
      this.authService.login(this.username.value, this.password.value);
    } else {
      console.error(' Champs vides !');
    }
  }
}
