import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  registrationAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  @Output() registrationSuccess = new EventEmitter<string>();

  private authService = inject(AuthServiceService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9]).{6,}$')]]
    });
  }

  async register() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Please complete the form correctly.';
      this.registrationAlert = true;
      return;
    }

    const formValue = { ...this.form.value };

    try {
      const response = await this.authService.register(formValue);
      if (response.token) {
        this.localStorage.setVariable('token', response.token);
        this.registrationSuccess.emit('Registration successful');
      } else {
        this.errorMessage = 'Registration failed.';
        this.registrationAlert = true;
      }
    } catch (error: any) {
      this.errorMessage = 'Registration error.';
      this.registrationAlert = true;
    }
  }

  closeAlert() {
    this.errorMessage = '';
    this.registrationAlert = false;
  }
}
