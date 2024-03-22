import { Component, OnInit } from '@angular/core';
import { PregledService } from '../services/pregled.service';
import { IzvestajService } from '../services/izvestaj.service';
import { KorisnikService } from '../services/korisnik.service';
import { Pregled } from '../models/pregled';
import { Izvestaj } from '../models/izvestaj';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pregledi-lek',
  templateUrl: './pregledi-lek.component.html',
  styleUrls: ['./pregledi-lek.component.css']
})
export class PreglediLekComponent implements OnInit {

  constructor(private router: Router, private pregledService: PregledService, private izvestajService: IzvestajService, private korisnikService: KorisnikService){}

  pregledi: Pregled[];
  izvestaji: Izvestaj[];
  lekar: Korisnik;

  ngOnInit():void{
    this.lekar = JSON.parse(sessionStorage.getItem("ulogovan"));
    this.pregledService.dohvatiPregledeLekara(this.lekar.korisnickoIme).subscribe((p: Pregled[])=>{
      this.pregledi = p;
      this.pregledi = this.pregledService.sortirajPregledePoDatumima(this.pregledi);
    })
  }
  sakrij: boolean = true;
  poruka: string = '';
  objasnjenje: string = '';
  pacijentOtkaz: string = '';
  datumOtkaz: string = '';
  vremeOtkaz: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  otkaziPregled(pacijent: string , datum: string , vreme: string){
    this.sakrij = !this.sakrij;
    this.pacijentOtkaz = pacijent;
    this.datumOtkaz = datum;
    this.vremeOtkaz = vreme;
    this.poruka = '';
    return;
  }
  odustani(){
    this.sakrij = !this.sakrij;
    this.objasnjenje='';
    this.poruka = '';
    this.pacijentOtkaz = '';
    this.datumOtkaz = '';
    this.vremeOtkaz = '';
    return;
  }
  otkazi(){
    if(this.objasnjenje==''){
      this.poruka='Navedite razlog otkazivanja!'
      return;
    }
    if(this.pacijentOtkaz==''||this.datumOtkaz==''||this.vremeOtkaz==''){
      this.poruka='Greska u prenosu podataka!'
      return;
    }
    this.pregledService.otkaziPregledUzObjasnjenje(this.pacijentOtkaz, this.datumOtkaz, this.vremeOtkaz, this.objasnjenje).subscribe(m=>{
      if(m['message']=='ok'){
        alert("Uspesno otkazan pregled!")
        this.objasnjenje='';
        this.poruka = '';
        this.sakrij = !this.sakrij;
        this.pacijentOtkaz = '';
        this.datumOtkaz = '';
        this.vremeOtkaz = '';
        this.ngOnInit();
        return;
      } else {
        this.poruka = 'Greska!';
        return;
      }
    })
  }
  vidikarton(pacKorIme){
    sessionStorage.setItem('pacijent',pacKorIme);
    this.router.navigate(['karton']);
  }
}
