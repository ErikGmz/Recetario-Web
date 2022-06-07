import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  styleUrls: ['./registro-cuenta.component.css']
})
export class RegistroCuentaComponent implements OnInit {
  datosRegistro!: FormGroup;

  constructor(private formBuilder: FormBuilder, public autenticacionService: AutenticacionService) { 
  }

  ngOnInit(): void {
    this.datosRegistro = this.formBuilder.group({
      nombreCompleto: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(80)]),
      correoElectronico: new FormControl("", [Validators.required, Validators.email]),
      nombreUsuario: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      clave: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      primeraConfirmacionClave: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      segundaConfirmacionClave: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmarVerificacion: new FormControl("", Validators.required)
    }, {
      validators: [
        this.verificarConfirmacion("clave", "primeraConfirmacionClave"),
        this.verificarConfirmacion("clave", "segundaConfirmacionClave"),
      ]
    })
  }

  verificarConfirmacion(clave: string, confirmacionClave: string) {
    return (formGroup: FormGroup) => {
      const controlClave = formGroup.controls[clave];
      const controlConfirmacion = formGroup.controls[confirmacionClave];

      if(controlConfirmacion.errors && !controlConfirmacion.errors['verificarConfirmacion']) {
        return;
      }
      if(controlClave.value != controlConfirmacion.value) {
        controlConfirmacion.setErrors({verificarConfirmacion: true});
      }
      else {
        controlConfirmacion.setErrors(null);
      }
    }
  }
}