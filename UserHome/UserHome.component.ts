import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-UserHome',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
],
  templateUrl: './UserHome.component.html',
  styleUrls: ['./UserHome.component.css']
})
export class UserHomeComponent {
  currentImage: number = 0;
  slides: string[] = ['UserHome0.png', 'UserHome1.png', 'UserHome2.png'];
  showLogoutConfirm = false;

  constructor(private router: Router) {
    this.startSlideshow();
  }

  startSlideshow(): void {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.slides.length;
    }, 5000);
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.router.navigate(['/home']);
    }
  }

  confirmLogout() {
    this.showLogoutConfirm = false;
    this.router.navigate(['/home']);
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }
}
