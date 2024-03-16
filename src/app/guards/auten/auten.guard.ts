import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/login/autenticacion.service';
import { tap } from 'rxjs';
import { ROUTER_APP } from '../../core/enum/routers-appenum';


export const autenGuard: CanActivateFn = (route, state) => {

  const autenticacionService = inject(AutenticacionService); //inyectamos estos services
  const router = inject(Router);

  return autenticacionService.validarToken().pipe(
    tap((isAutenticado) => { //validar autenticaccion 
      if (!isAutenticado) {
        router.navigateByUrl(ROUTER_APP.AUTENTICACION);
      }
    })
  );
};
