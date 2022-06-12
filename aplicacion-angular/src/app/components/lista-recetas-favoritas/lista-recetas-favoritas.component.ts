import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-lista-recetas-favoritas',
  templateUrl: './lista-recetas-favoritas.component.html',
  styleUrls: ['./lista-recetas-favoritas.component.css']
})
export class ListaRecetasFavoritasComponent implements OnInit {
  recetasABuscar!: any;

  constructor(public autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.recetasABuscar = this.autenticacion.informacionAdicional.recetasFavoritas;
  }

}