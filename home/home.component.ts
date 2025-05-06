import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  currentImage: number = 0;
  slides: string[] = ['photo0.png', 'photo1.png', 'photo2.png', 'photo3.png'];

  constructor() {
    this.startSlideshow();
  }

  startSlideshow(): void {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.slides.length;
    }, 5000);
  }
}

