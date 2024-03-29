import { Injectable } from '@angular/core';
import { enviromment } from '../../../enviroments/envrroment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../core/models/usuarioModel';
const base_url = enviromment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private  httpClient: HttpClient) { }

  get token():string{ //traemos el headers 
    return localStorage.getItem('token') || ''; //esto se hace en todos los servicios
  }

  get headers() { //estos headers
    return {
      headers:{ 
        'x-token': this.token, 

      },
    };
  }
  getUsuarios(){
    return this.httpClient.get(`${base_url}/usuario`,this.headers) //en las peticiones se agregan los headers
  }

  crearUsuarios(usuario: UsuarioModel){
    return this.httpClient.post(`${base_url}/usuario`,usuario,this.headers)
  }
  //TODO completar 
  actualizarUsuarios(usuario: UsuarioModel){
    return this.httpClient.put(
      `${base_url}/usuario/${usuario._id}`,
      usuario,
      this.headers)
  }
  eliminarUsuarios(id:string){
    return this.httpClient.delete(`${base_url}/usuario/${id}`,this.headers)
  }

}
