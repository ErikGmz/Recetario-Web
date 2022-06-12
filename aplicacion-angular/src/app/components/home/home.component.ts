import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AccesibilidadWebService } from 'src/app/services/accesibilidad-web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public autenticacion: AutenticacionService,
  public accesibilidad: AccesibilidadWebService) { }

  ngOnInit(): void {
  }

}