import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})
export class AgregarRecetaComponent implements OnInit {
  imagenReceta!: any;
  datosRegistro!: FormGroup;
  cantidadCamposIngredientes: number = 1;
  cantidadCamposPasos: number = 1;
  @Input() recetaAEditar!: any;
  habilitarEdicion!: boolean;

  constructor(public autenticacion: AutenticacionService,
  private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.habilitarEdicion = (this.recetaAEditar !== undefined);

    this.datosRegistro = this.formBuilder.group({
      nombreReceta: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      tipoReceta: new FormControl("", Validators.required),
      descripcionReceta: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
      imagenReceta: new FormControl("", [Validators.required, this.verificarArchivoImagen]),
      datosIngredientes: new FormGroup({
        ingrediente1Receta: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
      }),
      datosPasos: new FormGroup({
        paso1Receta: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(200)])
      })
    });

    if(this.habilitarEdicion) {
      for(let i = 1; i <= this.recetaAEditar.ingredientes.length; i++) {
        if(i >= 2) this.agregarCampoIngrediente();
        let nombrePropiedad = "ingrediente" + i + "Receta";

        this.datosRegistro.controls["datosIngredientes"].patchValue({
          [nombrePropiedad]: this.recetaAEditar.ingredientes[i - 1]
        });
      }
      
      for(let i = 1; i <= this.recetaAEditar.pasos.length; i++) {
        if(i >= 2) this.agregarCampoPaso();
        let nombrePropiedad = "paso" + i + "Receta";

        this.datosRegistro.controls["datosPasos"].patchValue({
          [nombrePropiedad]: this.recetaAEditar.pasos[i - 1]
        });
      }
      this.datosRegistro.patchValue({
        nombreReceta: this.recetaAEditar.nombreReceta,
        tipoReceta: this.recetaAEditar.tipoReceta,
        descripcionReceta: this.recetaAEditar.descripcion,
        imagenReceta: this.imagenReceta
      });
    }
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
        case "webp":
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
    new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]));
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
    new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]));
  }

  eliminarCampoPaso() {
    let pasos = this.datosRegistro.get("datosPasos") as FormGroup;
    pasos.removeControl(`paso${this.cantidadCamposPasos--}Receta`);
  }

  registrarReceta() {
    const campos = this.datosRegistro.controls;
    const imagen = campos["imagenReceta"].value;
    const nombreImagen = imagen.substring(imagen.lastIndexOf('\\') + 1, imagen.length);
    const cantidadFavoritos = (this.recetaAEditar !== undefined 
    ? this.recetaAEditar.cantidadFavoritos : 0);

    let datosReceta: any = {
      nombreReceta: campos["nombreReceta"].value.trim(),
      tipoReceta: campos["tipoReceta"].value.trim(),
      descripcion: campos["descripcionReceta"].value.trim(),
      nombreImagen: nombreImagen,
      ingredientes: this.convertirObjetoEnArreglo(campos['datosIngredientes'].value),
      pasos: this.convertirObjetoEnArreglo(campos['datosPasos'].value),
      cantidadFavoritos: cantidadFavoritos
    }

    this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
      if(!this.habilitarEdicion) {
        if(datos.find((receta: any) => {return receta.nombreReceta === campos["nombreReceta"].value}) !== undefined) {
          alert("La receta ya está registrada en el sistema.");
          return;
        }
        else if(datos.find((receta: any) => {return receta.nombreImagen === nombreImagen}) !== undefined) {
          alert("El archivo de imagen ya está alojado en el sistema.");
          return;
        }
        if(this.autenticacion.registrarReceta(datosReceta, this.imagenReceta)) {
          setTimeout(() => {
            alert("La receta fue exitosamente registrada.");
            this.datosRegistro.reset();
          }, 3000);
        }
      }
      else {
        if(datos.find((receta: any) => {
          return !(receta.nombreReceta !== campos["nombreReceta"].value
          || (receta.nombreReceta === this.recetaAEditar.nombreReceta
          && receta.nombreReceta === campos["nombreReceta"].value))
        }) !== undefined) {
          alert("La nueva receta ya está registrada en el sistema.");
          return;
        }

        if(datos.find((receta: any) => {
          return !(receta.nombreImagen !== nombreImagen
          || (receta.nombreImagen === this.recetaAEditar.nombreImagen
          && receta.nombreImagen === nombreImagen))
        }) !== undefined) {
          alert("El nuevo archivo de imagen ya está alojado en el sistema.");
          return;
        }

        datosReceta['ID'] = this.recetaAEditar.ID;
        if(this.autenticacion.actualizarReceta(this.recetaAEditar.nombreImagen, datosReceta, this.imagenReceta)) {
          setTimeout(() => {
            alert("La receta fue exitosamente actualizada.");
            location.reload();
          }, 5000);
        }
      }
    })
  }
}