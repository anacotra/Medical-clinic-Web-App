import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vrstaPregleda } from '../models/vrstaPregleda';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Specijalizacija } from '../models/specijalizacija';

@Component({
  selector: 'app-vrste-pregleda-men',
  templateUrl: './vrste-pregleda-men.component.html',
  styleUrls: ['./vrste-pregleda-men.component.css']
})
export class VrstePregledaMenComponent implements OnInit {

  constructor(private router: Router, private specijalizacijaService: SpecijalizacijaService, private vrstaPregledaService: VrstaPregledaService){}

  vrstePregleda: vrstaPregleda[];
  zahtevi: vrstaPregleda[];
  specijalizacije: Specijalizacija[];

  ngOnInit(): void {
    let aktvan = 'aktivan'
    let obrada = 'U obradi'
    this.vrstaPregledaService.dohvatiPoStatusuVrstePregleda(aktvan).subscribe((v:vrstaPregleda[])=>{
      this.vrstePregleda = v;
    })
    this.vrstaPregledaService.dohvatiPoStatusuVrstePregleda(obrada).subscribe((o: vrstaPregleda[])=>{
      this.zahtevi = o;
    })
    this.specijalizacijaService.dohvatiSpecijalizacije().subscribe((s:Specijalizacija[])=>{
      this.specijalizacije = s;
    })
  }
  naziv: string = '';
  cena: number = null;
  trajanje: number = null;
  specijalizacija: string = '';
  nazivPoruka: string = '';
  poruka: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  obradiZahtev(s: vrstaPregleda, o: string){
    let status;
    if(o=='odobri'){
      status='aktivan'
      this.vrstaPregledaService.promeniStatus(s.naziv, s.specijalizacija, s.cena, s.trajanje, status).subscribe(m=>{
        if(m['message']=='ok'){
          this.specijalizacijaService.dodajVrstuPregleda(s.specijalizacija, s.naziv).subscribe(l=>{
            if(m['message']=='ok'){
              alert('Uspešno dodata vrsta!')
              this.ngOnInit();
              return;
            } else {
              this.poruka = 'Greska u dodavanju vrste u specijalizaciju!';
              return;
            }
          })
        } else {
          this.poruka = 'Greska u dodavanju vrste!';
          return;
        }
      })
    } else{
      status='odbijen'
      this.vrstaPregledaService.promeniStatus(s.naziv, s.specijalizacija, s.cena, s.trajanje, status).subscribe(m=>{
        if(m['message']=='ok'){
          alert('Uspešno odbijena vrsta!')
          this.ngOnInit();
          return;
        } else {
          this.poruka = 'Greska!';
          return;
        }
      })
    }
  }
  azurirajVrste(naziv: string){
    sessionStorage.setItem('nazivVrste', naziv);
    this.router.navigate(['azurirajVrste'])
  }

  dodaj(){
    if(this.nazivPoruka!=''){
      this.poruka='Naziv nije ispravan!'
      return;
    }
    if(this.trajanje==null) this.trajanje = 30;
    if(this.cena==null || this.naziv=='' || this.specijalizacija==''){
      this.poruka = "Niste uneli naziv, cenu ili specijalizaciju pregleda!"
      return;
    }
    let status = 'aktivan'
    this.vrstaPregledaService.dodaj(this.naziv, this.specijalizacija, this.cena, this.trajanje, status).subscribe(m=>{
      if(m['message']=='ok'){
        alert("Uspesno dodato!")
        this.naziv = '';
        this.cena = null;
        this.trajanje = null;
        this.poruka = this.nazivPoruka = '';
        this.specijalizacija = '';
        this.ngOnInit();
        return;
      } else {
        this.poruka = 'Greska u slanju zahteva!';
        return;
      }
    })
  }
  proveraImena(){
    this.vrstaPregledaService.dohvatiPoNazivuVrstuPregleda(this.naziv).subscribe((n:vrstaPregleda)=>{
      if(n){
        this.nazivPoruka='Pregled sa tim nazivom vec postoji!'
        return;
      }else{
        this.nazivPoruka='';
        return;
      }
    })
  }
}
