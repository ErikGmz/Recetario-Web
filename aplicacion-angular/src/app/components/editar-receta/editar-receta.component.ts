import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.css']
})
export class EditarRecetaComponent implements OnInit {
  busquedaReceta: string = "";
  busquedaRealizada: boolean = false;
  busquedaFinalizada!: boolean;
  busquedaFallida!: boolean
  datosEdicionReceta!: any;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
  }

  buscarReceta() {
    this.busquedaRealizada = true;
    this.busquedaFinalizada = false;
    this.busquedaFallida = false;

    this.autenticacion.obtenerReceta(this.busquedaReceta).subscribe((datos: any) => {
      this.busquedaFinalizada = true;
      this.datosEdicionReceta = datos;
      if(this.datosEdicionReceta === undefined) {
        this.busquedaFallida = true;
      }
    });
  }

}