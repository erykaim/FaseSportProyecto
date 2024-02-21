import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VerClientesComponent } from './pages/clientes/ver-clientes/ver-clientes.component';
import { AgregarClientesComponent } from './pages/clientes/agregar-clientes/agregar-clientes.component';

export const routes: Routes = [{
    path: "",
    title:"Inicio",
    component: HomeComponent,
},
{
path: "servicios",
    title:"servicios",
    component: ServiciosComponent,
},
{
path: "acercade",
    title:"quienes somos",
    component: AcercaDeComponent,
},
{
path: "contacto",
    title:"contacto",
    component:ContactoComponent,
},
{
path: "clientes",
    title:"clientes potenciales",
    component: VerClientesComponent,
},
{
path: "add-clientes",
    title:"crear Clientes",
    component: AgregarClientesComponent,
}

];
