import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  datosInicioSesion!: FormGroup;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.datosInicioSesion = new FormGroup({
      correoElectronico: new FormControl("", Validators.required),
      clave: new FormControl("", Validators.required)
    });
  }

}