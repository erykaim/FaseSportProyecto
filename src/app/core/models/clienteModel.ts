import { publishFacade } from "@angular/compiler";

export class ClienteModel {

    constructor(
        //public readonly _id: number, //readonly hace que no se pueda editar el id
        public nombre: string,
        public telefono: number,
        public email: string,
        public tipoDocumento: String,
        public numeroDocumento: string,
        public estado?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public direccion?: string, //los parametros opcionales llevan signo de pregunta 
    ) { }
}
