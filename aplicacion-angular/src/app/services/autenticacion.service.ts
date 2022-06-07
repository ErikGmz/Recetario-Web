import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  datosUsuarioActual: any;

  constructor(public autenticacion: AngularFireAuth, 
  public router: Router, public baseDatos: AngularFirestore, 
  public ngZone: NgZone, private httpClient: HttpClient) { 
    //Actualizar la información del usuario en el
    //localStorage cuando ocurra un inicio o cierre
    //de sesión.
    this.autenticacion.authState.subscribe((usuario) => {
      if(usuario) {
        this.datosUsuarioActual = usuario;
        localStorage.setItem('datosUsuario', JSON.stringify(this.datosUsuarioActual));
        JSON.parse(localStorage.getItem('datosUsuario')!);
      } 
      else {
        localStorage.setItem('datosUsuario', 'null');
        JSON.parse(localStorage.getItem('datosUsuario')!);
      }
    });
  }

  registrarUsuario(nombreCompleto: string, correo: string, nombreUsuario: string, clave: string) {
    this.autenticacion.createUserWithEmailAndPassword(correo, clave)
    .then((credencialUsuario) => {
      //Completar los datos del perfil del usuario nuevo.
      credencialUsuario.user?.updateProfile({displayName: nombreUsuario})
      .then(() => {
        //Almacenar toda la información del usuario nuevo.
        this.datosUsuarioActual = credencialUsuario.user;
        this.agregarUsuarioABaseDatos(nombreCompleto);

        //Cerrar la sesión automáticamente creada.
        setTimeout(() => {
          alert("El usuario fue exitosamente registrado.");
          this.cerrarSesion(); 
          this.router.navigate(["/inicio-sesion"]);
        }, 1000);
      })
      .catch(this.desplegarError);
    })
    .catch(this.desplegarError);
  }

  agregarUsuarioABaseDatos(nombreCompleto: string) {
    let datosUsuarioNuevo = {
      ID: this.datosUsuarioActual.uid,
      correoElectronico: this.datosUsuarioActual.email,
      nombreCompleto: nombreCompleto,
      nombreUsuario: this.datosUsuarioActual.displayName
    }

    this.httpClient.post("/api/agregar-usuario", datosUsuarioNuevo).subscribe((datos) => {
      console.log(datos);
    })
  }

  cerrarSesion() {
    this.autenticacion.signOut().then(() => {
      localStorage.removeItem('datosUsuario');
      this.datosUsuarioActual = null;
    })
    .catch(this.desplegarError);
  }

  desplegarError(error: any) {
    console.log("Error " + error.code + ": " + error.message + ".");
    alert("Error " + error.code + ": " + error.message + ".");
  }
}