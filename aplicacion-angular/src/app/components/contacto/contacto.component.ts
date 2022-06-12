import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
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
  private httpClient: HttpClient, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.datosCorreo = this.formBuilder.group({
      asunto: new UntypedFormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
      mensaje: new UntypedFormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(2000)])
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

    this.httpClient.post("api/correos/enviar", elementosCorreo, {responseType: "text"}).subscribe((datos: any) => {
      console.log(datos);
    });
    alert("El correo fue exitosamente enviado.");
    this.datosCorreo.reset();
  }
}