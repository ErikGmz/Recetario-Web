import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {

  constructor(private autenticacion: AutenticacionService,
  private router: Router) {
  }

  canActivate() {
    let usuarioActual = JSON.parse(localStorage.getItem("informacionExtraUsuario")!);
    if(usuarioActual?.permisos !== "Usuario") {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}