import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpostform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createpostform.component.html',
  styleUrls: ['./createpostform.component.css']
})
export class CreatepostformComponent implements OnInit {
  postForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  selectedFile: File | null = null;
  postService = inject(PostService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      image: [null, Validators.required]
    });
  }

  get titleValidate() {
    return this.postForm.get('title')?.invalid && this.postForm.get('title')?.touched;
  }

  get imageValidate() {
    return this.postForm.get('image')?.invalid && this.postForm.get('image')?.touched;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      alert('Image must be a JPG or PNG.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should not exceed 5MB.');
      return;
    }
    this.selectedFile = file;
    this.postForm.patchValue({ image: file });
  }

  async submit() {
    if (this.postForm.invalid || !this.selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('title', this.postForm.value.title);
      formData.append('image', this.selectedFile);

      await this.postService.createPost(this.postForm.value.title, this.selectedFile);
      this.router.navigate(['/view-post']);
    } catch (error: any) {
      console.error('Error in submit', error);
      this.error = true;
      this.errorMessage.push(error.message || 'Unknown error');
    }
  }
}
