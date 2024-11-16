import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAdminComponent } from './curso-admin.component';

describe('CursoAdminComponent', () => {
  let component: CursoAdminComponent;
  let fixture: ComponentFixture<CursoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
