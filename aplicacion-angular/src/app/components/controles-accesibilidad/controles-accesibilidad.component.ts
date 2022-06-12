import { Component, Input, OnInit } from '@angular/core';
import { AccesibilidadWebService } from 'src/app/services/accesibilidad-web.service';

@Component({
  selector: 'app-controles-accesibilidad',
  templateUrl: './controles-accesibilidad.component.html',
  styleUrls: ['./controles-accesibilidad.component.css']
})
export class ControlesAccesibilidadComponent implements OnInit {
  @Input() textoLectura!: string;

  constructor(public accesibilidad: AccesibilidadWebService) { }

  ngOnInit(): void {
  }

}