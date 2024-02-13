import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {
  }

  SaveToken(token: string) {
    localStorage.setItem('Token', token)
    return this.router.navigate(['home']);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('Token');
  }

  logout() {
    localStorage.removeItem('Token');
    return this.router.navigate(['login']);
  }

  getToken(): string {
    return localStorage.getItem('Token') || '';
  }

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('Token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

}
