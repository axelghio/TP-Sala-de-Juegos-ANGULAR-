import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupaComponent } from './ocupa.component';

describe('OcupaComponent', () => {
  let component: OcupaComponent;
  let fixture: ComponentFixture<OcupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
