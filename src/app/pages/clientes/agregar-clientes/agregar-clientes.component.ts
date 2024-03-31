import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerClientesComponent } from '../ver-clientes/ver-clientes.component';
import { ClienteInterface } from '../../../core/interfaces/cliente';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ClienteModel } from '../../../core/models/clienteModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule,VerClientesComponent,RouterLink],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})
 //formulario reactivo
export class AgregarClientesComponent implements OnInit {
  clienteSeleccionado: ClienteModel;
 
  //creado como variable
  clienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion:new FormControl('',Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    //usuario: new FormControl('', [Validators.email, Validators.required]),
    
  });
  //construtor
  constructor(private clientesService:ClientesService,
    private activatedRoute: ActivatedRoute) {

  }
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarCliente(id);
    });
    
  }
  crearCliente() {
    if (this.clienteSeleccionado) {
      this.actualizarCliente();
    } else {


      const clienteNuevo = this.clienteForm.value;
      if (this.clienteForm.valid) {
        const data:ClienteInterface = {
          nombre: clienteNuevo.nombre || '',
          direccion:clienteNuevo.direccion|| '',
          telefono: Number(clienteNuevo.telefono),
          email: clienteNuevo.email|| '',
          tipoDocumento: clienteNuevo.tipoDocumento || '',
          numeroDocumento : clienteNuevo.numeroDocumento ||'',
          //usuario: servicioNuevo.usuario|| '',

        };

        this.clientesService.crearClientes(data).subscribe({
          next: (resp: any) => {
            Swal.fire(
              'Creado',
              `Se creó el cliente satisfactoriamente`,
              'success'
            );

          },
          error: (error: any) => {
            Swal.fire('Error', `Error al crear el cliente, ${error}`, 'error');

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
  actualizarCliente(){
    const dataActualizada: ClienteModel = {
     
      _id: this.clienteSeleccionado._id || "",
      nombre: this.clienteForm.value.nombre || "",
      direccion: this.clienteForm.value.direccion || "",
      telefono: Number(this.clienteForm.value.telefono),
      email: this.clienteForm.value.email ||"",
      tipoDocumento: this.clienteForm.value.tipoDocumento ||"",
      numeroDocumento: this.clienteForm.value.numeroDocumento || "",

     //usuario: this.serviciosForm.value.usuario||""
    };
    
    

    this.clientesService
    .actualizarClientes(dataActualizada)
    .subscribe({
      next: (resp: any) => {
        Swal.fire(
          'cliente Actualizado',
          `El cliente se actualizó satisfactoriamente`,
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
          title: 'Error al actualizar el cliente',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }
  //mostrar el usuario
  buscarCliente(id: string) {
    if (id !== 'nuevo') {
      this.clientesService.getUnCliente(id).subscribe({
        next: (resp: any) => {
          const {
            nombre,
            direccion,
            telefono,
            email,
            tipoDocumento,
            numeroDocumento

          } = resp.clientes;
          this.clienteSeleccionado = resp.clientes;

          this.clienteForm.setValue({
            nombre: nombre,
            direccion:direccion,
            telefono:telefono,
            email:email,
            tipoDocumento:tipoDocumento,
            numeroDocumento:numeroDocumento,

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
            title: 'Error al buscar el cliente',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });

    }
  }
}
