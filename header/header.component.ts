import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>Recettes de Cuisine</h1>
      <!-- Ajoutez ici le contenu de votre header -->
    </header>
  `,
  styles: [`
    header {
      background-color: #f8f9fa;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class HeaderComponent {
  constructor() { }
} 