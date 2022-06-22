export class DetCondominio {
    constructor(
        public codigoCondominio: number,
        public cantidadMetroCubico: number,
        public costoMetroCubico: number,
        public costoMetroCubicoExcedente: number,
        public smtpServer: String,
        public smtpPassword: String,
        public fechaPago: number,
        public fechaLectura: number,
        public codigoDetCondominio: number,
       ) {}
}
