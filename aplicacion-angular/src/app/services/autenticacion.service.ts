import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  referenciaVentana: any;
  datosUsuarioActual: any = JSON.parse(localStorage.getItem('datosUsuario')!);
  informacionAdicional = JSON.parse(localStorage.getItem('informacionExtraUsuario')!);

  constructor(public autenticacion: AngularFireAuth, 
  public router: Router, public baseDatos: AngularFirestore, 
  public ngZone: NgZone, private httpClient: HttpClient) { 
    if(this.datosUsuarioActual === null) {
      this.datosUsuarioActual = {}
    }
    if(this.informacionAdicional === null) {
      this.informacionAdicional = {
        nombreCompleto: "",
        permisos: "Invitado"
      }
    }

    //Actualizar la información del usuario en el
    //localStorage cuando ocurra un inicio o cierre
    //de sesión.
    this.autenticacion.authState.subscribe((usuario) => {
      if(usuario) {
        this.datosUsuarioActual = usuario;
        localStorage.setItem('datosUsuario', JSON.stringify(this.datosUsuarioActual));

        this.obtenerUsuario(this.datosUsuarioActual.uid).subscribe((datos: any) => {
          if(datos !== null) {
            this.informacionAdicional.nombreCompleto = datos.nombreCompleto;
            this.informacionAdicional.permisos = datos.permisos;
            localStorage.setItem('informacionExtraUsuario', JSON.stringify(this.informacionAdicional));
          }
        });
      } 
      else {
        localStorage.setItem('datosUsuario', 'null');
        localStorage.setItem('informacionExtraUsuario', 'null');
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

  enviarMensajeTelefono(numeroTelefono: string) {
    return this.autenticacion.signInWithPhoneNumber(numeroTelefono, this.referenciaVentana.recaptchaVerifier)
    .then((resultado) => {
      alert("El código de verificación fue enviado al número " + numeroTelefono + ".");
      this.referenciaVentana.confirmationResult = resultado;
      this.referenciaVentana.recaptchaVerifier.clear();
      return true;
    })
    .catch((error) => {this.desplegarError(error); return false;});
  }

  registrarUsuarioTelefono(nombreCompleto: string, nombreUsuario: string, codigoVerificacion: string) {
    this.referenciaVentana.confirmationResult.confirm(codigoVerificacion)
    .then((credencialUsuario: any) => {
      //Almacenar el usuario nuevo si no se encontraba en la base de datos.
      this.obtenerUsuario(credencialUsuario.user?.uid).subscribe((datos: any) => {
        if(datos === null) {
          //Completar los datos del perfil del usuario nuevo.
          credencialUsuario.user?.updateProfile({displayName: nombreUsuario})
          .then(() => {
            this.agregarUsuarioABaseDatos(nombreCompleto);
            this.informacionAdicional.nombreCompleto = nombreCompleto;
            this.informacionAdicional.permisos = "Usuario";

            //Almacenar y cargar toda la información del usuario nuevo.
            this.datosUsuarioActual = credencialUsuario.user;
          })
          .catch(this.desplegarError);
        }
        else {
          this.informacionAdicional.nombreCompleto = datos.nombreCompleto;
          this.informacionAdicional.permisos = datos.permisos;

          //Almacenar y cargar toda la información del usuario nuevo.
          this.datosUsuarioActual = credencialUsuario.user;
        }
      });

      setTimeout(() => {
        localStorage.setItem('datosUsuario', JSON.stringify(this.datosUsuarioActual));
        localStorage.setItem('informacionExtraUsuario', JSON.stringify(this.informacionAdicional));
        alert("La sesión fue exitosamente iniciada. Bienvenido, usuario " + this.datosUsuarioActual.displayName + ".");
        this.router.navigate(['/']);
      }, 3000);
    })
    .catch(this.desplegarError);
  }

  agregarUsuarioABaseDatos(nombreCompleto: string) {
    //Obtener los datos del usuario actual y registrarlos en la base de datos.
    let datosUsuarioNuevo = {
      ID: this.datosUsuarioActual.uid,
      correoElectronico: this.datosUsuarioActual?.email,
      nombreCompleto: nombreCompleto,
      nombreUsuario: this.datosUsuarioActual.displayName,
      permisos: "Usuario",
      numeroTelefono: this.datosUsuarioActual?.phoneNumber
    }

    this.httpClient.post("/api/usuarios/agregar", datosUsuarioNuevo, {responseType: "text"}).subscribe((datos) => {
      console.log(datos);
    });
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
    this.httpClient.delete("/api/usuarios/eliminar/" + ID, {responseType: "text"}).subscribe((datos) => {
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
      localStorage.removeItem('informacionExtraUsuario');
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