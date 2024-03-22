import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { Pregled } from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { vrstaPregleda } from '../models/vrstaPregleda';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-vidi-profil',
  templateUrl: './vidi-profil.component.html',
  styleUrls: ['./vidi-profil.component.css']
})
export class VidiProfilComponent implements OnInit{
  constructor(private router: Router, private korisnikService: KorisnikService, private pregledService: PregledService, private vrstaPregledaService: VrstaPregledaService){}

  lekarKorIme: string = '';
  pacijent: Korisnik;
  lekar: Korisnik;
  pregledi: Pregled[];
  vrstePregleda: string[];

  ngOnInit():void{
    this.lekarKorIme = sessionStorage.getItem("vidiProfil")
    this.pacijent = JSON.parse(sessionStorage.getItem("ulogovan"));
    this.korisnikService.dohvatiKorisnika(this.lekarKorIme).subscribe((u: Korisnik)=>{
      this.lekar = u;
      this.vrstePregleda = this.lekar.vrstePregleda;
    })
    this.pregledService.dohvatiPregledeLekara(this.lekarKorIme).subscribe((p:Pregled[])=>{
      this.pregledi = p;
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazad(){
    sessionStorage.removeItem("vidiProfil");
    this.router.navigate(['/tabelaLek']);
  }

  sakrij: boolean = true;
  vrsPreg: vrstaPregleda = null;
  vrsta: string = '';
  datumZakazivanja: string = '';
  vremeZakazivanja: string = '';
  poruka: string = '';
  ngDatum: Date = null;
  ngVreme: Time = null;

  zakaziNoviPregled(){
    this.sakrij = !this.sakrij;
    this.poruka = '';
    return;
  }
  ucitajDatum(){
    let datum = document.getElementById('date') as HTMLInputElement;
    this.datumZakazivanja = datum.value;
    return;
  }
  ucitajVreme(){
    let vreme = document.getElementById('time') as HTMLInputElement
    this.vremeZakazivanja = vreme.value;
    return;
  }
  ucitajVrstu(){
    for(let r of this.vrstePregleda){
      if(r==this.vrsta){
        this.vrstaPregledaService.dohvatiPoNazivuVrstuPregleda(r).subscribe((v:vrstaPregleda)=>{
          this.vrsPreg = v;
        });
      }
    }
    return;
  }
  zakazi() {
    if(!this.vrsPreg || this.datumZakazivanja == '' || this.vremeZakazivanja == ''){
      this.poruka = 'Niste uneli sve podatke!';
      return;
    }
    let provera = this.pregledService.proveraNaDatum(this.datumZakazivanja, this.vremeZakazivanja, this.vrsPreg.trajanje);
    let slobodan = this.pregledService.proveriSlobodnostLekara(this.lekar, this.pregledi, this.datumZakazivanja, this.vremeZakazivanja, this.vrsPreg.trajanje);
    if(provera && slobodan){
      this.pregledService.dodajPregled(this.lekarKorIme, this.lekar.ime, this.lekar.prezime, this.pacijent.korisnickoIme, this.vrsPreg, this.datumZakazivanja, this.vremeZakazivanja, this.lekar.ogranak).subscribe(m=>{
        if(m['message']=='ok'){
          alert("Uspesno zakazan pregled!")
          this.vrsta = this.ngDatum = this.ngVreme = null;
          this.sakrij = !this.sakrij;
          this.ngOnInit();
          return;
        } else {
          this.poruka = 'Greska!';
          return;
        }
      })
    } else if(provera){
      this.poruka = 'Termin je zauzet ili lekar nije dostupan u tom periodu!';
      return;
    } else {
      this.poruka = 'Datum je u proslosti, vreme je van radnog vremena, je prekasno da bi se pregled obavio u celini!'
      return
    }
  }

}
