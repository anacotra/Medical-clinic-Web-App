import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { ZahtevZaRegistracijuService } from '../services/zahtev-za-registraciju.service';
import { ZahtevZaRegistraciju } from '../models/zahtevZaRegistraciju';
import { PregledService } from '../services/pregled.service';
import { SpecijalizacijaService } from '../services/specijalizacija.service';


@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService,private pregledService: PregledService, private zahtevZaRegistracijuService: ZahtevZaRegistracijuService, private specijalizacijaService: SpecijalizacijaService){}

  sviKorisnici: Korisnik [];
  sviZahtevi: ZahtevZaRegistraciju[];
  korisnik: Korisnik;

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("ulogovan"));
    this.korisnikService.dohvatiKorisnikeNeMen().subscribe((k:Korisnik[])=>{
      this.sviKorisnici = k;
    })  
    this.zahtevZaRegistracijuService.dohvatiZahteveUObradi().subscribe((z:ZahtevZaRegistraciju[])=>{
      this.sviZahtevi = z;
    })
  }

  stara: string = '';
  lozinkaProv: string = '';
  ponovo: string = '';
  sakrij: boolean = true;
  errorProv: string = '';

  slika: File | null = null;
  korisnickoIme: string = '';
  lozinkaNov: string = '';
  lozinkapotvrda: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  mejl: string = '';
  brojLekLic: string = '';
  ogranak: string = '';
  specijalizacija: string = '';
  tip: string = 'lekar';
  errorNov: string = '';

  porukaKorIme: string = '';
  porukaMejl: string = '';
  porukaLozinka: string = '';
  porukaLozinkaPot: string = '';
  porukaTelefon: string = '';
  porukaSlika: string = '';
  porukaSpecijalizacija: string = '';
  porukaLicenca: string = '';

 
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  izaberi(event: any) {
    const novaSlika = event.target.files[0] as File;
    if (novaSlika) {
      this.proveriSliku(novaSlika);
    }
  }
  promeni(){
    if(this.stara == "" || this.lozinkaProv == "" || this.ponovo==""){
      this.errorProv = "Niste uneli sve podatke!";
      return;
    }
    if(this.lozinkaProv!=this.ponovo){
      this.errorProv = "Nova lozinka mora biti uneta dva puta isto!";
      return;
    }
    this.errorProv = "";
    this.korisnikService.promeniLozinku(this.korisnik.korisnickoIme, this.stara, this.lozinkaProv).subscribe(m=>{
      if(m['message']=='ok'){
        alert('Promenjena lozinka');
        sessionStorage.clear();
        document.getElementById("ZatvoriProzor").click()
        this.router.navigate(['']);
      }
      else{
        this.errorProv = 'Greska';
        return;
      }
    })
  }
  proveraLozinke(){
    if(this.lozinkaProv==""){
      this.errorProv = "";
      return;
    }
    this.errorProv = this.korisnikService.proveriLozinku(this.lozinkaProv);
    return;
  }
  azuriraj(korIme: string){
    sessionStorage.setItem("korisnickoIme", korIme);
    this.router.navigate(['azurirajMen']);
  }
  obrisi(korIme: string, tip: string){
    this.korisnikService.obrisiKorisnika(korIme).subscribe(m=>{
      if(m['message']=='ok'){
        if(tip == 'pacijent'){
          this.pregledService.obrisiPregledePacijenta(korIme).subscribe(p=>{
            if(p['message']=='ok'){
              alert('Korisnik obrisan');
              this.ngOnInit();
              return;
            }
            else{
              this.errorProv = 'Greska u brisanju pregleda pacijenta!';
              return;
            }
          })
        } else {
          alert('Korisnik obrisan');
          this.ngOnInit();
          return;
        }
      }
      else{
        this.errorProv = 'Greska u brisanju korisnika!';
        return;
      }
    })
  }
  obradiZahtev(z:ZahtevZaRegistraciju, akcija: string){
    let status;
    if(akcija=="prihvati"){
      this.korisnikService.dodajKorisnika(z.korisnickoIme, z.lozinka, z.ime, z.prezime, z.adresa, z.telefon, z.mejl, z.tip, z.slika).subscribe(m=>{
        if(m['message']=='ok'){
          this.zahtevZaRegistracijuService.obrisiZahtev(z.korisnickoIme).subscribe(u=>{
            if(u['message']=='ok'){
              alert('Zahtev obradjen');
              this.ngOnInit();
              return;
            } else{
              this.errorProv='Zahtev nije pravilno obradjen!'
            }
          })
        }
        else{
          this.errorProv = 'Podaci nisu lepo obradjeni!';
          return;
        }
      })
    } else {
      status='odbijen';
      this.zahtevZaRegistracijuService.postaviStatus(z.korisnickoIme, status).subscribe(m=>{
        if(m['message']=='ok'){
          alert('Zahtev obradjen');
          this.ngOnInit();
          return;
        } else{
          this.errorProv = 'Podaci nisu lepo obradjeni!';
          return;
        }
      })
    }
    
  }
  dodajNovogLekara(){
    this.sakrij = !this.sakrij;
    this.errorNov = '';
    return;
  }




  
  proveraKorIme(){
    this.korisnikService.dohvatiKorisnika(this.korisnickoIme).subscribe(u=>{
      if(u){
        this.porukaKorIme = "Korisničko ime je zauzeto!"
        return;
      }
      else {
        this.porukaKorIme = "";
        return;
      }
    })
  }
  proveraMejl(){
    if(this.mejl==""){
      this.porukaMejl = "";
      return;
    }
    this.korisnikService.dohvatiPoMejlu(this.mejl).subscribe(u=>{
      if(u){
        this.porukaMejl = "Mejl je zauzet!"
        return;
      }
      else {
        this.porukaMejl = this.korisnikService.proveriMejl(this.mejl);
      }
    })
  }
  proveraLozinkeNov(){
    if(this.lozinkaNov==""){
      this.porukaLozinka = "";
      return;
    }
    this.porukaLozinka = this.korisnikService.proveriLozinku(this.lozinkaNov);
  }
  proveraLozinkePot(){
    if(this.lozinkapotvrda==""){
      this.porukaLozinkaPot = "";
      return;
    }
    if(this.lozinkapotvrda != this.lozinkaNov){
      this.porukaLozinkaPot = "Mora biti ista kao i lozinka!"
      return;
    } else {
      this.porukaLozinkaPot = "";
      return;
    }
  }
  proveraTelefon(){
    if(this.telefon==""){
      this.porukaTelefon = "";
      return;
    }
    this.porukaTelefon = this.korisnikService.proveriTelefon(this.telefon);
  }
  proveraSpecijalizacija(){
    if(this.specijalizacija==""){
      this.porukaSpecijalizacija = "";
      return;
    }
    this.specijalizacijaService.dohvatiSpecijalizaciju(this.specijalizacija).subscribe(m=>{
      if(m){
        this.porukaSpecijalizacija = ""
        return;
      }
      else {
        this.porukaSpecijalizacija = 'Specijalizacija ne postoji, morate je prvo dodati!'
      }
    })
  }
  proveraLicence(){
    if(this.brojLekLic==""){
      this.porukaLicenca = "";
      return;
    }
    this.korisnikService.dohvatiPoLicenci(this.brojLekLic).subscribe(m=>{
      if(m){
        this.porukaLicenca = "Broj licence je zauzet!"
        return;
      }
      else {
        this.porukaLicenca = "";
      }
    })
  }
  dodajLekara(){
      if(this.korisnickoIme == "" || this.lozinkaNov == "" || this.lozinkapotvrda == ""
      || this.ime == ""|| this.prezime == ""|| this.adresa == ""
      || this.telefon == ""|| this.mejl == ""|| this.brojLekLic == ""
      || this.specijalizacija == ""|| this.ogranak == ""){
        this.errorNov = "Niste uneli sve podatke!";
        return;
      }
      this.errorNov = "";
      if(this.porukaKorIme != '' ||  this.porukaMejl != '' ||  this.porukaLozinka != '' || this.porukaLozinkaPot != '' || this.porukaTelefon != ''|| this.porukaSpecijalizacija != '' ||  this.porukaLicenca != '' ){
        this.errorNov = "Nisu ispravni podaci!"
        return;
      }
      this.korisnikService.dodajLekara(this.korisnickoIme, this.lozinkaNov, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.tip,this.brojLekLic, this.specijalizacija,this.ogranak, this.slika).subscribe(m=>{
          if(m['message']=='ok'){
            this.errorNov = 'Lekar dodat!';
            this.korisnickoIme = this.lozinkaNov = this.ime = this.prezime = this.adresa = this.telefon = this.mejl = this.brojLekLic = this.specijalizacija = this.ogranak = '';
            this.slika = null;
            this.sakrij = true;
            this.ngOnInit();
          }
          else{
            this.errorNov = 'Zahtev nije dodat!';
            return;
          }
      })
  }
  proveriSliku(slika: File){
    const maksimalnaVelicinaKB = 1024; // Postavite maksimalnu veličinu u kilobajtima prema potrebi
    const minimalnaSirina = 100;
    const minimalnaVisina = 100;
    const maksimalnaSirina = 300;
    const maksimalnaVisina = 300;
    const podrzaniFormati = ["image/png", "image/jpeg"]; // Lista podržanih formata

    const velicinaKB = slika.size / 1024; // Pretvaranje bajtova u kilobajte

    if (!podrzaniFormati.includes(slika.type)) {
      this.slika = null; // Resetirajte sliku
      this.porukaSlika = "Slika mora biti u formatu PNG ili JPG."; // Postavite odgovarajući komentar
      return;
    }

    const img = new Image();
    img.src = window.URL.createObjectURL(slika);

    img.onload = () => {
      const sirina = img.width;
      const visina = img.height;

      if (
        velicinaKB <= maksimalnaVelicinaKB &&
        sirina >= minimalnaSirina &&
        visina >= minimalnaVisina &&
        sirina <= maksimalnaSirina &&
        visina <= maksimalnaVisina
      ) {
        this.slika = slika; // Slika je unutar dozvoljenih dimenzija
        this.porukaSlika = null; // Resetirajte komentar
      } else {
        this.slika = null; // Resetirajte sliku
        this.porukaSlika = "Slika treba biti između 100x100px i 300x300px, unutar dozvoljene veličine i u formatu PNG ili JPG."; // Postavite odgovarajući komentar
      }
    };
  }
}
