import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../core/enum/routers-appenum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports:[RouterLink],
})
export class HomeComponent implements OnInit { //oinit es una funcion de angular
  nombre: string = "" //realizamos una variuable

  ngOnInit(): void {  //funcion que no retorna nada ya que es void 
    this.nombre= "erika cuevas "; 

  }
  //funcion mostrar modal 
  mostrarModal(): void {
    Swal.fire({  ///funcion de alertas
      title: this.nombre,
      text: "mucho gusto",
      icon: "success"
    });
  }

  get ROUTER_APP(){
    return ROUTER_APP;
  }
}
