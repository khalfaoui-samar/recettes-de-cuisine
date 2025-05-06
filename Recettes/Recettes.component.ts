import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecetteService } from '../service/recette.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recettes',
  templateUrl: './Recettes.component.html',
  styleUrls: ['./Recettes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterModule]
})
export class RecettesComponent implements OnInit {
  recettes: any[] = [];
  filteredRecettes: any[] = [];
  searchTerm: string = '';

  constructor(private recetteService: RecetteService, private router: Router) {}

  ngOnInit() {
    this.loadRecettes();
  }

  loadRecettes() {
    this.recetteService.getRecettes().subscribe({
      next: (recettes: any[]) => {
        this.recettes = recettes;
        this.filteredRecettes = [...recettes];
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des recettes:', error);
      }
    });
  }

  searchRecettes() {
    if (this.searchTerm.trim()) {
      this.recetteService.searchRecettes(this.searchTerm).subscribe({
        next: (recettes: any[]) => {
          this.filteredRecettes = recettes;
        },
        error: (error: any) => {
          console.error('Erreur lors de la recherche:', error);
        }
      });
    } else {
      this.filteredRecettes = [...this.recettes];
    }
  }

  getDifficultyClass(difficulte: string): string {
    switch (difficulte.toLowerCase()) {
      case 'facile':
        return 'badge-success';
      case 'moyen':
        return 'badge-warning';
      case 'difficile':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  }

  voirDetails(id: number) {
    this.router.navigate(['/recette', id]);
  }

  onLogoutClick(event: Event): void {
    event.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }
  }
}