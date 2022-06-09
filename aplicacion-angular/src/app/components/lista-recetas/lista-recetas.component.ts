import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css']
})
export class ListaRecetasComponent implements OnInit {
  listaRecetas!: any[];

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
      console.log(datos);
      this.listaRecetas = datos;
      this.autenticacion.obtenerImagenesRecetas(this.listaRecetas);
    });
  }

  definirDatosCodigoQR(numeroReceta: number): string {
    return JSON.stringify(this.listaRecetas[numeroReceta]);
  }
}