import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})
export class AgregarRecetaComponent implements OnInit {
  @ViewChild("camposIngredientes") camposIngredientes!: ElementRef;
  @ViewChild("camposPreparacion") camposPreparacion!: ElementRef;
  imagenReceta!: any;
  datosRegistro!: FormGroup;
  cantidadCamposIngredientes: number = 1;
  cantidadCamposPasos: number = 1;

  constructor(public autenticacion: AutenticacionService,
  private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.datosRegistro = this.formBuilder.group({
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

  convertirObjetoEnArreglo(objeto: any) {
    let arreglo = [];
    for(let llave in objeto) {
      if(objeto.hasOwnProperty(llave)) {
        arreglo.push(objeto[llave]);
      }
    }
    return arreglo;
  }

  cargarImagenReceta(evento: any) {
    this.imagenReceta = evento.target.files[0];
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

  desactivarBotonAgregarCampoIngrediente() {
    return(this.cantidadCamposIngredientes > 19);
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

  desactivarBotonAgregarCampoPaso() {
    return(this.cantidadCamposPasos > 19);
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

  registrarReceta() {
    const campos = this.datosRegistro.controls;
    const imagen = campos["imagenReceta"].value;
    const nombreImagen = imagen.substring(imagen.lastIndexOf('\\') + 1, imagen.length);

    const datosReceta = {
      nombreReceta: campos["nombreReceta"].value.trim(),
      tipoReceta: campos["tipoReceta"].value.trim(),
      descripcion: campos["descripcionReceta"].value.trim(),
      nombreImagen: nombreImagen,
      ingredientes: this.convertirObjetoEnArreglo(campos['datosIngredientes'].value),
      pasos: this.convertirObjetoEnArreglo(campos['datosPasos'].value),
      cantidadFavoritos: 0
    }

    this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
      if(datos.find((receta: any) => {return receta.nombreReceta === campos["nombreReceta"].value}) !== undefined) {
        alert("La receta ya está registrada en el sistema.");
        return;
      }
      else if(datos.find((receta: any) => {return receta.nombreImagen === nombreImagen}) !== undefined) {
        alert("El archivo de imagen ya está alojado en el sistema.");
        return;
      }
      if(this.autenticacion.registrarReceta(datosReceta, this.imagenReceta)) {
        alert("La receta fue exitosamente registrada.");
        this.datosRegistro.reset();
      }
    })
  }
}