import { Component } from '@angular/core';
import { UserGuard } from '../../../Auth/Guards/user.guard';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';

@Component({
  selector: 'app-general',
  imports: [],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {
  constructor(private router: Router, private localStorage: LocalStorageService) {}

  logout() {
    this.localStorage.clearAll();
    this.router.navigate(['/login']);
  }

  navigateToViewPost() {
    this.router.navigate(['/view-post']);
  }

  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }
}
