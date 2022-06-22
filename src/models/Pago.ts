export class Pago {
    constructor(
        public codigoCondominio: number,
        public codigoPago: number,
        public codigoRequerimiento: number,
        public banco: String,
        public comprobanteFecha: Date,
        public comprobantePago: String,
        public comprobanteMonto: number,
        public fechaPago: Date,
        public estado: number,
        public estadoStr: String,
        public fechaPagoStr: String,
        public fechaBoletaStr: String,
        public codigoCondomino: number,
        public montoTotal: number,
        public nombreCondomino: string,
        public imagen: string) {}
}
