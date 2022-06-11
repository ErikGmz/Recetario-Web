import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {
  listaRecetas!: any[];
  favoritosRecetas: Map<String, boolean> = new Map<String, boolean>(); 
  mostrarLista: boolean = false;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
      setTimeout(() => {
        console.log(datos);
        this.listaRecetas = datos;
        
        if(this.autenticacion.informacionAdicional.permisos === "Usuario") {
          this.listaRecetas.forEach((receta: any) => {
            this.verificarRecetaFavorita(receta.ID);
          });
        }
        this.mostrarLista = this.autenticacion.obtenerImagenesRecetas(this.listaRecetas);
      }, 2000);
    });
  }

  verificarRecetaFavorita(IDReceta: string) {
    let bandera: boolean = true; 
    if(this.autenticacion.informacionAdicional.recetasFavoritas.find((identificadorReceta: any) => {
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
      })
    })
  }

  removerDeFavoritos(IDReceta: string) {
    this.autenticacion.removerFavorito(this.autenticacion.datosUsuarioActual.uid, IDReceta).subscribe((datos) => {
      this.autenticacion.restarFavorito(IDReceta).subscribe((datosAdicionales) => {
        console.log(datos);
        console.log(datosAdicionales);
        this.favoritosRecetas.set(IDReceta, true);
      })
    })
  }

  definirDatosCodigoQR(numeroReceta: number): string {
    return JSON.stringify(this.listaRecetas[numeroReceta]);
  }
}