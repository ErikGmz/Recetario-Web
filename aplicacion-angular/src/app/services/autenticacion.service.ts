import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  datosUsuarioActual: any;
  informacionAdicional = {
    nombreCompleto: "Invitado",
    permisos: ""
  };

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

        this.obtenerUsuario(this.datosUsuarioActual.uid).subscribe((datos: any) => {
          (datos?.nombreCompleto === undefined ? this.informacionAdicional.nombreCompleto = "Invitado"
          : this.informacionAdicional.nombreCompleto = datos.nombreCompleto);

          (datos?.permisos === undefined ? this.informacionAdicional.permisos = ""
          : this.informacionAdicional.permisos = datos.permisos);
        });
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
        alert("El usuario fue exitosamente registrado.");
        this.cerrarSesion(); 
        this.router.navigate(["/inicio-sesion"]);
      })
      .catch(this.desplegarError);
    })
    .catch(this.desplegarError);
  }

  agregarUsuarioABaseDatos(nombreCompleto: string) {
    //Obtener los datos del usuario actual y registrarlos en la base de datos.
    let datosUsuarioNuevo = {
      ID: this.datosUsuarioActual.uid,
      correoElectronico: this.datosUsuarioActual.email,
      nombreCompleto: nombreCompleto,
      nombreUsuario: this.datosUsuarioActual.displayName,
      permisos: "Usuario"
    }

    this.httpClient.post("/api/usuarios/agregar", datosUsuarioNuevo).subscribe((datos) => {
      console.log(datos);
    })
  }

  borrarUsuarioActual() {
    if(confirm("¿Desea borrar su cuenta?")) {
      if(confirm("¿Realmente desea borrar su cuenta? (Operación permanente).")) {
        this.autenticacion.currentUser
        .then((usuario) => {
          //Borrar el usuario y todos sus datos registrados.
          usuario?.delete();
          this.eliminarUsuarioBaseDatos(this.datosUsuarioActual.uid);
          alert("El usuario fue exitosamente eliminado.");
          this.cerrarSesion();
        })
        .catch(this.desplegarError);
      }
    }
  }

  eliminarUsuarioBaseDatos(ID: string) {
    this.httpClient.delete("/api/usuarios/eliminar/" + ID).subscribe((datos) => {
      console.log(datos);
    })
  }

  obtenerUsuario(ID: string): any {
    return this.httpClient.get("/api/usuarios/obtener/" + ID);
  }

  obtenerUsuarios(): any {
    this.httpClient.get("/api/usuarios/obtener-todos");
  }

  iniciarSesion(correo: string, clave: string) {
    this.autenticacion.signInWithEmailAndPassword(correo, clave)
    .then((credencialUsuario) => {
      //Cargar toda la información del usuario.
      this.datosUsuarioActual = credencialUsuario.user;

      this.obtenerUsuario(this.datosUsuarioActual.uid).subscribe((datos: any) => {
        this.informacionAdicional.nombreCompleto = datos.nombreCompleto;
        this.informacionAdicional.permisos = datos.permisos;
      });
      alert("La sesión fue exitosamente iniciada. Bienvenido, usuario " + this.datosUsuarioActual.displayName + ".");
      this.router.navigate(['/']);
    })
    .catch(this.desplegarError);
  }

  cerrarSesion() {
    this.autenticacion.signOut().then(() => {
      //Reiniciar la información del usuario actual.
      localStorage.removeItem('datosUsuario');
      this.datosUsuarioActual = null;
      this.informacionAdicional = {
        nombreCompleto: "Invitado",
        permisos: ""
      };
      this.router.navigate(['/inicio-sesion']);
    })
    .catch(this.desplegarError);
  }

  desplegarError(error: any) {
    console.log("Error " + error.code + ": " + error.message + ".");
    alert("Error " + error.code + ": " + error.message + ".");
  }
}