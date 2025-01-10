import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ResponseAPIUser } from '../Interface/ResponseApiUser';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:5221/api/auth/';
  public errors: string[] = [];
  private http = inject(HttpClient);
  private router = inject(Router);
  public LocalStorageService = inject(LocalStorageService);


  async login(form:any): Promise<ResponseAPIUser>
  {
    try
    {
      const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'login' , form));
      this.LocalStorageService.setVariable('token', response.token);
      this.LocalStorageService.setVariable('email', response.email);
      this.LocalStorageService.setVariable('role',response.role);
      this.router.navigate(['/home']);
      return Promise.resolve(response);
    }catch(error)
    {
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');

      return Promise.reject(this.errors);
    }
  }

  async register(form: any): Promise<ResponseAPIUser>
  {
    try
    {
      const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'register', form));
      this.LocalStorageService.setVariable('token', response.token);
      this.LocalStorageService.setVariable('email', response.email);
      this.LocalStorageService.setVariable('role', response.role);
      this.router.navigate(['/home']);
      return Promise.resolve(response);
    }catch(error)
    {
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error Desconocido');

      return Promise.reject(this.errors);
    }
    
  }

  logout()
  {
    this.LocalStorageService.clearAll();
    this.router.navigate(['/']);
  }

  logCurrentUserToken() {
    const token = this.LocalStorageService.getToken();
    console.log('Current User Token:', token);
  }
   



}
