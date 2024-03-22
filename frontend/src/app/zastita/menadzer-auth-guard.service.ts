import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenadzerAuthGuardService implements CanActivate{

  constructor(private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const korisnik = JSON.parse(sessionStorage.getItem("ulogovan"));
  
    if (korisnik && korisnik.tip === 'menadzer') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
