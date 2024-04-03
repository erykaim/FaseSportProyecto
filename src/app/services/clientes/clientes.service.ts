import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteInterface } from '../../core/interfaces/cliente';
import { ClienteModel } from '../../core/models/clienteModel';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/envrroment';

//variable global 
const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  constructor( private  httpClient: HttpClient) { }

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
  
  getClientes(){
    return this.httpClient.get(`${base_url}/cliente`,this.headers) //en las peticiones se agregan los headers
  }
  getUnCliente(id:string){
    return this.httpClient.get(`${base_url}/cliente/${id}`,this.headers) //en las peticiones se agregan los headers
  }

  crearClientes(cliente: ClienteInterface){
    return this.httpClient.post(`${base_url}/cliente`,cliente,this.headers)
  }

  actualizarClientes(cliente:ClienteModel){
    return this.httpClient.put(
      `${base_url}/cliente/${cliente._id}`,
      cliente,
      this.headers)
  }
  eliminarClientes(id:string){
    return this.httpClient.delete(`${base_url}/cliente/${id}`,this.headers)
  }
}
