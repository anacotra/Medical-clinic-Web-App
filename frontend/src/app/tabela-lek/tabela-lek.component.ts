import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-tabela-lek',
  templateUrl: './tabela-lek.component.html',
  styleUrls: ['./tabela-lek.component.css']
})
export class TabelaLekComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisnikService){}

  lekari: Korisnik[]
  izabrani: Korisnik[]

  ngOnInit(): void{
    this.korisnikService.dohvatiLekare().subscribe((lek: Korisnik[])=>{
      this.lekari = lek;
      this.izabrani = lek;
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

  imenaSortirana: boolean = false;
  prezimenaSortirana: boolean = false;
  specSortirana: boolean = false;   
  ogranakSortirana: boolean = false;
  
  pretragaIme: string = '';
  pretragaPrezime: string = '';
  pretragaSpec: string = '';
  pretragaOgr: string = '';


  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
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
  sortirajOgranak(){
    this.izabrani = this.korisnikService.sortirajOgranak(this.izabrani, this.ogranakSortirana);
    this.ogranakSortirana = !this.ogranakSortirana;
    return;
  }
  pretraga(){
    this.izabrani = this.korisnikService.pretragaImePrezSpecOgr(this.pretragaIme, this.pretragaPrezime, this.pretragaSpec, this.pretragaOgr, this.lekari, this.izabrani);
    return;
  }
  vidiProfil(korIme: string){
    sessionStorage.setItem("vidiProfil", korIme);
    this.router.navigate(['/vidiProfil']);
  }
}
