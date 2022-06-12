import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AccesibilidadWebService } from 'src/app/services/accesibilidad-web.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  constructor(public autenticacion: AutenticacionService,
  public accesibilidad: AccesibilidadWebService) { }

  ngOnInit(): void {
  }

}