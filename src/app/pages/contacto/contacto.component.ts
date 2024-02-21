import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
   contactoForm = new FormGroup({
    nombre: new FormGroup('nombre',Validators.required),
    email: new FormGroup('email',[Validators.email,Validators.required]),
    mensaje: new FormGroup('mensaje por defecto'),
   });

  
  eviarContacto(){
    console.log("lo que me envia mi formulario");
  }

}
