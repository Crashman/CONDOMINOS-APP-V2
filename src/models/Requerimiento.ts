export class Requerimiento {
  constructor(
    public codigoRequerimiento: number,
    public codigoUsuario: number,
    public codigoPropiedad: number,
    public fecha: Date,
    public saldo: number,
    public estado: number,
    public estadoStr: string,
    public codigoCondominio: number,
    public fechaStr: string,
    public numeroCasa: string,
    public nombreCondomino: string,
    public monto: number,
    public saldoAnterior: number,
  ) {}
}
