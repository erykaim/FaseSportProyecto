import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/interfaces/cliente';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgregarClientesComponent } from '../agregar-clientes/agregar-clientes.component';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Router } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/routers-appenum';
import { PermisosDirective } from '../../../core/directives/permisos/permisos.directive';

@Component({
  selector: 'app-ver-clientes',
  standalone: true,
  imports:[FontAwesomeModule,AgregarClientesComponent,PermisosDirective], //sis se coloca en app los iconos seran en nivel global
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.css'
})

export class VerClientesComponent implements OnInit{
  misClientes:Cliente[] = [];

 constructor(
  private clienteServicio: ClientesService,
   private router: Router){}
  
 ngOnInit(): void {

    //hacer suscribcion
    this.clienteServicio.getClientes().subscribe((data:any)=>{
      console.log(data);
      this.misClientes = data.clientes;
    })

  };
  

  //eliminar un dato de la tabla 
  eliminarCliente(idCliente: number): void{

    //aca filtramos  de cliente el id 
    this.misClientes = this.misClientes.filter(
      (cliente) => cliente._id !==idCliente
    );

    console.log('eliminar',this.misClientes)
  };

  
  agregarclientes(){
      this.router.navigateByUrl(ROUTER_APP.ADD_CLIENTES); //forma de navegar
    }
  }
   


