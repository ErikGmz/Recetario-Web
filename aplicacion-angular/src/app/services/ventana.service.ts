import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentanaService {

  constructor() { }

  get referenciaVentana() {
    return window;
  }
}