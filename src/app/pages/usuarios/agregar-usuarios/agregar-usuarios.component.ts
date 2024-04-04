import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioModel } from '../../../core/models/usuarioModel';
import { VerUsuariosComponent } from '../ver-usuarios/ver-usuarios.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioInterface } from '../../../core/interfaces/usuarios';
import Swal from 'sweetalert2';
import { config } from '../../../../environments/configuracion/config';


@Component({
  selector: 'app-agregar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, VerUsuariosComponent, RouterLink],
  templateUrl: './agregar-usuarios.component.html',
  styleUrl: './agregar-usuarios.component.css'
})
export class AgregarUsuariosComponent implements OnInit {
  usuarioSeleccionado: UsuarioModel;
  roles = config.roles;
  
  //creado como variable
  usuariosForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('',[Validators.required])
    //estado:new FormControl('true',[Validators.required])
  });

  //construtor
  constructor(private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarUsuario(id);
    });
  }

  crearUsuario() {
    if (this.usuarioSeleccionado) {
      this.actualizarUsuario();
    } else {


      const usuarioNuevo = this.usuariosForm.value;
      if (this.usuariosForm.valid) {
        const data: UsuarioInterface = {
          nombre: usuarioNuevo.nombre || '',
          email: usuarioNuevo.email || '',
          tipoDocumento: usuarioNuevo.tipoDocumento || '',
          numeroDocumento: usuarioNuevo.numeroDocumento || '',
          login: usuarioNuevo.login || '',
          password: usuarioNuevo.password || '',
          rol : usuarioNuevo.rol || '',

        };

        this.usuariosService.crearUsuarios(data).subscribe({
          next: (resp: any) => {
            Swal.fire(
              'Creado',
              `Se creó el usuario  satisfactoriamente`,
              'success'
            );

          },
          error: (error: any) => {
            Swal.fire('Error', `Error al crear el usuario, ${error}`, 'error');

          },

        });

      } else {
        Swal.fire(
          'Error',
          `El formulario es inválido. Por favor, revise los campos.`,
          'error'
        );
      }
    }

  }
  //actualizar usuarios//eror actualiza pero no los muestra
  actualizarUsuario() {
    const dataActualizada: UsuarioModel = {
     
      _id: this.usuarioSeleccionado._id || "",
      nombre: this.usuariosForm.value.nombre || "",
      email: this.usuariosForm.value.email || "",
      tipoDocumento: this.usuariosForm.value.tipoDocumento || "",
      numeroDocumento: this.usuariosForm.value.numeroDocumento || "",
      login: this.usuariosForm.value.login || "",
      rol: this.usuariosForm.value.rol ||""
    };




    this.usuariosService
    .actualizarUsuarios(dataActualizada)
    .subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Usuario Actualizado',
          `El usuario se actualizó satisfactoriamente`,
          'success'
        );
      },
      error: (error: any) => {
        const errors = error?.error?.errors;
        const errorList: string[] = [];

        if (errors) {
          Object.entries(errors).forEach(([key, value]: [string, any]) => {
            if (value && value['msg']) {
              errorList.push('* ' + value['msg'] + '<br>');
            }
          });
        }

        Swal.fire({
          title: 'Error al actualizar el usuario',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }


  //mostrar el usuario
  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.usuariosService.getUnUsuario(id).subscribe({
        next: (resp: any) => {
          const {
            nombre,
            email,
            tipoDocumento,
            numeroDocumento,
            login,
            password,
            rol,

          } = resp.usuarios;
          this.usuarioSeleccionado = resp.usuarios;

          this.usuariosForm.setValue({
            nombre: nombre,
            email: email,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            login: login,
            password: '',
            rol: rol //el string vacio no mostrara la contrasena

          })
        },
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('* ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error al buscar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });

    }
  }

}
