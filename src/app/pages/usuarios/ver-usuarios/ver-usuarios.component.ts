import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import {  Subscription } from 'rxjs';
import { UsuarioModel } from '../../../core/models/usuarioModel';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../../services/login/autenticacion.service';

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent  implements OnInit,OnDestroy{
  
  usuarioSubscription: Subscription;
  usuarios:UsuarioModel[]=[]; //variable usuarios y trae varios usuarios entonces lo dejamos como array
  usuarioLogin: UsuarioModel;
  constructor(
    private usuariosService: UsuariosService,
    private autenticacionService: AutenticacionService){}
  
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
  
}
