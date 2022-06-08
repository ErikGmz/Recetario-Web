import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { AutenticacionTelefonoComponent } from './components/autenticacion-telefono/autenticacion-telefono.component';
import { RegistroCuentaComponent } from './components/registro-cuenta/registro-cuenta.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  { path: '*', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: "inicio-sesion", component: InicioSesionComponent },
  { path: "autenticacion-telefono", component: AutenticacionTelefonoComponent },
  { path: "registro-cuenta", component: RegistroCuentaComponent },
  { path: "ayuda", component: AyudaComponent },
  { path: "contacto", component: ContactoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }