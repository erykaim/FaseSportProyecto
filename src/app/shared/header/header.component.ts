import { Component,  inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../core/enum/routers-appenum';
import { AutenticacionService } from '../../services/login/autenticacion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  autenticacionService = inject(AutenticacionService);

  get ROUTER_APP(){
    return ROUTER_APP;
  }

  
  cerrarSesion(){
    this.autenticacionService.logout();
  }
}


