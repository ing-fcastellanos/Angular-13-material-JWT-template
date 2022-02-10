import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoprivacidadComponent } from './avisoprivacidad.component';

describe('AvisoprivacidadComponent', () => {
  let component: AvisoprivacidadComponent;
  let fixture: ComponentFixture<AvisoprivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoprivacidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoprivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
