import { Component } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { ContadorComponent } from '../../components/contador/contador.component';

@Component({
  selector: 'app-persona',
  standalone: true,
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
  imports: [TablaComponent,ContadorComponent]
})
export class PersonaComponent {
  titulo: string = 'componente 2 persona  ';
  edad: number = 22;

  ocultar_parrafo:boolean = false;

  tituloTablas: string ="esta tabla es componente padre"
  
  contador:number=0

  users: { id:number; name:string} [] = [
    { id : 0, name: 'Yulaina'},
    { id : 1, name: 'jhon'},
    { id : 2, name: 'karen'},
    { id : 3, name: 'sara'},
    { id : 4, name: 'yuber'},
    { id : 4, name: 'marleny'},
    { id : 4, name: 'jose'},

  ];

  recibirContador(numero:number){
    this.contador = numero;
  }

}
