import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { User } from '../Entites/User.Entites';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-Gerer-Recettes',
  templateUrl: './GererRecettes.component.html',
  styleUrls: ['./GererRecettes.component.css']
})
export class GererRecettesComponent implements OnInit {
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
    this.showLogoutConfirm = true;
  }

  confirmLogout() {
    this.showLogoutConfirm = false;
    this.router.navigate(['/home']);
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }
}

describe('GererRecettesComponent', () => {
  let component: GererRecettesComponent;
  let fixture: ComponentFixture<GererRecettesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GererRecettesComponent]
    });
    fixture = TestBed.createComponent(GererRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
