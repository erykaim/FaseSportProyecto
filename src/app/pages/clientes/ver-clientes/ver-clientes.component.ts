import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/interfaces/cliente';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgregarClientesComponent } from '../agregar-clientes/agregar-clientes.component';

@Component({
  selector: 'app-ver-clientes',
  standalone: true,
  imports:[FontAwesomeModule,AgregarClientesComponent], //sis se coloca en app los iconos seran en nivel global
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.css'
})

export class VerClientesComponent implements OnInit{
  misClientes:Cliente[] = [];

  mostrar:boolean=false;

  ngOnInit(): void {
    this.misClientes.push({
      id: 1,
      nombre:"erika",
      direccion:"calle 136 bis",
      telefono:382783788737,
      email:"juliacuevas@gmail",
      tipoDocumento:"cc",
      numeroDocumento:"7623782732",
      estado:true,

    },
    {
      id: 2,
      nombre:"henry",
      direccion:"calle 17 bis",
      telefono:2973278,
      email:"jhons@gmail",
      tipoDocumento:"cc",
      numeroDocumento:"928283732",
      estado:true

    },
    {
      id: 3,
      nombre:"yuber",
      direccion:"calle 64 bis",
      telefono:235983,
      email:"yuber@gmail",
      tipoDocumento:"cc",
      numeroDocumento:"123732",
      estado:false,

    },
    {
      id:4,
      nombre:"karen",
      direccion:"calle 24 bis 2",
      telefono:235309383,
      email:"karen@gmail",
      tipoDocumento:"cc",
      numeroDocumento:"123776532",
      estado:false,

    },
  );
  //iteracion a clientes
  this.misClientes.forEach((cliente) => {
    console.log('mis clientes',cliente);
   
  }); 
  }
  //eliminar un dato de la tabla 
  eliminarCliente(idCliente: number): void{

    //aca filtramos  de cliente el id 
    this.misClientes = this.misClientes.filter(
      (cliente) => cliente.id !==idCliente
    );

    console.log('eliminar',this.misClientes)
  };

   showagregarclientes(){
    this.mostrar = true
   }
   onClienteCreado(nuevoCliente: any) {
    this.misClientes.push(nuevoCliente); // Agregar el nuevo cliente a la lista de clientes
  }
  

}
