import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})
export class AgregarRecetaComponent implements OnInit {
  @ViewChild("camposIngredientes") camposIngredientes!: ElementRef;
  @ViewChild("camposPreparacion") camposPreparacion!: ElementRef;
  datosRegistro!: FormGroup;
  cantidadCamposIngredientes: number = 1;
  cantidadCamposPasos: number = 1;

  constructor(public autenticacionService: AutenticacionService) { 
  }

  ngOnInit(): void {
    this.datosRegistro = new FormGroup({
      nombreReceta: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      tipoReceta: new FormControl("", Validators.required),
      descripcionReceta: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
      imagenReceta: new FormControl("", [Validators.required, this.verificarArchivoImagen]),
      datosIngredientes: new FormGroup({
        ingrediente1Receta: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
      }),
      datosPasos: new FormGroup({
        paso1Receta: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
      })
    });
  }

  verificarArchivoImagen(campoImagen: FormControl) {
    const archivo = campoImagen.value;
    if(archivo) {
      const extension = archivo.split('.')[1].toLowerCase();
      switch(extension) {
        case "png":
        case "jpg":
        case "gif":
        case "jpeg": return null;
        default: return {archivoImagen: true};
      }
    }
    return {archivoImagen: true};
  }

  desactivarBotonEliminarCampoIngrediente() {
    return(this.cantidadCamposIngredientes < 2);
  }

  indicarInvalidezCampoIngrediente(numeroCampo: number) {
    return !this.datosRegistro.get('datosIngredientes')?.get(`ingrediente${numeroCampo}Receta`)?.valid 
		&& this.datosRegistro.get('datosIngredientes')?.get(`ingrediente${numeroCampo}Receta`)?.dirty
  }

  indicarValidezCampoIngrediente(numeroCampo: number) {
    return this.datosRegistro.get('datosIngredientes')?.get(`ingrediente${numeroCampo}Receta`)?.valid;
  }

  agregarCampoIngrediente() {
    this.cantidadCamposIngredientes++;
    let ingredientes = this.datosRegistro.get("datosIngredientes") as FormGroup;
    ingredientes.addControl(`ingrediente${this.cantidadCamposIngredientes}Receta`,
    new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]));
  }
  
  eliminarCampoIngrediente() {
    let ingredientes = this.datosRegistro.get("datosIngredientes") as FormGroup;
    ingredientes.removeControl(`ingrediente${this.cantidadCamposIngredientes--}Receta`);
  }

  desactivarBotonEliminarCampoPaso() {
    return(this.cantidadCamposPasos < 2);
  }

  indicarInvalidezCampoPaso(numeroCampo: number) {
    return !this.datosRegistro.get('datosPasos')?.get(`paso${numeroCampo}Receta`)?.valid 
		&& this.datosRegistro.get('datosPasos')?.get(`paso${numeroCampo}Receta`)?.dirty
  }

  indicarValidezCampoPaso(numeroCampo: number) {
    return this.datosRegistro.get('datosPasos')?.get(`paso${numeroCampo}Receta`)?.valid;
  }

  agregarCampoPaso() {
    this.cantidadCamposPasos++;
    let pasos = this.datosRegistro.get("datosPasos") as FormGroup;
    pasos.addControl(`paso${this.cantidadCamposPasos}Receta`,
    new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]));
  }

  eliminarCampoPaso() {
    let pasos = this.datosRegistro.get("datosPasos") as FormGroup;
    pasos.removeControl(`paso${this.cantidadCamposPasos--}Receta`);
  }
}