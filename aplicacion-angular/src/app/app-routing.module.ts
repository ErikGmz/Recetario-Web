import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroCuentaComponent } from './components/registro-cuenta/registro-cuenta.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full' },
  { path: "inicio-sesion", component: InicioSesionComponent },
  { path: "registro-cuenta", component: RegistroCuentaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }