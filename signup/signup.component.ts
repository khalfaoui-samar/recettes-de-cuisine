import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  currentImage: number = 0;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % 4;
    }, 5000);
  }

  onSubmit() {
    // Créer un objet user complet avec tous les champs obligatoires
    const now = new Date();
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      username: this.firstName + this.lastName, 
      profileImg: "default.png", 
      memberSince: now.toISOString().slice(0, 10), 
      createdAt: now.toISOString().slice(0, 10), 
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        // Afficher un message d'erreur à l'utilisateur ici si besoin
      }
    });
  }
}