export class Usuario {
 constructor(
  public codigoUsuario: number,
  public codigoCondominio: number,
  public nombres: String,
  public apellidos: String,
  public fechaNacimiento: Date,
  public edad: number,
  public nit: String,
  public dpi: String,
  public telefono: String,
  public tipo: number,
  public correo: string,
  public contrasena: string,
  public confirmacion: string,
  public estado: number,
  public fechaNStr: string,
  public fechaAStr: string,
  public fechaBStr: string,
  public fechaAlta?: Date,
  public fechaBaja?: Date,
 ) {}
}

