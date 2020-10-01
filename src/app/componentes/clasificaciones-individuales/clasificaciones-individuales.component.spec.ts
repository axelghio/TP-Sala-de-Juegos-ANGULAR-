import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionesIndividualesComponent } from './clasificaciones-individuales.component';

describe('ClasificacionesIndividualesComponent', () => {
  let component: ClasificacionesIndividualesComponent;
  let fixture: ComponentFixture<ClasificacionesIndividualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificacionesIndividualesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionesIndividualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
