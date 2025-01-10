import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../../Components/register/register.component';
import { LoginComponent } from '../../Components/login/login.component';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, RegisterComponent, LoginComponent],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  isRegisterFormVisible = false;
  registrationMessage: string | null = null;

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  showRegisterForm() {
    this.isRegisterFormVisible = true;
    // Add logic to hide the login form
  }

  cancelRegistration() {
    this.isRegisterFormVisible = false;
  }

  onRegistrationSuccess(message: string) {
    this.registrationMessage = message;
    this.isRegisterFormVisible = false;
  }
}
