import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet
  ], 
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'recettes';
}