import { publishFacade } from "@angular/compiler";

export class ClienteModel {

    constructor(
        //public readonly _id: number, //readonly hace que no se pueda editar el id
        public readonly  _id: string,
        public nombre: string,
        public direccion: string,
        public telefono: number,
        public email: string,
        public tipoDocumento: String,
        public numeroDocumento: string,
        //public rol:String,
        public estado?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
         //los parametros opcionales llevan signo de pregunta 
    ) { }
}
