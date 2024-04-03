import { Injectable } from '@angular/core';
import { loginInterface } from '../../core/interfaces/loginInterface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../core/models/usuarioModel';
import { environment } from '../../../enviroments/envrroment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})


export class AutenticacionService {
  usuario: UsuarioModel;
  constructor( private  httpClient: HttpClient, private router:Router) { }//roueter me permite moverme entre rutas

  get token():string{
    return localStorage.getItem('token')|| ''; // crea una valiable get token y usara lo que esta en localstorage
  }

  //validar el token desencriptar el token para verificar 
  validarToken():Observable<boolean> {
    return this.httpClient.get(`${base_url}/auten`,{
      headers: {
        'x-token': this.token,
      },
    }).pipe(
      map((resp:any)=>{
        const {
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          rol,
          estado,
          createdAt,
          password,

        }= resp.usuario;
        
        this.usuario = new UsuarioModel(
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          rol,
          estado,
          createdAt,
          password,
        );
        localStorage.setItem('token',resp.token);
        return true;     
      }),
      catchError((error)=> {
        console.error(error);
        return of(false);
      })
      );
  }

  //generar el token al incio de sesion
  login(login: loginInterface){

    return this.httpClient.post(`${base_url}/auten`,login).pipe( //aca vamos a la api de auten
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);//localstorage es una funcion del navegador 
      })
    );
  }

  ///cierre de sesion
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('auten/login');

    
  }

  ///////////////////////////////////////////////////////////olvido
  olvidoContrasena(login: string, numeroDocumento: string) {
    const body = { login, numeroDocumento };
    return this.httpClient.post(`${base_url}/auten/olvidoContrasena`, body).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        // Aquí podrías emitir un evento o notificar al componente de éxito
      }),
      catchError((error) => {
        //  manejas los errores y devuelves un mensaje de error al componente
        let errorMessage = 'Ocurrió un error al intentar recuperar la contraseña.';
        if (error.error && error.error.msg) {
          errorMessage = error.error.msg;
        }
        return throwError(errorMessage);
      })
    );
    }
}
