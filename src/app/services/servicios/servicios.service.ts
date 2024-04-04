import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicioModel } from '../../core/models/servicioModel';
import { servicioInterface } from '../../core/interfaces/servicioInterface';
import { environment } from '../../../enviroments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

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
  getServicios(){
    return this.httpClient.get(`${base_url}/servicio`,this.headers) //en las peticiones se agregan los headers
  }
  getUnServicio(id:string){
    return this.httpClient.get(`${base_url}/servicio/${id}`,this.headers) //en las peticiones se agregan los headers
  }
  crearServicio(servicio: servicioInterface){
    return this.httpClient.post(`${base_url}/servicio`,servicio,this.headers)
  }


  actualizarServicios(servicio: servicioModel){
    return this.httpClient.put(
      `${base_url}/servicio/${servicio._id}`,
      servicio,
      this.headers)
  }

  eliminarservicio(id:string){
    return this.httpClient.delete(`${base_url}/servicio/${id}`,this.headers)
  }
}
