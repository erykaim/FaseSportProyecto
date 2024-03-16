import { Injectable } from '@angular/core';
import { enviromment } from '../../../enviroments/envrroment';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../core/interfaces/cliente';
import { ClienteModel } from '../../core/models/clienteModel';

//variable global 
const base_url = enviromment.base_url;



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

  crearClientes(cliente: ClienteModel){
    return this.httpClient.post(`${base_url}/cliente`,cliente,this.headers)
  }
}
