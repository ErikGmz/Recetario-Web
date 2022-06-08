import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionTelefonoComponent } from './autenticacion-telefono.component';

describe('AutenticacionTelefonoComponent', () => {
  let component: AutenticacionTelefonoComponent;
  let fixture: ComponentFixture<AutenticacionTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutenticacionTelefonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacionTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});