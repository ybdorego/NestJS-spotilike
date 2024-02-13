import { CanActivateFn, Router } from '@angular/router';
import {  inject } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isLogged()) {
    return true;
  }else{
    router.navigate(['login']);
    return false;
  }

};
