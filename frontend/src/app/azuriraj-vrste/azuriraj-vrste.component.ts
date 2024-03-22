import { Component, OnInit } from '@angular/core';
import { vrstaPregleda } from '../models/vrstaPregleda';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { Router } from '@angular/router';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-azuriraj-vrste',
  templateUrl: './azuriraj-vrste.component.html',
  styleUrls: ['./azuriraj-vrste.component.css']
})
export class AzurirajVrsteComponent implements OnInit{

  constructor(private router: Router, private korisnikService: KorisnikService, private specijalizacijaService: SpecijalizacijaService, private vrstaPregledaService: VrstaPregledaService){}

  vrsta: vrstaPregleda;
  nazivVrste: string = '';

  ngOnInit(): void {
    this.nazivVrste = sessionStorage.getItem('nazivVrste');
    this.vrstaPregledaService.dohvatiPoNazivuVrstuPregleda(this.nazivVrste).subscribe((m:vrstaPregleda)=>{
      this.vrsta = m;
    })
  }

  naziv: string = '';
  cena: number = null;
  trajanje: number = null;

  porukaNaziv: string = '';
  porukaCena: string = '';
  porukaTrajanje: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazad(){
    sessionStorage.removeItem("nazivVrste");
    this.router.navigate(['/vrstePregledaMen']);
  }
  promeniNaziv(naziv: string){
    if(naziv==this.vrsta.naziv){
      return;
    }
    this.vrstaPregledaService.dohvatiPoNazivuVrstuPregleda(naziv).subscribe((l:vrstaPregleda)=>{
      if(l!=null){
        this.porukaNaziv = 'Postoji vrsta sa istim nazivom!';
        return;
      } else {
        this.specijalizacijaService.promeniNazivVrste(this.vrsta.specijalizacija, this.vrsta.naziv, naziv).subscribe(l=>{
          if(l['message']=='ok'){
          } else {
            this.porukaNaziv = 'Greska u promeni naziva kod specijalizacije!';
            return;
          }
        })
        this.korisnikService.promeniNazivVrste(this.vrsta.naziv, naziv).subscribe(l=>{
          if(l['message']=='ok'){
          } else {
            this.porukaNaziv = 'Greska u promeni naziva kod lekara'
            return;
          }
        })
        this.vrstaPregledaService.promeniNaziv(this.vrsta.naziv, naziv).subscribe(m=>{
          if(m['message']=='ok'){
            this.vrstaPregledaService.dohvatiPoNazivuVrstuPregleda(naziv).subscribe((f:vrstaPregleda)=>{
              this.vrsta = f;
            })
            alert('Uspesno promenjen naziv!')
            return;
          } else {
            this.porukaNaziv = 'Greska u promeni naziva!';
            return;
          }
        })
      }
    })
  }
  promeniCenu(cena: number){
    if(cena==this.vrsta.cena){
      return;
    }
    this.vrstaPregledaService.promeniCenu(this.vrsta.naziv, cena).subscribe(m=>{
      if(m['message']=='ok'){
        alert('Uspesno promenjena cena')
        return;
      } else {
        this.porukaCena = 'Greska u promeni cene!';
        return;
      }
    })
  }
  promeniTrajanje(trajanje: number){
    if(trajanje==this.vrsta.trajanje){
      return;
    }
    if(trajanje<30){
      this.porukaTrajanje='Pregled mora biti duzi od 30 minuta!';
      return;
    }
    this.vrstaPregledaService.promeniTrajanje(this.vrsta.naziv, trajanje).subscribe(m=>{
      if(m['message']=='ok'){
        alert('Uspesno promenjeno trajanje pregleda!')
        return;
      } else {
        this.porukaTrajanje = 'Greska u promeni trajanja pregleda!';
        return;
      }
    })
  }
  azuriraj(){
    this.porukaNaziv = '';
    this.porukaCena = '';
    this.porukaTrajanje = '';
    this.naziv = document.getElementById("n").innerText;
    this.promeniNaziv(this.naziv);
    let c = document.getElementById("c");
    let cenaString = c.textContent; 
    this.cena = parseInt(cenaString.trim());
    this.promeniCenu(this.cena);
    let t = document.getElementById("t");
    let trajanjeString = t.textContent; 
    this.trajanje = parseInt(trajanjeString.trim());
    this.promeniTrajanje(this.trajanje);
    this.ngOnInit();
  }

}
