import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login-men',
  templateUrl: './login-men.component.html',
  styleUrls: ['./login-men.component.css']
})
export class LoginMenComponent implements OnInit{

  constructor(private router: Router,  private korisnikService: KorisnikService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  korisnickoIme: string = '';
  lozinka: string = '';
  error: string = '';

  nazad(){
    sessionStorage.clear()
    this.router.navigate(['']);
  }
  login(){
    if(this.korisnickoIme == "" || this.lozinka == ""){
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.korisnikService.login(this.korisnickoIme, this.lozinka).subscribe((k:Korisnik)=>{
      if((k && k.tip!='lekar')&&(k && k.tip!='pacijent')){
        sessionStorage.setItem("ulogovan",JSON.stringify(k));
        this.router.navigate([k.tip])
      }else if((k && k.tip=='lekar')||(k && k.tip=='pacijent')){
        this.error = "Logovanje samo za menadzere!";
        return;
      } else {
        this.error = "Losi podaci!";
        return;
      }
    })
  }

}
