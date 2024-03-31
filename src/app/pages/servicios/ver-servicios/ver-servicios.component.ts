import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { servicioModel } from '../../../core/models/servicioModel';
import {  configAccion } from '../../../../enviroments/configuracion/acciones';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../../core/enum/routers-appenum';

@Component({
  selector: 'app-ver-servicios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ver-servicios.component.html',
  styleUrl: './ver-servicios.component.css'
})
export class VerServiciosComponent implements OnInit, OnDestroy {
  servicioSubscription: Subscription;
  servicios:servicioModel[]=[]; //variable usuarios y trae varios usuarios entonces lo dejamos como array
  //llamar mi archivo config de los roles
  acciones=configAccion.acciones;
  constructor(
    private servicioService: ServiciosService,
    private router: Router){}
    
  
  ngOnInit(): void {
   this.cargarServicios();

  }

  ngOnDestroy(): void {
    this.servicioSubscription?.unsubscribe();
  }

  cargarServicios(){
    //el subcription se usa para 
    this.servicioSubscription= this.servicioService
    .getServicios()
    .subscribe((resp:any) =>{ 
      this.servicios = resp.servicios;
    });
  }
  eliminarServicio(id:string){
    Swal.fire({
      title: '¿Desea eliminar el servicio?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#ffc107',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Sí", realizar la eliminación
        this.servicioService.eliminarservicio(id).subscribe((resp: any) => {
          this.cargarServicios();
          Swal.fire(
            'Eliminado',
            'Se eliminó el servicio',
            'success'
          );
        });
      }
    });

  }

  actualizarRol(servicio: servicioModel){
    this.servicioService.actualizarServicios(servicio).subscribe((resp: any)=>{
      Swal.fire(
        'actualizado',
        `se actualizo el servicio`,
        'success'
      );
    });
  }


  agregarServicio(){
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_SERVICIOS}/nuevo`); //forma de navegar
  }
  editarServicio(id : string){
    this.router.navigateByUrl(`${ROUTER_APP.AGREGAR_SERVICIOS}/${id}`);
  }

}
