import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteAdminComponent } from './estudiante-admin.component';

describe('EstudianteAdminComponent', () => {
  let component: EstudianteAdminComponent;
  let fixture: ComponentFixture<EstudianteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
