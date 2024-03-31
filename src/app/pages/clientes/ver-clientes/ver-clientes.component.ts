import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClienteInterface } from '../../../core/interfaces/cliente';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgregarClientesComponent } from '../agregar-clientes/agregar-clientes.component';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Router } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/routers-appenum';
import { PermisosDirective } from '../../../core/directives/permisos/permisos.directive';
import { ClienteModel } from '../../../core/models/clienteModel';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-clientes',
  standalone: true,
  imports:[FormsModule,PermisosDirective], //sis se coloca en app los iconos seran en nivel global
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.css'
})

export class VerClientesComponent implements OnInit,OnDestroy{
  clienteSubscription: Subscription;
  cliente:ClienteModel[]=[]; 

  currentPage: number = 1;
  pageSize: number = 10;
  totalClientes: number=2;
  


  constructor(
    private clientesService: ClientesService,
    private router: Router){}
    
  
  ngOnInit(): void {
   this.cargarClientes();
   
  }
  
  
  ngOnDestroy(): void {
    this.clienteSubscription?.unsubscribe();
  }
  
  cargarClientes() {
    this.clienteSubscription= this.clientesService
    .getClientes()
    .subscribe((resp:any) =>{ 
      this.cliente = resp.clientes;
    });
  }

  
  eliminarCliente(id:string){
    Swal.fire({
      title: '¿Desea eliminar el cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#ffc107',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Sí", realizar la eliminación
        this.clientesService.eliminarClientes(id).subscribe((resp: any) => {
          this.cargarClientes();
          Swal.fire(
            'Eliminado',
            'Se eliminó el cliente',
            'success'
          );
        });
      }
    });

  }

  agregarClientes(){
    this.router.navigateByUrl(`${ROUTER_APP.ADD_CLIENTES}/nuevo`); //forma de navegar
  }
  editarClientes(id : string){
    this.router.navigateByUrl(`${ROUTER_APP.ADD_CLIENTES}/${id}`);
  }
}
   


