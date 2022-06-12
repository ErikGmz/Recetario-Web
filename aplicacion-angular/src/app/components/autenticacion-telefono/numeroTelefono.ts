export class NumeroTelefono {
    pais!: string;
    zona!: string;
    prefijo!: string;
    linea!: string;
  
    //Generar número telefónico con formato E.164.
    get formatoE164() {
      const numero = this.pais + this.zona + this.prefijo + this.linea;
      return "+" + numero;
    }
}