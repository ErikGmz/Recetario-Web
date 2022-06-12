import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesAccesibilidadComponent } from './controles-accesibilidad.component';

describe('ControlesAccesibilidadComponent', () => {
  let component: ControlesAccesibilidadComponent;
  let fixture: ComponentFixture<ControlesAccesibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlesAccesibilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesAccesibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});