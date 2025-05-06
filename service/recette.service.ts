import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface Commentaire {
  id?: number;
  recetteId: number;
  auteur: string;
  email: string;
  contenu: string;
  note?: number;
  dateCreation: Date;
}

export interface Recette {
  id?: number;
  titre: string;
  description: string;
  ingredients: string[];
  instructions: string;
  tempsPreparation: number;
  tempsCuisson: number;
  difficulte: string;
  categorie: string;
  image: string;
  dateCreation?: Date;
  commentaires?: Commentaire[];
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private recettes: Recette[] = [];
  private recettesSubject = new BehaviorSubject<Recette[]>([]);
  private commentaires: Commentaire[] = [];

  constructor() {
    this.loadRecettesFromStorage();
    this.loadCommentairesFromStorage();
  }

  private loadRecettesFromStorage() {
    try {
      const savedRecettes = localStorage.getItem('recettes');
      if (savedRecettes) {
        this.recettes = JSON.parse(savedRecettes);
        this.recettesSubject.next(this.recettes);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des recettes depuis le stockage:', error);
      this.recettes = [];
      this.recettesSubject.next([]);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('recettes', JSON.stringify(this.recettes));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des recettes:', error);
    }
  }

  private loadCommentairesFromStorage() {
    try {
      const savedCommentaires = localStorage.getItem('commentaires');
      if (savedCommentaires) {
        this.commentaires = JSON.parse(savedCommentaires);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires depuis le stockage:', error);
      this.commentaires = [];
    }
  }

  private saveCommentairesToStorage() {
    try {
      localStorage.setItem('commentaires', JSON.stringify(this.commentaires));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commentaires:', error);
    }
  }

  getRecetteById(id: number): Observable<Recette | undefined> {
    const recette = this.recettes.find(r => r.id === id);
    return of(recette);
  }

  getRecettes(): Observable<Recette[]> {
    return this.recettesSubject.asObservable();
  }

  searchRecettes(term: string): Observable<Recette[]> {
    if (!term.trim()) {
      return this.getRecettes();
    }
    
    const searchTerm = term.toLowerCase();
    const filteredRecettes = this.recettes.filter(recette => 
      recette.titre.toLowerCase().includes(searchTerm) ||
      recette.description.toLowerCase().includes(searchTerm) ||
      recette.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
      recette.categorie.toLowerCase().includes(searchTerm)
    );
    
    return of(filteredRecettes);
  }

  addRecette(recette: Recette): Observable<Recette> {
    try {
      // Générer un ID unique
      const newId = this.recettes.length > 0 
        ? Math.max(...this.recettes.map(r => r.id || 0)) + 1 
        : 1;
      
      const nouvelleRecette = {
        ...recette,
        id: newId,
        dateCreation: new Date()
      };

      this.recettes.push(nouvelleRecette);
      this.saveToLocalStorage();
      this.recettesSubject.next([...this.recettes]);
      
      return of(nouvelleRecette);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
      throw error;
    }
  }

  updateRecette(id: number, recette: Recette): Observable<Recette> {
    try {
      const index = this.recettes.findIndex(r => r.id === id);
      if (index !== -1) {
        this.recettes[index] = { ...recette, id };
        this.saveToLocalStorage();
        this.recettesSubject.next([...this.recettes]);
        return of(this.recettes[index]);
      }
      throw new Error('Recette non trouvée');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
      throw error;
    }
  }

  deleteRecette(id: number): Observable<void> {
    try {
      this.recettes = this.recettes.filter(r => r.id !== id);
      this.saveToLocalStorage();
      this.recettesSubject.next([...this.recettes]);
      return of(void 0);
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
      throw error;
    }
  }

  getCommentairesByRecetteId(recetteId: number): Observable<Commentaire[]> {
    const recetteCommentaires = this.commentaires.filter(c => c.recetteId === recetteId);
    return of(recetteCommentaires);
  }

  addCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    try {
      const newId = this.commentaires.length > 0 
        ? Math.max(...this.commentaires.map(c => c.id || 0)) + 1 
        : 1;
      
      const nouveauCommentaire = {
        ...commentaire,
        id: newId,
        dateCreation: new Date()
      };

      this.commentaires.push(nouveauCommentaire);
      this.saveCommentairesToStorage();
      
      return of(nouveauCommentaire);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      throw error;
    }
  }

  deleteCommentaire(id: number): Observable<void> {
    try {
      this.commentaires = this.commentaires.filter(c => c.id !== id);
      this.saveCommentairesToStorage();
      return of(void 0);
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      throw error;
    }
  }
} 