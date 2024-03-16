import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerClientesComponent } from '../ver-clientes/ver-clientes.component';
import { Cliente } from '../../../core/interfaces/cliente';
import { RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ClienteModel } from '../../../core/models/clienteModel';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule,VerClientesComponent,RouterLink],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})
 //formulario reactivo
export class AgregarClientesComponent {
  clienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    //estado:new FormControl('true',[Validators.required])
  });

  //construtor
  constructor(private clienteServicio : ClientesService){

  }

  crearCliente(){
    const clienteNuevo = this.clienteForm.value;
    if (this.clienteForm.valid){

      const data : ClienteModel ={
        nombre: clienteNuevo.nombre || '',
        telefono: Number(clienteNuevo.telefono) ,
        email:clienteNuevo.email || '',
        tipoDocumento: clienteNuevo.numeroDocumento ||'',
        numeroDocumento: clienteNuevo.numeroDocumento ||'',
        direccion:clienteNuevo.direccion || ''
      };

      this.clienteServicio.crearClientes(data).subscribe({
        next: (resp:any)=> {
          console.log("cliente creado",resp);
        },
        error: (error: any)=> {
          console.log('error al crear cliente', error);
        },
        
      });

    }
    
  }

    
}