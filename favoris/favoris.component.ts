import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecetteService, Recette } from '../service/recette.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavorisComponent implements OnInit {
  recettesFavorites: Recette[] = [];

  constructor(private recetteService: RecetteService) {}

  ngOnInit() {
    // Charger les favoris depuis le localStorage
    const favorisStr = localStorage.getItem('favoris');
    if (!favorisStr) {
      this.recettesFavorites = [];
      return;
    }

    const favorisIds = JSON.parse(favorisStr);
    if (!Array.isArray(favorisIds) || favorisIds.length === 0) {
      this.recettesFavorites = [];
      return;
    }
    
    // Ne charger que les recettes qui sont dans les favoris
    favorisIds.forEach(id => {
      this.recetteService.getRecetteById(id).subscribe(
        recette => {
          if (recette) {
            this.recettesFavorites.push(recette);
          }
        },
        error => {
          console.error(`Erreur lors du chargement de la recette ${id}:`, error);
        }
      );
    });
  }

  // Supprimer une recette des favoris
  supprimerDesFavoris(recetteId: number | undefined) {
    if (!recetteId) return;
    const favorisStr = localStorage.getItem('favoris');
    let favorisIds = favorisStr ? JSON.parse(favorisStr) : [];
    favorisIds = favorisIds.filter((id: number) => id !== recetteId);
    localStorage.setItem('favoris', JSON.stringify(favorisIds));
    this.recettesFavorites = this.recettesFavorites.filter(recette => recette.id !== recetteId);
  }
}
