import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroPersonas'
})
export class NumeroPersonasPipe implements PipeTransform {

  transform(cantidad: number): string {
    switch(cantidad) {
      case 0: return "ningún usuario";
      case 1: return "un usuario";
      default: return cantidad + " usuarios";
    }
  }

}