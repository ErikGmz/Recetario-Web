import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  listaUsuarios!: any[];

  constructor(public autenticacion: AutenticacionService) { 
  }

  ngOnInit(): void {
    this.autenticacion.obtenerUsuarios().subscribe((datos: any) => {
      console.log(datos);
      this.listaUsuarios = datos;
    })
  }

}