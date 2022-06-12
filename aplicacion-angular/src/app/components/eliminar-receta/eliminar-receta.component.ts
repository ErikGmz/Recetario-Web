import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-eliminar-receta',
  templateUrl: './eliminar-receta.component.html',
  styleUrls: ['./eliminar-receta.component.css']
})
export class EliminarRecetaComponent implements OnInit {
  datosReceta!: UntypedFormGroup;

  constructor(public autenticacion: AutenticacionService,
  private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.datosReceta = this.formBuilder.group({
      idReceta: new UntypedFormControl("", Validators.required)
    });
  }

  eliminarReceta() {
    this.autenticacion.obtenerReceta(this.datosReceta.controls['idReceta'].value).subscribe((datos: any) => {
      console.log(datos);
      if(datos === null) {
        alert("La receta no fue encontrada en el sistema.");
        return;
      }
      if(confirm("¿Desea eliminar la receta '" + datos.nombreReceta + "'?")) {
        if(this.autenticacion.eliminarReceta(this.datosReceta.controls['idReceta'].value, datos.nombreImagen)) {
          setTimeout(() => {
            alert("La receta fue exitosamente eliminada.");
            this.datosReceta.reset();
          }, 5000);
        }
      }
    });
  }
}