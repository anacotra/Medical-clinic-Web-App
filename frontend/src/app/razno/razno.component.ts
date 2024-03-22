import { Component, OnInit } from '@angular/core';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { KorisnikService } from '../services/korisnik.service';
import { Izvestaj } from '../models/izvestaj';
import { Korisnik } from '../models/korisnik';
import { vrstaPregleda } from '../models/vrstaPregleda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-razno',
  templateUrl: './razno.component.html',
  styleUrls: ['./razno.component.css']
})
export class RaznoComponent implements OnInit{

  
  constructor(private router: Router, private pregledService: PregledService, private vrstePregledaService: VrstaPregledaService, private korisnikService: KorisnikService){}

  pregledi: Pregled[];
  izvestaji: Izvestaj[];
  lekar: Korisnik

  ngOnInit():void{
    this.lekar = JSON.parse(sessionStorage.getItem("ulogovan"));
  }

  naziv: string = '';
  cena: number = null;
  trajanje: number = null;
  nazivPoruka: string = '';
  poruka: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  dodaj(){
    if(this.nazivPoruka!=''){
      this.poruka='Naziv nije ispravan!'
      return;
    }
    if(this.trajanje==null) this.trajanje = 30;
    if(this.cena==null || this.naziv==''){
      this.poruka = "Niste uneli naziv ili cenu pregleda!"
      return;
    }
    let status = 'U obradi'
    this.vrstePregledaService.dodaj(this.naziv, this.lekar.specijalizacija, this.cena, this.trajanje, status).subscribe(m=>{
      if(m['message']=='ok'){
        alert("Uspesno poslat zahtev!")
        this.naziv = '';
        this.cena = null;
        this.trajanje = null;
        this.poruka = this.nazivPoruka = '';
        this.ngOnInit();
        return;
      } else {
        this.poruka = 'Greska u slanju zahteva!';
        return;
      }
    })
  }
  proveraImena(){
    this.vrstePregledaService.dohvatiPoNazivuVrstuPregleda(this.naziv).subscribe((n:vrstaPregleda)=>{
      if(n){
        this.nazivPoruka='Pregled sa tim nazivom vec postoji!'
        return;
      }else{
        this.nazivPoruka='';
        return;
      }
    })
  }


  datumSlobDanPoruka: string = '';
  ngDatumSlobDan: Date = null;
  datumSlobDan: string = '';

  ucitajDatumSlobDan(){
    let datum = document.getElementById('datumSlobDan') as HTMLInputElement;
    this.datumSlobDan = datum.value;
    return;
  }
  slobodanDan(){
    if(this.ngDatumSlobDan==null){
      this.datumSlobDanPoruka='Unesite datum!';
      return;
    }
    let pr = this.korisnikService.proveraDatumaSlobDan(this.datumSlobDan, this.lekar);
    if(!pr){
      this.datumSlobDanPoruka='Datum je u proslosti ili ste vec uneli slobodan dan!';
      return;
    }
    let preg;
    this.pregledService.dohvatiPregledeLekara(this.lekar.korisnickoIme).subscribe((p:Pregled)=>{
      preg = p
      for(let o of preg){
        if(o.datum==this.datumSlobDan){
          this.datumSlobDanPoruka = 'Imate zakazan pregled tada!'
          return;
        }
      }
      this.korisnikService.dodajSlobodanDan(this.lekar.korisnickoIme, this.datumSlobDan).subscribe(m=>{
        if(m['message']=='ok'){
          alert("Uspesno dodat slobodan dan!")
          this.datumSlobDan = '';
          this.ngDatumSlobDan = null;
          this.datumSlobDanPoruka = '';
          this.ngOnInit();
          return;
        } else {
          this.poruka = 'Greska!';
          return;
        }
      })
    })
  }

  datumGodPocPoruka: string = '';
  datumGodKrajPoruka: string = '';
  ngDatumGodPoc: Date = null;
  ngDatumGodKraj: Date = null;
  datumGodPoc: string = '';
  datumGodKraj: string = '';
  porukaGodisnji: string = '';

  ucitajDatumGodPoc(){
    let datum = document.getElementById('datumGodPoc') as HTMLInputElement;
    this.datumGodPoc = datum.value;
    return;
  }
  ucitajDatumGodKraj(){
    let datum = document.getElementById('datumGodKraj') as HTMLInputElement;
    this.datumGodKraj = datum.value;
    return;
  }
  godisni(){
    this.datumGodPocPoruka = '';this.datumGodKrajPoruka = '';
    this.porukaGodisnji = '';
    if(this.ngDatumGodPoc==null){
      this.datumGodPocPoruka='Unesite datum!';
      if(this.ngDatumGodKraj==null){
        this.datumGodKrajPoruka='Unesite datum!';
      }
      return;
    }
    if(this.ngDatumGodKraj==null){
      this.datumGodKrajPoruka='Unesite datum!';
      return;
    }
    if(this.datumGodPoc > this.datumGodKraj){
      this.porukaGodisnji = 'Datum pocetka mora biti pre datuma kraja!';
      return;
    }
    let pr = this.korisnikService.proveraDatumaGodisnji(this.datumGodPoc, this.datumGodKraj, this.lekar);
    if(!pr){
      this.porukaGodisnji='Datum je u proslosti ili ste u tom periodu uneli slobodane dane!';
      return;
    }
    this.korisnikService.dodajGodisnji(this.lekar.korisnickoIme, this.datumGodPoc, this.datumGodKraj).subscribe(m=>{
      if(m['message']=='ok'){
        alert("Uspesno dodat godisnji odmor!")
        this.datumGodPoc = '';this.datumGodKraj = '';
        this.ngDatumGodPoc = null;this.ngDatumGodKraj = null;
        this.datumGodPocPoruka = '';this.datumGodKrajPoruka = '';
        this.porukaGodisnji = '';
        this.ngOnInit();
        return;
      } else {
        this.poruka = 'Greska!';
        return;
      }
    })
  }
}
