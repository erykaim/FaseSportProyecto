import { publishFacade } from "@angular/compiler";

export class UsuarioModel {
     
    constructor(
        public readonly  _id: string,
        public nombre: string,
        public email:string,
        public tipoDocumento:string,
        public numeroDocumento: string,
        public login: string,
        public rol:string,
        public estado?: boolean,
        public createdAt?: Date,
        public password?: string,

    ) { }
}