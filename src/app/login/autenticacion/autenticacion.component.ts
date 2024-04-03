import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../services/login/autenticacion.service';
import { subscribeOn } from 'rxjs';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../core/enum/routers-appenum';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [ReactiveFormsModule], //se importa cuando es reactivo el formulario
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent implements OnInit {
  loginForm!: FormGroup;
 // loginSeleccionado:loginInterface;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router) { }

  ngOnInit(): void {
    //validaciones
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  get login() {
    return this.loginForm.get('login');

  }
  get password() {
    return this.loginForm.get('password');
  }




  //funcion
  realizoLogin() {
    //validar si el login es valido
    if (this.loginForm.invalid) {
      return;

    }
    const data = this.loginForm.value;

    this.autenticacionService.login(data).subscribe({
      next: (resp: any) => {
        if (resp && resp.usuario) {
          const { nombre, login, email } = resp.usuario;

          Swal.fire({
            html: `Bienvenido ${nombre}`,
          }).then(() => {
            this.router.navigateByUrl(ROUTER_APP.INICIO);

          });
        }
      },
      error: (error: any)=> {
        console.error(error.error.msg);
        //console.error(error.error.msg);
        if (error && error.error && error.error.msg === 'las credenciales password no son validas') {
          // Muestra una alerta si la contraseña es incorrecta
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña ingresada es incorrecta',
          });
        }
        if (error && error.error && error.error.msg === 'las credenciales correono son validas') {
          // Muestra una alerta si la contraseña es incorrecta
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'el correo ingresado es incorrecto',
          });
        }
      },
    });
  }

}

