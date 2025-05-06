import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersUrl = 'http://localhost:8082/api/users';
  private recetteUrl = 'http://localhost:8082/api/recette';
  
  constructor(private http: HttpClient) {}

  // User operations
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.usersUrl}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.usersUrl}`, user);
  }

  getUserStatsByDay(): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersUrl}/stats`);
  }

  // Recipe operations
  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.recetteUrl}`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.recetteUrl}/${id}`);
  }

  updateRecipe(id: number, recette: any): Observable<any> {
    return this.http.put(`${this.recetteUrl}/${id}`, recette);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.recetteUrl}/${id}`);
  }

  addRecipe(recette: any): Observable<any> {
    return this.http.post(`${this.recetteUrl}`, recette);
  }
}