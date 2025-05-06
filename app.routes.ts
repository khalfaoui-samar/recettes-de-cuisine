import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './UserHome/UserHome.component';
import { AdminHomeComponent } from './AdminHome/AdminHome.component';
import { GererRecettesComponent } from './GererRecettes/GererRecettes.component';
import { AboutComponent } from './about/about.component';
import { ProfilComponent } from './profil/profil.component';
import { RecettesComponent } from './Recettes/Recettes.component';
import { MenuComponent } from './menu/menu.component';
import { RecettesParCategorieComponent } from './RecettesParCategorie/RecettesParCategorie.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userhome', component: UserHomeComponent },
  { path: 'AdminHome', component: AdminHomeComponent },
  { path: 'GererRecettes', component: GererRecettesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'recettes', component: RecettesComponent },
  { path: 'recettes/:categorie', component: RecettesParCategorieComponent },
  { path: 'recette/:id', component: MenuComponent },
  { path: 'service', component: AboutComponent },
  { path: 'faq', component: AboutComponent },
  { path: 'favoris', component: RecettesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];