import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomeComponent } from './AdminHome.component';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHomeComponent]
    });
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
