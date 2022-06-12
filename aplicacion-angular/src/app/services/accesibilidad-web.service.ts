import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadWebService {
  habilitarAccesibilidad!: boolean;
  habilitarLectura: boolean = false;
  mensajeLectura!: SpeechSynthesisUtterance;

  constructor() {
    if("speechSynthesis" in window) {
      console.log("Accesibilidad web soportada por el navegador.");
      this.mensajeLectura = new SpeechSynthesisUtterance;
      this.habilitarAccesibilidad = true;
    }
    else {
      console.log("Accesibilidad web incompatible con el navegador.");
      this.habilitarAccesibilidad = false;
    }
  }

  cambiarModoLectura() {
    this.habilitarLectura = !this.habilitarLectura;
    console.log(this.habilitarLectura);
  }

  leerTexto(texto: string) {
    this.mensajeLectura.text = texto;
    if(speechSynthesis.paused) {
      speechSynthesis.resume();
    }
    else{
      speechSynthesis.cancel();
      speechSynthesis.speak(this.mensajeLectura);
    }
  }

  pausarLectura() {
    speechSynthesis.pause();
  }
}