import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camposVacios'
})
export class CamposVaciosPipe implements PipeTransform {

  transform(campo: string): string {
    if(campo === null) {
      return "N/A";
    }
    return campo;
  }

}