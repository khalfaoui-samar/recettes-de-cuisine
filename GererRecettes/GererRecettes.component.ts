import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { RecetteService, Recette } from '../service/recette.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerer-recettes',
  templateUrl: './GererRecettes.component.html',
  styleUrls: ['./GererRecettes.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class GererRecettesComponent implements OnInit {
  recetteForm: FormGroup;
  recettes: Recette[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  showLogoutConfirm = false;
  isEditing = false;
  recetteToEdit: Recette | null = null;

  constructor(
    private fb: FormBuilder,
    private recetteService: RecetteService,
    private router: Router
  ) {
    this.recetteForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      instructions: ['', Validators.required],
      tempsPreparation: ['', [Validators.required, Validators.min(1)]],
      tempsCuisson: ['', [Validators.required, Validators.min(1)]],
      difficulte: ['', Validators.required],
      categorie: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadRecettes();
  }

  get ingredients() {
    return this.recetteForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.recetteForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Formulaire soumis', this.recetteForm.value);
    console.log('Formulaire valide:', this.recetteForm.valid);
    console.log('Erreurs du formulaire:', this.recetteForm.errors);

    if (this.recetteForm.valid) {
      const formValue = this.recetteForm.value;
      console.log('Valeurs du formulaire:', formValue);

      if (this.isEditing && this.recetteToEdit) {
        const recetteModifiee: Recette = {
          ...formValue,
          id: this.recetteToEdit.id,
          dateCreation: this.recetteToEdit.dateCreation
        };

        this.recetteService.updateRecette(this.recetteToEdit.id!, recetteModifiee).subscribe({
          next: (recette) => {
            console.log('Recette modifiée:', recette);
            this.loadRecettes();
            this.resetForm();
          },
          error: (error) => {
            console.error('Erreur lors de la modification de la recette:', error);
            alert('Erreur lors de la modification de la recette');
          }
        });
      } else {
        const nouvelleRecette: Recette = {
          ...formValue,
          dateCreation: new Date()
        };

        console.log('Nouvelle recette à ajouter:', nouvelleRecette);

        this.recetteService.addRecette(nouvelleRecette).subscribe({
          next: (recette) => {
            console.log('Recette ajoutée:', recette);
            this.loadRecettes();
            this.resetForm();
            alert('Recette ajoutée avec succès !');
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de la recette:', error);
            alert('Erreur lors de l\'ajout de la recette');
          }
        });
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.recetteForm.controls).forEach(key => {
        const control = this.recetteForm.get(key);
        if (control) {
          control.markAsTouched();
          console.log(`Champ ${key} invalide:`, control.errors);
        }
      });
    }
  }

  editRecette(recette: Recette) {
    this.isEditing = true;
    this.recetteToEdit = recette;
    this.imagePreview = recette.image;

    // Réinitialiser le tableau d'ingrédients
    this.ingredients.clear();
    recette.ingredients.forEach(ingredient => {
      this.ingredients.push(this.fb.control(ingredient, Validators.required));
    });

    // Remplir le formulaire avec les données de la recette
    this.recetteForm.patchValue({
      titre: recette.titre,
      description: recette.description,
      instructions: recette.instructions,
      tempsPreparation: recette.tempsPreparation,
      tempsCuisson: recette.tempsCuisson,
      difficulte: recette.difficulte,
      categorie: recette.categorie,
      image: recette.image
    });
  }

  deleteRecette(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      this.recetteService.deleteRecette(id).subscribe({
        next: () => {
          console.log('Recette supprimée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la recette:', error);
        }
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.isEditing = false;
    this.recetteToEdit = null;
    this.recetteForm.reset();
    this.imagePreview = null;
    this.ingredients.clear();
    this.addIngredient();
    Object.keys(this.recetteForm.controls).forEach(key => {
      const control = this.recetteForm.get(key);
      if (control) {
        control.setErrors(null);
        control.markAsUntouched();
      }
    });
  }

  private loadRecettes() {
    this.recetteService.getRecettes().subscribe({
      next: (recettes) => {
        console.log('Recettes chargées:', recettes);
        this.recettes = recettes;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recettes:', error);
      }
    });
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter de votre session administrateur ? ')) {
      this.router.navigate(['/home']);
    }
  }

  confirmLogout() {
    this.showLogoutConfirm = false;
    this.router.navigate(['/home']);
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }
} 