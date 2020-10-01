import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionesGlobalesComponent } from './clasificaciones-globales.component';

describe('ClasificacionesGlobalesComponent', () => {
  let component: ClasificacionesGlobalesComponent;
  let fixture: ComponentFixture<ClasificacionesGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificacionesGlobalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionesGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
