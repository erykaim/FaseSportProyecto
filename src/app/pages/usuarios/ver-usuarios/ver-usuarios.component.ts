import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import {  Subscription } from 'rxjs';
import { UsuarioModel } from '../../../core/models/usuarioModel';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../../services/login/autenticacion.service';
import { ROLES } from '../../../core/enum/rolesenum';
import { config } from '../../../../enviroments/configuracion/config';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/routers-appenum';

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent  implements OnInit,OnDestroy{
  
  usuarioSubscription: Subscription;
  usuarios:UsuarioModel[]=[]; //variable usuarios y trae varios usuarios entonces lo dejamos como array
  usuarioLogin: UsuarioModel;
  //llamar mi archivo config de los roles
  roles= config.roles;

  constructor(
    private usuariosService: UsuariosService,
    private autenticacionService: AutenticacionService,
    private router: Router){}
    
  
  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
   this.cargarUsuarios();

  }

  ngOnDestroy(): void {
    this.usuarioSubscription?.unsubscribe();
  }

  cargarUsuarios(){
    //el subcription se usa para 
    this.usuarioSubscription= this.usuariosService
    .getUsuarios()
    .subscribe((resp:any) =>{ 
      this.usuarios = resp.usuarios;
    });
  }
  eliminarUsuario(id:string){
    //validar id que entra es igual al this
    if(id === this.usuarioLogin._id){
      Swal.fire('Error','no puede eliminar este usuario','error');
    }else { 
      this.usuariosService.eliminarUsuarios(id).subscribe((resp:any)=>{
        this.cargarUsuarios();
        Swal.fire(
          'Eliminado',
          `Se elimino el usuario ${resp.usuario.nombre}`,
          'success'
        );
      });
    }

  }

  actualizarRol(usuario: UsuarioModel){
    this.usuariosService.actualizarUsuarios(usuario).subscribe((resp: any)=>{
      Swal.fire(
        'actualizado',
        `se actualizo el usuario ${resp.usuario.nombre}`,
        'success'
      );
    });
  }


  agregarUsuarios(){
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/nuevo`); //forma de navegar
  }
  editarUsuarios(id : string){
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/${id}`);
  }
  
}
