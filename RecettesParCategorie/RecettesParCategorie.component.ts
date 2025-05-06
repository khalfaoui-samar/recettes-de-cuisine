import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService, Recette } from '../service/recette.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recettes-par-categorie',
  templateUrl: './RecettesParCategorie.component.html',
  styleUrls: ['./RecettesParCategorie.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterModule]
})
export class RecettesParCategorieComponent implements OnInit {
  recettes: Recette[] = [];
  filteredRecettes: Recette[] = [];
  searchTerm: string = '';
  categorie: string = '';
  categories: { [key: string]: string } = {
    'soupe': 'Soupes',
    'salade': 'Salades',
    'plat': 'Plats',
    'dessert': 'Desserts',
    'boisson': 'Boissons'
  };

  // Ajout pour la zone de commentaire
  note: number = 0;
  hovered: number = 0;
  commentaire: string = '';

  envoyerCommentaire() {
    if (this.note && this.commentaire) {
      // Ici, tu ajoutes la logique pour enregistrer l'avis (note + commentaire)
      // Par exemple, tu pourrais appeler un service ou simplement afficher dans la console :
      console.log('Avis envoyé :', {
        note: this.note,
        commentaire: this.commentaire,
        // Tu peux ajouter d'autres infos ici (utilisateur, date, etc.)
      });
      // Réinitialiser le formulaire
      this.note = 0;
      this.hovered = 0;
      this.commentaire = '';
      // Afficher un message de succès si tu veux
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categorie = params['categorie'];
      console.log('Catégorie sélectionnée:', this.categorie);
      this.loadRecettes();
    });
  }

  loadRecettes() {
    this.recetteService.getRecettes().subscribe({
      next: (recettes) => {
        console.log('Toutes les recettes:', recettes);
        this.recettes = recettes;
        this.filteredRecettes = this.recettes.filter(recette => {
          console.log('Vérification de la recette "' + recette.titre + '" - Catégorie: "' + recette.categorie + '"');
          const match = recette.categorie.toLowerCase() === this.categorie.toLowerCase();
          console.log('Correspond à la catégorie "' + this.categorie + '" ? ' + match);
          return match;
        });
        console.log('Recettes filtrées:', this.filteredRecettes);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recettes:', error);
      }
    });
  }

  searchRecettes() {
    if (!this.searchTerm.trim()) {
      this.filteredRecettes = this.recettes.filter(recette => 
        recette.categorie.toLowerCase() === this.categorie.toLowerCase()
      );
      return;
    }

    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredRecettes = this.recettes.filter(recette => 
      recette.categorie.toLowerCase() === this.categorie.toLowerCase() &&
      (recette.titre.toLowerCase().includes(searchTerm) ||
       recette.description.toLowerCase().includes(searchTerm) ||
       recette.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)))
    );
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
        return '';
    }
  }

  voirDetails(id: number | undefined) {
    if (id === undefined) {
      console.error('ID de recette non défini');
      return;
    }
    this.router.navigate(['/recette', id]);
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.router.navigate(['/home']);
    }
  }
} 