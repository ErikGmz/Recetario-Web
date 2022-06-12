import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecetasFavoritasComponent } from './lista-recetas-favoritas.component';

describe('ListaRecetasFavoritasComponent', () => {
  let component: ListaRecetasFavoritasComponent;
  let fixture: ComponentFixture<ListaRecetasFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRecetasFavoritasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecetasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});