import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VerClientesComponent } from './pages/clientes/ver-clientes/ver-clientes.component';
import { AgregarClientesComponent } from './pages/clientes/agregar-clientes/agregar-clientes.component';
import { AutenticacionComponent } from './login/autenticacion/autenticacion.component';
import { autenGuard } from './guards/auten/auten.guard';
import { VerUsuariosComponent } from './pages/usuarios/ver-usuarios/ver-usuarios.component';
import { AgregarUsuariosComponent } from './pages/usuarios/agregar-usuarios/agregar-usuarios.component';

export const routes: Routes = [
    //esta es una ruta hija
    {
        path: "auten",
        title: "autenticacion",
        children: [
            { path: "login", component: AutenticacionComponent },
            // {path:"Item/id",component:""},  esta se puede hacer con cambio de contrasena
        ],

    },


    {
        path: "Inicio",
        title: "Inicio",
        canActivate: [autenGuard],

        children: [
            //path por defecto del padre
            { path: "", title: "Inicio", component: HomeComponent },
            { path: "servicio", title: "Servicios", component: ServiciosComponent },


            {
                path: "acercade",
                title: "quienes somos",
                component: AcercaDeComponent,
            },
            {
                path: "contacto",
                title: "contacto",
                component: ContactoComponent,
            },
            {
                path: "clientes",
                title: "clientes potenciales",
                component: VerClientesComponent,
            },
            {
                path: "add-clientes",
                title: "crear Clientes",
                component: AgregarClientesComponent,
            },
            {
                path: "usuarios",
                title: "ver-usuario",
                component: VerUsuariosComponent,
            },
            {
                path: "agregar-usuarios",
                title: "agregar usuarios",
                component: AgregarUsuariosComponent,
            },
        ],
    },


    //si no encuentra la ruta redireciona al login
    { path: '""', redirectTo: "auten/login", pathMatch: 'full' },

];
