import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {
  @Input() recetasPrevias!: any;
  @Input() busquedaUnica!: boolean;
  listaRecetas!: any[];
  recetasDisponibles: boolean = false;
  favoritosRecetas: Map<String, boolean> = new Map<String, boolean>(); 
  mostrarLista: boolean = false;
  operacionesFavoritos: boolean = false;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    if(this.recetasPrevias === undefined) {
      this.operacionesFavoritos = true;
    }

    if(this.operacionesFavoritos) {
      this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
        console.log(datos);
        this.listaRecetas = datos;
        
        if(this.autenticacion.informacionAdicional.permisos === "Usuario") {
          this.listaRecetas.forEach((receta: any) => {
            this.verificarRecetaFavorita(receta.ID);
          });
        }
        this.mostrarLista = this.autenticacion.obtenerImagenesRecetas(this.listaRecetas);
        if(this.verificarExistenciaRecetas()) this.recetasDisponibles = true;
      });
    }
    else if(this.busquedaUnica) {
      if(this.recetasPrevias !== null) {
        this.listaRecetas = new Array(this.recetasPrevias);
        this.mostrarLista = this.autenticacion.obtenerImagenesRecetas(this.listaRecetas);
        if(this.verificarExistenciaRecetas()) this.recetasDisponibles = true;
      }
      else {
        this.listaRecetas = [];
        this.mostrarLista = true;
      }
    }
    else {
      this.listaRecetas = [];
      let recetasFavoritas = JSON.parse(localStorage.getItem("informacionExtraUsuario")!).recetasFavoritas;
      
      this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
        console.log(datos);

        recetasFavoritas.forEach((IDReceta: any) => {
          let busqueda = datos.find((receta: any) => {return IDReceta === receta.ID})
          if(busqueda !== undefined) this.listaRecetas.push(busqueda);
        });

        this.mostrarLista = this.autenticacion.obtenerImagenesRecetas(this.listaRecetas);
        if(this.verificarExistenciaRecetas()) this.recetasDisponibles = true;
      });
    }
  }

  verificarExistenciaRecetas(): boolean {
    return this.listaRecetas.length > 0;
  }

  verificarRecetaFavorita(IDReceta: string) {
    let bandera: boolean = true; 
    if(JSON.parse(localStorage.getItem("informacionExtraUsuario")!).recetasFavoritas.find((identificadorReceta: any) => {
      return identificadorReceta === IDReceta
    }) !== undefined) bandera = false;
    this.favoritosRecetas.set(IDReceta, bandera);
  }

  agregarAFavoritos(IDReceta: string) {
    this.autenticacion.agregarFavorito(this.autenticacion.datosUsuarioActual.uid, IDReceta).subscribe((datos) => {
      this.autenticacion.incrementarFavorito(IDReceta).subscribe((datosAdicionales) => {
        console.log(datos);
        console.log(datosAdicionales);
        this.favoritosRecetas.set(IDReceta, false);
        let listaRecetas = JSON.parse(localStorage.getItem("informacionExtraUsuario")!);
        listaRecetas.recetasFavoritas.push(IDReceta);
        this.autenticacion.informacionAdicional = listaRecetas;
        localStorage.setItem("informacionExtraUsuario", JSON.stringify(this.autenticacion.informacionAdicional));
      })
    })
  }

  removerDeFavoritos(IDReceta: string) {
    this.autenticacion.removerFavorito(this.autenticacion.datosUsuarioActual.uid, IDReceta).subscribe((datos) => {
      this.autenticacion.restarFavorito(IDReceta).subscribe((datosAdicionales) => {
        console.log(datos);
        console.log(datosAdicionales);
        this.favoritosRecetas.set(IDReceta, true);
        let listaRecetas = JSON.parse(localStorage.getItem("informacionExtraUsuario")!);
        listaRecetas.recetasFavoritas = listaRecetas.recetasFavoritas.filter((receta: any) => {
          return receta !== IDReceta
        });
        this.autenticacion.informacionAdicional = listaRecetas;
        localStorage.setItem("informacionExtraUsuario", JSON.stringify(this.autenticacion.informacionAdicional));
      })
    })
  }

  definirDatosCodigoQR(numeroReceta: number): string {
    return JSON.stringify(this.listaRecetas[numeroReceta]);
  }
}