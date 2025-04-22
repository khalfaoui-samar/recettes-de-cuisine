import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule,RouterModule],
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']   
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  currentImage: number = 0;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor() {
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % 4;
    }, 5000);
  }

  onSubmit() {
    console.log('Login submitted', { email: this.email });
  }
}

