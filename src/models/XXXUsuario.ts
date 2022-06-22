export class Usuario {
  codigoUsuario: number;
  codigoCondominio: number;
  correo: string;
  contrasena: string;
  confirmacion: string;
  estado: string;
  tipo: string;
  codigoCondomino: number;
  codigoColaborador: number;
  nombres: string;
  constructor() {
    this.codigoUsuario = 0;
    this.codigoCondominio = 0;
    this.correo = '';
    this.contrasena = '****';
    this.confirmacion = '****';
    this.estado = '';
    this.tipo = '';
    this.codigoCondomino = 0;
    this.codigoColaborador = 0;
    this.nombres = '';
  }
}
