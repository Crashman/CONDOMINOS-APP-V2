export class Recibo {
  constructor(
    public recibo: number,
    public nit: string,
    public fechaAprobacion: Date,
    public monto: number,
    public nombreCondomino: string,
    public documentoDePago: string,
    public montoEnLetras: string
  ) {}
}
