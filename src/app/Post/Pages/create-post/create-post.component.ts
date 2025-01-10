import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreatepostformComponent } from '../../components/createpostform/createpostform.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CreatepostformComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private router: Router) {}

  navigateToGeneralPage() {
    this.router.navigate(['/general']);
  }
}
