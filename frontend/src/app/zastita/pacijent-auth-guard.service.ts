import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PacijentAuthGuardService implements CanActivate{

  constructor(private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const korisnik = JSON.parse(sessionStorage.getItem("ulogovan"));
    
    if (korisnik && korisnik.tip === 'pacijent') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
