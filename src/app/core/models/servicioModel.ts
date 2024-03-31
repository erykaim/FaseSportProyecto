import { publishFacade } from "@angular/compiler";

export class servicioModel {
     
    constructor(
        public readonly  _id: string,
        public nombre: string,
        public descripcion: string,
        public precio:number,
        public categoria: string,
        public acciones:string,
        public usuario?: string,
        public estado?: boolean,
        public createdAt?: Date,

    ) { }
   
}