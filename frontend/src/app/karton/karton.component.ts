import { Component, OnInit } from '@angular/core';
import { IzvestajService } from '../services/izvestaj.service';
import { KorisnikService } from '../services/korisnik.service';
import { PregledService } from '../services/pregled.service';
import { Pregled } from '../models/pregled';
import { Izvestaj } from '../models/izvestaj';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-karton',
  templateUrl: './karton.component.html',
  styleUrls: ['./karton.component.css']
})
export class KartonComponent implements OnInit {

  constructor(private router: Router, private pregledService: PregledService, private izvestajService: IzvestajService, private korisnikService: KorisnikService){}

  pregledi: Pregled[];
  preglediBezIzvestaja: Pregled[];
  izvestaji: Izvestaj[];
  pacijentKorIme: string;
  pacijent : Korisnik;
  lekar: Korisnik;

  ngOnInit(): void {
    this.pacijentKorIme = sessionStorage.getItem('pacijent')
    this.korisnikService.dohvatiKorisnika(this.pacijentKorIme).subscribe((k:Korisnik)=>{
      this.pacijent = k;
    })
    this.lekar = JSON.parse(sessionStorage.getItem("ulogovan"));
    this.izvestajService.dohvatiIzvestajPacijenta(this.pacijentKorIme).subscribe((i:Izvestaj[])=>{
      this.izvestaji = i;
      this.izvestaji = this.izvestajService.sortirajIzvestajePoDatumima(this.izvestaji);
    })
    this.pregledService.dohvatiPregledePacijenta(this.pacijentKorIme).subscribe((p: Pregled[])=>{
      this.pregledi = p;
    })
    
  }

  sakrij: boolean = true;
  datum: string = '';
  vreme: string = '';
  razlog: string = '';
  dijagnoza: string = '';
  terapija: string = '';
  datumKontr: string = '';
  dat: Date = null;
  vremenaPregleda: string[]=[];
  poruka: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazad(){
    sessionStorage.removeItem("pacijent");
    this.router.navigate(['/preglediLek']);
  }
  napisiNoviIzvestaj() {
    this.sakrij = !this.sakrij;
    this.poruka = '';
    const lista = [];
  
    if (!this.sakrij) {
      const datumSad = new Date();
  
      for (const pr of this.pregledi) {
        const datum = new Date(`${pr.datum}T${pr.vreme}`);
        
        if (datum <= datumSad) {
            lista.push(pr);
        }
      }
    }
  
    this.preglediBezIzvestaja = lista;
    return;
  }
  datumUcitan(){
    for(let p of this.preglediBezIzvestaja){
      if(p.datum==this.datum){
        this.vremenaPregleda.push(p.vreme);
      }
    }
    return;
  }
  ucitajDatum(){
    let datum = document.getElementById('datumKontr') as HTMLInputElement;
    this.datumKontr = datum.value;
    return;
  }
  napisi(){
    if(this.datum==""||this.vreme==""||this.razlog==""||
    this.dijagnoza==""||this.terapija==""||this.datumKontr==""){
      this.poruka='Niste uneli sve podatke!';
      return;
    }
    let datumkon = new Date(this.datumKontr);
    let datumPregleda = new Date(this.datum);
    let datumSad = new Date();
    if(datumkon <= datumSad || datumkon <= datumPregleda){
      this.poruka = 'Datum kontrole mora biti u buducnosti i nakon pregleda!'
      return;
    }
    this.izvestajService.dodajIzvestaj(this.pacijentKorIme, this.lekar.korisnickoIme, this.lekar.ime, this.lekar.prezime, this.lekar.specijalizacija, this.datum, this.vreme, this.razlog, this.dijagnoza, this.terapija, this.datumKontr).subscribe(m=>{
      if(m['message']=='ok'){
        let status = 'obradjen'
        this.pregledService.postaviStatus(this.pacijentKorIme, this.datum, this.vreme, status).subscribe(por=>{
          if(por['message']=='ok'){
            alert("Izvestaj poslat!")
            this.datum = this.vreme = this.terapija = this.razlog = this.dijagnoza = this.datumKontr = '';
            this.dat = null;
            this.sakrij=true;
            this.ngOnInit();
            return;
          } else {
            this.poruka = 'Greska!';
            return;
          }
        })
      } else {
        this.poruka = 'Greska!';
        return;
      }
    })
  }
}
