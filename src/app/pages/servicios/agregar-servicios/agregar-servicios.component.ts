import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerServiciosComponent } from '../ver-servicios/ver-servicios.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { servicioModel } from '../../../core/models/servicioModel';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { servicioInterface } from '../../../core/interfaces/servicioInterface';
import Swal from 'sweetalert2';
import { config } from '../../../../enviroments/configuracion/categorias'
import { configAccion } from '../../../../enviroments/configuracion/acciones'



@Component({
  selector: 'app-agregar-servicios',
  standalone: true,
  imports: [ReactiveFormsModule,VerServiciosComponent,RouterLink],
  templateUrl: './agregar-servicios.component.html',
  styleUrl: './agregar-servicios.component.css'
})
export class AgregarServiciosComponent  implements OnInit{
  servicioSeleccionado: servicioModel;
  categorias= config.categorias;
  acciones=configAccion.acciones;

  
  //creado como variable
  serviciosForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    categoria: new FormControl('', [Validators.required]),
    acciones: new FormControl('', [Validators.required]),
    //usuario: new FormControl('', [Validators.email, Validators.required]),
    
  });
  //construtor
  constructor(private serviciosService:ServiciosService,
    private activatedRoute: ActivatedRoute) {

  }
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarServicio(id);
    });
    
  }
  crearServicio() {
    if (this.servicioSeleccionado) {
      this.actualizarServicio();
    } else {


      const servicioNuevo = this.serviciosForm.value;
      if (this.serviciosForm.valid) {
        const data:servicioInterface = {
          nombre: servicioNuevo.nombre || '',
          descripcion: servicioNuevo.descripcion || '',
          precio: Number(servicioNuevo.precio),
          categoria: servicioNuevo.categoria || '',
          acciones: servicioNuevo.acciones || '',
          //usuario: servicioNuevo.usuario|| '',

        };

        this.serviciosService.crearServicio(data).subscribe({
          next: (resp: any) => {
            Swal.fire(
              'Creado',
              `Se creó el servicio satisfactoriamente`,
              'success'
            );

          },
          error: (error: any) => {
            Swal.fire('Error', `Error al crear el servicio, ${error}`, 'error');

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
  actualizarServicio(){
    const dataActualizada: servicioModel = {
     
      _id: this.servicioSeleccionado._id || "",
      nombre: this.serviciosForm.value.nombre || "",
      descripcion: this.serviciosForm.value.descripcion|| "",
      precio: Number(this.serviciosForm.value.precio),
      categoria: this.serviciosForm.value.categoria || "",
      acciones: this.serviciosForm.value.acciones || "",
     //usuario: this.serviciosForm.value.usuario||""
    };

    

    this.serviciosService
    .actualizarServicios(dataActualizada)
    .subscribe({
      next: (resp: any) => {
        Swal.fire(
          'servicio Actualizado',
          `El servicio se actualizó satisfactoriamente`,
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
          title: 'Error al actualizar el servicio',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }
  //mostrar el usuario
  buscarServicio(id: string) {
    if (id !== 'nuevo') {
      this.serviciosService.getUnServicio(id).subscribe({
        next: (resp: any) => {
          const {
            nombre,
            descripcion,
            precio,
            categoria,
            acciones,
            usuario,
            

          } = resp.servicios;
          this.servicioSeleccionado = resp.servicios;

          this.serviciosForm.setValue({
            nombre: nombre,
            descripcion:descripcion,
            precio:precio,
            categoria:categoria,
            acciones:acciones,
            //usuario:usuario,

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
            title: 'Error al buscar el servicio',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });

    }
  }
}
