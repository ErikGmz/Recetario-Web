import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { InvitadoGuard } from './guards/invitado.guard';
import { UsuariosGuard } from './guards/usuarios.guard';
import { AdministradorGuard } from './guards/administrador.guard';
import { NoInvitadoGuard } from './guards/no-invitado.guard';
import { NoUsuariosGuard } from './guards/no-usuarios.guard';
import { NoAdministradorGuard } from './guards/no-administrador.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroCuentaComponent } from './components/registro-cuenta/registro-cuenta.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { HomeComponent } from './components/home/home.component';
import { AutenticacionTelefonoComponent } from './components/autenticacion-telefono/autenticacion-telefono.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioSesionComponent,
    RegistroCuentaComponent,
    ContactoComponent,
    AyudaComponent,
    HomeComponent,
    AutenticacionTelefonoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    InvitadoGuard,
    UsuariosGuard,
    AdministradorGuard,
    NoInvitadoGuard,
    NoUsuariosGuard,
    NoAdministradorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }