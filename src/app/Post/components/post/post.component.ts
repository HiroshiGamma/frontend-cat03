import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseAPIPost } from '../../Interface/ResponseApiPost';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: ResponseAPIPost;
}
