export class Anuncio {
    constructor(
      public codigoCondominio: number,
      public codigoAnuncio: number,
      public descripcion: string,
      public estado: number,
      public estadoStr: string,
      public imagen: string,
    ) {}
  }
