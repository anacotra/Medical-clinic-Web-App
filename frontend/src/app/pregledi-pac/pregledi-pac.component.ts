import { Component, OnInit } from '@angular/core';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { IzvestajService } from '../services/izvestaj.service';
import { Izvestaj } from '../models/izvestaj';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';


@Component({
  selector: 'app-pregledi-pac',
  templateUrl: './pregledi-pac.component.html',
  styleUrls: ['./pregledi-pac.component.css']
})
export class PreglediPacComponent implements OnInit {

  constructor(private router: Router, private pregledService: PregledService, private izvestajService: IzvestajService, private korisnikService: KorisnikService){}

  pregledi: Pregled[];
  izvestaji: Izvestaj[];
  pacijent: Korisnik;

  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem("ulogovan"));
    this.pregledService.dohvatiPregledePacijenta(this.pacijent.korisnickoIme).subscribe((p: Pregled[])=>{
      this.pregledi = p;
      this.pregledi = this.pregledService.sortirajPregledePoDatumima(this.pregledi);
    })
    this.izvestajService.dohvatiIzvestajPacijenta(this.pacijent.korisnickoIme).subscribe((i:Izvestaj[])=>{
      this.izvestaji = i;
      this.izvestaji = this.izvestajService.sortirajIzvestajePoDatumima(this.izvestaji);
    })
  }

  poruka: string = '';
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  otkazi(datum: string, vreme: string){
    this.pregledService.otkaziPregled(this.pacijent.korisnickoIme, datum, vreme).subscribe(u=>{
      if(u['message']=='ok'){
        alert("Uspesno otkazan pregled!")
        this.ngOnInit();
        return;
      } else {
        this.poruka = 'Greska!';
        return;
      }
    })
  }

}
