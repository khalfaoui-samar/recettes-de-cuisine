import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']   
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  currentImage: number = 1;
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
    console.log('Tentative de connexion...');
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Redirection basée sur le rôle
        const role = this.authService.getUserRole();
        console.log('Role détecté:', role);
        if (role === 'ADMIN') {
          console.log('Redirection vers /AdminHome');
          this.router.navigate(['/AdminHome']).then(() => {
            console.log('Navigation vers AdminHome effectuée');
          });
        } else {
          console.log('Redirection vers /UserHome');
          this.router.navigate(['/userhome']).then(() => {
            console.log('Navigation vers UserHome effectuée');
          });
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
