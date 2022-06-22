export class Lectura {
  constructor(
    public codigoLectura: number,
    public codigoPropiedad: number,
    public fecha: Date,
    public lectura: number,
    public lecturaAnterior: number,
    public consumoMes: number,
    public exceso: number,
    public contador: String,
    public fechaStr: String,
    public cantidadMetroCubico: number,
    public estado: string,
    public imagen: string,
  ) {}
}
