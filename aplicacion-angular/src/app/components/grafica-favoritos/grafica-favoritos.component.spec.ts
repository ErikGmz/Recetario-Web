import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaFavoritosComponent } from './grafica-favoritos.component';

describe('GraficaFavoritosComponent', () => {
  let component: GraficaFavoritosComponent;
  let fixture: ComponentFixture<GraficaFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaFavoritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
