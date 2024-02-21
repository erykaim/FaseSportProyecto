import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerClientesComponent } from '../ver-clientes/ver-clientes.component';
import { Cliente } from '../../../core/interfaces/cliente';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule,VerClientesComponent],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})
 //formulario reactivo
export class AgregarClientesComponent {
  clienteForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    estado:new FormControl('true',[Validators.required])
  });

  @Output() mostrarClientes: EventEmitter<Cliente> = new EventEmitter<Cliente>;

  crearCliente(){
    if (this.clienteForm.valid) {
      const nuevoCliente = this.clienteForm.value;
      console.log('Crear cliente:', nuevoCliente); // Muestra los datos en consola
    } 
  }
/*
  crearCliente() {
    if (this.clienteForm.valid) {
      const data = this.clienteForm.value;
      const nuevoCliente: Cliente = {
        id: data.id || this.mostrarClientes.length+ 1,
        nombre: data.nombre || "",
        direccion: data.direccion || "",
        telefono: data.telefono || 0,
        email: data.email || "",
        tipoDocumento: data.tipoDocumento || "",
        numeroDocumento: data.numeroDocumento || "",
        estado: Boolean(data.estado),
      };
      this.mostrarClientes.emit(nuevoCliente);
    } 
  }*/
    
}