import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { ZahtevZaRegistracijuService } from '../services/zahtev-za-registraciju.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService, private zahtevZaRegistracijuService: ZahtevZaRegistracijuService){}

  lekari: Korisnik[]
  izabrani: Korisnik[]

  ngOnInit(): void{
    this.korisnikService.dohvatiLekare().subscribe((lek: Korisnik[])=>{
      this.lekari = lek;
      this.izabrani = lek;
      this.korinsik  = this.lekari[0];
    })
  }

  korisnickoIme: string = '';
  lozinka: string = '';
  error: string = '';

  lozinkapotvrda: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  mejl: string = '';
  tip: string = 'pacijent';
  status: string = 'U obradi';
  korinsik: Korisnik;

  imenaSortirana: boolean = false;
  prezimenaSortirana: boolean = false;
  specSortirana: boolean = false;   
  
  pretragaIme: string = '';
  pretragaPrezime: string = '';
  pretragaSpec: string = '';

  login(){
    if(this.korisnickoIme == "" || this.lozinka == ""){
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.korisnikService.login(this.korisnickoIme, this.lozinka).subscribe((k:Korisnik)=>{
      if(k && k.tip!='menadzer'){
        sessionStorage.setItem("ulogovan",JSON.stringify(k));
        document.getElementById("ZatvoriProzor").click()
        this.router.navigate([k.tip])
      }else if(k && k.tip=='menadzer'){
        this.error = "Logovanje samo za pacijente i lekare!";
        return;
      } else {
        this.error = "Losi podaci!";
        return;
      }
    })
  }
  sortirajImena(){
    this.izabrani = this.korisnikService.sortirajImena(this.izabrani, this.imenaSortirana);
    this.imenaSortirana = !this.imenaSortirana;
    return;
  }
  sortirajPrezimena(){
    this.izabrani = this.korisnikService.sortirajPrezimena(this.izabrani, this.prezimenaSortirana);
    this.prezimenaSortirana = !this.prezimenaSortirana;
    return;
  }
  sortirajSpec(){
    this.izabrani = this.korisnikService.sortirajSpec(this.izabrani, this.specSortirana);
    this.specSortirana = !this.specSortirana;
    return;
  }
  pretraga(){
    this.izabrani = this.korisnikService.pretragaImePrezSpec(this.pretragaIme, this.pretragaPrezime, this.pretragaSpec, this.lekari, this.izabrani);
    return;
  }
  
}
