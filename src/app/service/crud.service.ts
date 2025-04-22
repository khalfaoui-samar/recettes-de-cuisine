import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiUrl = 'http://localhost:8082/api';
 
  
  loginUserUrl = 'http://localhost:8082/api/users/login';

  constructor(private http: HttpClient) {}

  // Créer un utilisateur (Create)
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, user); // Utilise l'URL correcte
  }
  // Lire tous les utilisateurs (Read)
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Lire un utilisateur par ID (Read)
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un utilisateur (Update)
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Supprimer un utilisateur (Delete)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}