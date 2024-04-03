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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-ver-clientes',
  standalone: true,
  imports: [FormsModule, PermisosDirective, CommonModule, NgxPaginationModule, ReactiveFormsModule], //sis se coloca en app los iconos seran en nivel global
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.css'
})

export class VerClientesComponent implements OnInit, OnDestroy {
  clienteSubscription: Subscription;
  cliente: ClienteModel[] = [];

  pagi: number = 1;
  searchTerm: string = '';
  filteredData: ClienteModel[] = [];
  filtrarTexto: string = '';

  get filterText() {
    return this.filtrarTexto;
  }

  set filterText(value: string) {
    this.filtrarTexto = value;
    this.filteredData = this.filterClientes(value);

    //this.pagina = 1;
  }

  constructor(
    private clientesService: ClientesService,
    private router: Router) { }


  ngOnInit(): void {
    this.cargarClientes();

  }


  ngOnDestroy(): void {
    this.clienteSubscription?.unsubscribe();
  }

  cargarClientes() {
    this.clienteSubscription = this.clientesService
      .getClientes()
      .subscribe((resp: any) => {
        this.cliente = resp.clientes;
        this.filteredData = this.cliente
      });
  }


  eliminarCliente(id: string) {
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

  agregarClientes() {
    this.router.navigateByUrl(`${ROUTER_APP.ADD_CLIENTES}/nuevo`); //forma de navegar
  }
  editarClientes(id: string) {
    this.router.navigateByUrl(`${ROUTER_APP.ADD_CLIENTES}/${id}`);
  }

  filterClientes(filterTerm: string): ClienteModel[] {
    filterTerm = filterTerm.toLocaleLowerCase();
    console.log('filtros', filterTerm)
    if (this.cliente.length.toString() === '0' || this.filterText === '') {
      return this.cliente;
    } else {
      return this.cliente.filter(
        (clientes: ClienteModel) =>
          clientes.nombre.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          clientes.direccion.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          clientes.email.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          clientes.tipoDocumento.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          clientes.numeroDocumento.toLocaleLowerCase().indexOf(filterTerm) !== -1 ||
          clientes.telefono.toString().indexOf(filterTerm) !== -1
      );
    }
  }
}




