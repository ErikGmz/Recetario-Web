import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  datosInicioSesion!: UntypedFormGroup;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.datosInicioSesion = new UntypedFormGroup({
      correoElectronico: new UntypedFormControl("", Validators.required),
      clave: new UntypedFormControl("", Validators.required)
    });
  }

}