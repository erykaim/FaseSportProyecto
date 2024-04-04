import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../core/models/usuarioModel';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../../services/login/autenticacion.service';
import { ROLES } from '../../../core/enum/rolesenum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/routers-appenum';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { config } from '../../../../environments/configuracion/config';

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent implements OnInit, OnDestroy {

  usuarioSubscription: Subscription;
  usuarios: UsuarioModel[] = []; //variable usuarios y trae varios usuarios entonces lo dejamos como array
  usuarioLogin: UsuarioModel;
  //llamar mi archivo config de los roles
  roles = config.roles;
  pagi: number = 1;
  searchTerm: string = '';
  filteredData: UsuarioModel[] = [];
  filtrarTexto: string = '';

  get filterText() {
    return this.filtrarTexto;
  }

  set filterText(value: string) {
    this.filtrarTexto = value;
    this.filteredData = this.filterUsuarios(value);

    //this.pagina = 1;
  }


  constructor(
    private usuariosService: UsuariosService,
    private autenticacionService: AutenticacionService,
    private router: Router) { }


  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
    this.cargarUsuarios();

  }

  ngOnDestroy(): void {
    this.usuarioSubscription?.unsubscribe();
  }

  cargarUsuarios() {
    //el subcription se usa para 
    this.usuarioSubscription = this.usuariosService
      .getUsuarios()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        this.filteredData = this.usuarios;
      });
  }

  eliminarUsuario(id: string) {

    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#ffc107',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Sí", realizar la eliminación
        this.usuariosService.eliminarUsuarios(id).subscribe((resp: any) => {
          this.cargarUsuarios();
          Swal.fire(
            'Eliminado',
            'Se eliminó el usuario',
            'success'
          );
        });
      }
    });

  }

  actualizarRol(usuario: UsuarioModel) {
    this.usuariosService.actualizarUsuarios(usuario).subscribe((resp: any) => {
      Swal.fire(
        'actualizado',
        `se actualizo el usuario ${resp.usuario.nombre}`,
        'success'
      );
    });
  }

  agregarUsuarios() {
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/nuevo`); //forma de navegar
  }
  editarUsuarios(id: string) {
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_USUARIOS}/${id}`);
  }
  //filtrar los users
  filterUsuarios(filterTerm: string): UsuarioModel[] {
    filterTerm = filterTerm.toLocaleLowerCase();
    console.log('filtros', filterTerm)
    if (this.usuarios.length.toString() === '0' || this.filterText === '') {
      return this.usuarios;
    } else {
      return this.usuarios.filter(
        (usuario: UsuarioModel) =>
          usuario.nombre.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          usuario.email.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          usuario.tipoDocumento.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          usuario.numeroDocumento.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          usuario.login.toLocaleLowerCase().indexOf(filterTerm) !== -1 
      );
    }
  }
}