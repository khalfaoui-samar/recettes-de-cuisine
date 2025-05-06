import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface UserProfile {
  username: string;
  email: string;
  role: string;
  memberSince: Date;
  profileImage?: string;
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ReactiveFormsModule]
})
export class ProfilComponent implements OnInit {
  userProfile: UserProfile = {
    username: '',
    email: '',
    role: '',
    memberSince: new Date()
  };

  editMode = false;
  editForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userProfile = {
        username: currentUser.firstName + ' ' + currentUser.lastName,
        email: currentUser.email,
        role: currentUser.role,
        memberSince: new Date(currentUser.dateCreation || Date.now())
      };
    } else {
      this.router.navigate(['/login']);
    }
  }

  onEditProfile() {
    this.editMode = true;
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // Récupérer la photo de profil existante
      const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (storedUser.profileImage) {
        this.previewUrl = storedUser.profileImage;
      }

      this.editForm.patchValue({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || ''
      });
    }
  }

  onCancelEdit() {
    this.editMode = false;
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier si c'est une image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      this.selectedFile = file;

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmitEdit() {
    if (this.editForm.valid) {
      // Créer l'objet de mise à jour
      const updateData: any = {
        firstName: this.editForm.get('firstName')?.value,
        lastName: this.editForm.get('lastName')?.value,
        email: this.editForm.get('email')?.value
      };

      // Si une nouvelle image a été sélectionnée
      if (this.selectedFile && this.previewUrl) {
        updateData.profileImage = this.previewUrl;
      }

      // Mettre à jour le profil dans le service
      this.authService.updateProfile(updateData);

      // Mettre à jour l'affichage local
      this.userProfile = {
        ...this.userProfile,
        username: `${updateData.firstName} ${updateData.lastName}`,
        email: updateData.email,
        profileImage: updateData.profileImage || this.userProfile.profileImage
      };

      // Sauvegarder dans le localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        ...JSON.parse(localStorage.getItem('currentUser') || '{}'),
        profileImage: this.userProfile.profileImage
      }));

      // Réinitialiser le mode édition
      this.editMode = false;
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  onChangePassword() {
    // Implémenter la logique de changement de mot de passe
    console.log('Changement de mot de passe');
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }
  }
}
