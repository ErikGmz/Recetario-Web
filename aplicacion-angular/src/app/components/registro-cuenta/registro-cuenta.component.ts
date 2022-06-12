import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  styleUrls: ['./registro-cuenta.component.css']
})
export class RegistroCuentaComponent implements OnInit {
  datosRegistro!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, 
  public autenticacionService: AutenticacionService) { 
  }

  ngOnInit(): void {
    this.datosRegistro = this.formBuilder.group({
      nombreCompleto: new UntypedFormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(80)]),
      correoElectronico: new UntypedFormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      nombreUsuario: new UntypedFormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      clave: new UntypedFormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      primeraConfirmacionClave: new UntypedFormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      segundaConfirmacionClave: new UntypedFormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmarVerificacion: new UntypedFormControl("", Validators.required)
    }, {
      validators: [
        this.verificarConfirmacion("clave", "primeraConfirmacionClave"),
        this.verificarConfirmacion("clave", "segundaConfirmacionClave"),
      ]
    })
  }

  verificarConfirmacion(clave: string, confirmacionClave: string) {
    return (formGroup: UntypedFormGroup) => {
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