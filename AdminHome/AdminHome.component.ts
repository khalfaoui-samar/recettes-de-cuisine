import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { User } from '../Entites/User.Entites';
import { Router, RouterModule } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-home',
  templateUrl: './AdminHome.component.html',
  styleUrls: ['./AdminHome.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgChartsModule
  ]
})
export class AdminHomeComponent implements OnInit {
  listeUser: User[] = [];
  newUser: User = {};
  userStats: any[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Comptes créés' }
    ]
  };
  showAddForm = false;
  showLogoutConfirm = false;
  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadUserStats();
  }

  loadUsers() {
    this.service.getAllUsers().subscribe(users => this.listeUser = users);
  }

  loadUserStats() {
    this.service.getUserStatsByDay().subscribe(stats => {
      this.userStats = stats;
      this.barChartData.labels = stats.map((s: any) => s.date);
      this.barChartData.datasets[0].data = stats.map((s: any) => s.count);
    });
  }

  addUser() {
    this.service.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = {};
      this.showAddForm = false;
      this.loadUserStats();
    });
  }

  deleteUser(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      this.service.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter de votre session administrateur ? ')) {
      this.router.navigate(['/login']);
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
