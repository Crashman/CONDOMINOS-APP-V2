export class UsuarioLoginResponse {
  codigoCondominio: number;
  codigoUsuario: string;
  nombres: string;
  correo: string;
  contrasena: string;
  estado: string;
  tipo: string;
  constructor() {
    this.codigoCondominio = 0;
    this.codigoUsuario = '';
    this.correo = '';
    this.contrasena = '****';
    this.estado = '';
    this.tipo = '';
    this.nombres = '';
  }
}
