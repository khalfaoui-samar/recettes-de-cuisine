import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'https://formspree.io/f/urbee.chef@gmail.com'; // Utilisation de Formspree comme service d'envoi d'email

  constructor(private http: HttpClient) { }

  sendEmail(formData: any): Observable<any> {
    return this.http.post(this.emailUrl, formData);
  }
}