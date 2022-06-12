import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AccesibilidadWebService } from 'src/app/services/accesibilidad-web.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public autenticacion: AutenticacionService, 
  public accesibilidad: AccesibilidadWebService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    if(confirm('¿Desea cerrar sesión?')) {
      this.autenticacion.cerrarSesion();
    }
  }

}