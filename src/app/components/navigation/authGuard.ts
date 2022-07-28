import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private jwtHelper: JwtHelperService, 
    private router: Router) {
  }

  canActivate() {
    const token = localStorage.getItem("jwt-token");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt-token");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else {
      return false;
    }
  }
}