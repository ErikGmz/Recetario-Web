import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.css']
})
export class BuscarRecetaComponent implements OnInit {
  busquedaReceta: string = "";
  busquedaRealizada: boolean = false;
  busquedaFinalizada!: boolean;
  recetaABuscar!: any;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
  }

  buscarReceta() {
    this.busquedaRealizada = true;
    this.busquedaFinalizada = false;

    this.autenticacion.obtenerReceta(this.busquedaReceta).subscribe((datos: any) => {
      this.busquedaFinalizada = true;
      this.recetaABuscar = datos;
    });
  }

}