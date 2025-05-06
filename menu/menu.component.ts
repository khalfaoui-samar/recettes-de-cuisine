import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService, Recette, Commentaire } from '../service/recette.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterModule]
})
export class MenuComponent implements OnInit {
  recette: Recette | null = null;
  commentaires: Commentaire[] = [];
  nouveauCommentaire: string = '';
  auteur: string = '';
  email: string = '';

  // Pour le bloc commentaire étoilé
  note: number = 0;
  hovered: number = 0;
  commentaire: string = '';

  // Fonction pour gérer la notation par étoiles
  setNote(note: number) {
    this.note = note;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService
  ) {}

  // Vérifier si la recette est dans les favoris
  estDansFavoris(): boolean {
    const favorisStr = localStorage.getItem('favoris');
    const favorisIds = favorisStr ? JSON.parse(favorisStr) : [];
    return favorisIds.includes(this.recette?.id);
  }

  // Ajouter ou retirer des favoris
  toggleFavoris() {
    if (!this.recette) return;

    const favorisStr = localStorage.getItem('favoris');
    let favorisIds = favorisStr ? JSON.parse(favorisStr) : [];

    if (this.estDansFavoris()) {
      // Retirer des favoris
      favorisIds = favorisIds.filter((id: number) => id !== this.recette?.id);
    } else {
      // Ajouter aux favoris
      favorisIds.push(this.recette.id);
    }

    localStorage.setItem('favoris', JSON.stringify(favorisIds));
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recetteService.getRecetteById(+id).subscribe(recette => {
        this.recette = recette || null;
        if (this.recette) {
          this.loadCommentaires();
        }
      });
    }
  }

  loadCommentaires() {
    if (this.recette?.id) {
      this.recetteService.getCommentairesByRecetteId(this.recette.id).subscribe(commentaires => {
        this.commentaires = commentaires;
      });
    }
  }

  ajouterCommentaire() {
    // Vérification des champs obligatoires
    if (!this.auteur.trim() || !this.email.trim()) {
      alert('Le nom et l\'email sont obligatoires');
      return;
    }

    // Vérification qu'il y a au moins une note ou un commentaire
    if (!this.nouveauCommentaire.trim() && this.note === 0) {
      alert('Veuillez ajouter au moins une note ou un commentaire');
      return;
    }

    if (this.recette?.id) {
      const commentaire: Commentaire = {
        recetteId: this.recette.id,
        auteur: this.auteur.trim(),
        email: this.email.trim(),
        contenu: this.nouveauCommentaire.trim(),
        note: this.note,
        dateCreation: new Date()
      };

      this.recetteService.addCommentaire(commentaire).subscribe({
        next: () => {
          // Réinitialisation des champs
          this.nouveauCommentaire = '';
          this.note = 0;
          this.hovered = 0;
          this.loadCommentaires();
          alert('Votre avis a été envoyé avec succès !');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du commentaire:', error);
          alert('Erreur lors de l\'envoi de votre avis');
        }
      });
    }
  }

  supprimerCommentaire(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.recetteService.deleteCommentaire(id).subscribe({
        next: () => {
          this.loadCommentaires();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du commentaire:', error);
          alert('Erreur lors de la suppression du commentaire');
        }
      });
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

  onLogoutClick(event: Event): void {
    event.preventDefault();
    // Ajoutez ici la logique de déconnexion
    console.log('Déconnexion...');
  }

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
}