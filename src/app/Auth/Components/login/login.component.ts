import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  private authService = inject(AuthServiceService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Please complete the form correctly.';
      this.loginAlert = true;
      return;
    }

    const formValue = { ...this.form.value };

    try {
      const response = await this.authService.login(formValue);
      if (response.token) {
        this.localStorage.setVariable('token', response.token);
        this.router.navigate(['/general']); // Navigate to "general" page
      } else {
        this.errorMessage = 'Login failed. Incorrect email or password.';
        this.loginAlert = true;
      }
    } catch (error: any) {
      this.errorMessage = 'Login error. Incorrect email or password.';
      this.loginAlert = true;
    }
  }

  closeAlert() {
    this.errorMessage = '';
    this.loginAlert = false;
  }
}
