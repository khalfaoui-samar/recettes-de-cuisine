import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api/users';
  private readonly ADMIN_EMAIL = 'admin@admin.com';
  private readonly ADMIN_PASSWORD = 'admin123';

  constructor(private http: HttpClient) {}

  // Inscription (Register)
  register(user: any): Observable<any> {
    // Par défaut, tous les nouveaux utilisateurs sont des "USER"
    const userWithRole = {
      ...user,
      role: 'USER'
    };
    return this.http.post(`${this.apiUrl}/signup`, userWithRole);
  }

  // Connexion (Login)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        // Tous les comptes sont de type USER
        const userResponse = {
          ...response,
          role: 'USER'
        };
        this.setUserData(userResponse);
        return userResponse;
      })
    );
  }

  // Stocker les informations de l'utilisateur
  private setUserData(userData: any): void {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  // Récupérer l'utilisateur courant
  getCurrentUser(): any {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  // Vérifier si un utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Récupérer le rôle de l'utilisateur
  getUserRole(): string {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role || 'USER';
    }
    return 'USER';
  }

  // Mettre à jour le profil
  updateProfile(userData: any): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.setUserData(updatedUser);
    }
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
