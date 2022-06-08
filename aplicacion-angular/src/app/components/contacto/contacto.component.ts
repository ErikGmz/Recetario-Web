import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  datosCorreo!: any;

  constructor(public autenticacion: AutenticacionService, 
  private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.datosCorreo = this.formBuilder.group({
      asunto: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
      mensaje: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(2000)])
    });
  }

  enviarCorreo(asunto: string, mensaje: string) {
    let nombreUsuario;
    if(this.autenticacion.datosUsuarioActual?.displayName === undefined) {
      nombreUsuario = "Invitado";
    }
    else {
      nombreUsuario = this.autenticacion.datosUsuarioActual.displayName;
    }

    let elementosCorreo = {
      asunto: asunto,
      mensaje: mensaje,
      nombreCompleto: this.autenticacion.informacionAdicional.nombreCompleto,
      nombreUsuario: nombreUsuario
    }

    this.httpClient.post("api/correos/enviar", elementosCorreo).subscribe((datos: any) => {
      console.log(datos.data());
    });
    alert("El correo fue exitosamente enviado.");
    this.datosCorreo.reset();
  }
}