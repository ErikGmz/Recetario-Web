import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { AutenticacionTelefonoComponent } from './components/autenticacion-telefono/autenticacion-telefono.component';
import { RegistroCuentaComponent } from './components/registro-cuenta/registro-cuenta.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { AgregarRecetaComponent } from './components/agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './components/editar-receta/editar-receta.component';
import { EliminarRecetaComponent } from './components/eliminar-receta/eliminar-receta.component';
import { GraficaFavoritosComponent } from './components/grafica-favoritos/grafica-favoritos.component';

import { InvitadoGuard } from './guards/invitado.guard';
import { UsuariosGuard } from './guards/usuarios.guard';
import { AdministradorGuard } from './guards/administrador.guard';
import { NoInvitadoGuard } from './guards/no-invitado.guard';
import { NoUsuariosGuard } from './guards/no-usuarios.guard';
import { NoAdministradorGuard } from './guards/no-administrador.guard';

const routes: Routes = [
  { path: '*', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: "inicio-sesion", component: InicioSesionComponent, canActivate: [InvitadoGuard] },
  { path: "autenticacion-telefono", component: AutenticacionTelefonoComponent, canActivate: [InvitadoGuard] },
  { path: "registro-cuenta", component: RegistroCuentaComponent, canActivate: [InvitadoGuard] },
  { path: "ayuda", component: AyudaComponent, canActivate: [NoAdministradorGuard] },
  { path: "contacto", component: ContactoComponent, canActivate: [NoAdministradorGuard] },
  { path: "lista-usuarios", component: ListaUsuariosComponent, canActivate: [AdministradorGuard] },
  { path: "lista-recetas", component: ListaRecetasComponent, canActivate: [AdministradorGuard] },
  { path: "agregar-receta", component: AgregarRecetaComponent, canActivate: [AdministradorGuard] },
  { path: "editar-receta", component: EditarRecetaComponent, canActivate: [AdministradorGuard] },
  { path: "eliminar-receta", component: EliminarRecetaComponent, canActivate: [AdministradorGuard] },
  { path: "grafica-favoritos", component: GraficaFavoritosComponent, canActivate: [AdministradorGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }