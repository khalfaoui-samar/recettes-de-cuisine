import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: `./signup.component.html`,
  styleUrls: [`./signup.component.css`]
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  currentImage: number = 0;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;

  constructor() {
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % 4;
    }, 5000);
  }

  onSubmit() {
    console.log('Signup submitted', { firstName: this.firstName, lastName: this.lastName, email: this.email });
  }
}

