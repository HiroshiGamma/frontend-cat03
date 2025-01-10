import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostService } from '../../Service/post.service';
import { ResponseAPIPost } from '../../Interface/ResponseApiPost';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit {
  posts: ResponseAPIPost[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().then((data) => {
      this.posts = data;
    });
  }

  navigateToGeneral() {
    this.router.navigate(['/general']);
  }
}
