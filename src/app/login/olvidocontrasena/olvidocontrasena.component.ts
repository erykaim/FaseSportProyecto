import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/login/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-olvidocontrasena',
  standalone: true,
  imports: [],
  templateUrl: './olvidocontrasena.component.html',
  styleUrl: './olvidocontrasena.component.css'
})
export class OlvidocontrasenaComponent {
    olvidoForm!: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      private autenticacionService: AutenticacionService,
      private router: Router) { }
  
    ngOnInit(): void {
      this.olvidoForm = this.formBuilder.group({
        login: ['', [Validators.required, Validators.email]],
        numeroDocumento: ['', Validators.required]
      });
      
    }
  
  
    get login() {
      return this.olvidoForm.get('login');
  
    }
    get numeroDocumento() {
      return this.olvidoForm.get('numeroDocumento');
    }
  
  
  
  
    //funcion
    olvidoContrasena() {
      if (this.olvidoForm.invalid) {
        return;
      }
  
      const data = this.olvidoForm.value;
  
      this.autenticacionService.olvidoContrasena(data.login, data.numeroDocumento).subscribe({
        next: (resp: any) => {
          Swal.fire({
            html: `gmail no existe`
          }).then(() => {
            
          });
        },
        error: (error: any) => {
          console.error(error.error.msg);
          
        }
      });
    }
  }
  
  

