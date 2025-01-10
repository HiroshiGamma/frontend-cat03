import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseAPIPost } from '../Interface/ResponseApiPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5221/api/Post/';
  private http = inject(HttpClient);
  public errors: string[] = [];

  async getAllPosts(): Promise<ResponseAPIPost[]> {
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIPost[]>(this.apiUrl + 'all'));
      return Promise.resolve(response);
    } catch (error) {
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Unknown error');
      return Promise.reject(this.errors);
    }
  }

  async createPost(title: string, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      await firstValueFrom(this.http.post(this.apiUrl + 'create', formData));
    } catch (error) {
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Unknown error');
      return Promise.reject(this.errors);
    }
  }
}
