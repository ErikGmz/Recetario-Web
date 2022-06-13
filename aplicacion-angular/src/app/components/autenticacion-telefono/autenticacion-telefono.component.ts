import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NumeroTelefono } from './numeroTelefono';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { VentanaService } from 'src/app/services/ventana.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-autenticacion-telefono',
  templateUrl: './autenticacion-telefono.component.html',
  styleUrls: ['./autenticacion-telefono.component.css']
})
export class AutenticacionTelefonoComponent implements OnInit, OnDestroy {
  datosRegistro!: UntypedFormGroup;
  numeroVerificacion!: UntypedFormGroup;
  numeroTelefono = new NumeroTelefono();
  captchaResuelto: boolean = false;

  constructor(private ventana: VentanaService, 
  public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.datosRegistro = new UntypedFormGroup({
      nombreCompleto: new UntypedFormControl({value: "", disabled: false}, 
      [Validators.required, Validators.minLength(10), Validators.maxLength(80)]),
      nombreUsuario: new UntypedFormControl({value: "", disabled: false}, 
      [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      paisNumero: new UntypedFormControl({value: "", disabled: false}, 
      [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("^[0-9]*$")]),
      zonaNumero: new UntypedFormControl({value: "", disabled: false}, 
      [Validators.required, Validators.minLength(2), Validators.maxLength(3), Validators.pattern("^[0-9]*$")]),
      prefijoNumero: new UntypedFormControl({value: "", disabled: false}, 
      [Validators.required, Validators.minLength(2), Validators.maxLength(3), Validators.pattern("^[0-9]*$")]),
      lineaNumero: new UntypedFormControl({value: "", disabled: false}, 
      [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]),
    });
    
    this.numeroVerificacion = new UntypedFormGroup({
      codigoVerificacion: new UntypedFormControl("", Validators.required)
    });

    this.autenticacion.referenciaVentana = this.ventana.referenciaVentana;
    this.autenticacion.referenciaVentana.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',
    {'callback': (respuesta: any) => {this.captchaResuelto = true}, 
    'expired-callback': (error: any) => {this.captchaResuelto = false}});
    this.autenticacion.referenciaVentana.recaptchaVerifier.render();
  }

  ngOnDestroy(): void {
    this.captchaResuelto = false;
    this.autenticacion.referenciaVentana.confirmationResult = null;
  }

  enviarMensajeVerificacion(paisNumero: string, zonaNumero: string, 
  prefijoNumero: string, lineaNumero: string) {
    this.numeroTelefono.pais = paisNumero;
    this.numeroTelefono.zona = zonaNumero;
    this.numeroTelefono.prefijo = prefijoNumero;
    this.numeroTelefono.linea = lineaNumero;
    this.autenticacion.enviarMensajeTelefono(this.numeroTelefono.formatoE164)
    .then((valor) => {
      this.captchaResuelto = false;
    })
    .catch((error) => {}); 
  }

  realizarInicioSesion(nombreCompleto: string, nombreUsuario: string,
  codigoVerificacion: string) {
    this.autenticacion.registrarUsuarioTelefono(nombreCompleto, nombreUsuario, codigoVerificacion);
  }

}