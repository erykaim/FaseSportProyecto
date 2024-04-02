export interface UsuarioInterface {
    nombre: string;
    email:string;
    tipoDocumento:string;
    numeroDocumento:string;
    login: string,
    password: string,
    rol:string,
    //estado: boolean,
        
    
}
export interface UsuarioCreadorInterface{
    nombre: string;
    email:string;
    numeroDocumento:string;
}