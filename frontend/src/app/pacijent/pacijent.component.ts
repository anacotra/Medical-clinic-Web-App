import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { ZahtevZaRegistracijuService } from '../services/zahtev-za-registraciju.service';
import { ZahtevZaRegistraciju } from '../models/zahtevZaRegistraciju';



@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})

export class PacijentComponent implements OnInit{
  constructor(private router: Router, private zahtevZaRegistracijuService: ZahtevZaRegistracijuService, private korisnikService: KorisnikService){}

  korisnik: Korisnik;

  ngOnInit():void{
    this.korisnik = JSON.parse(sessionStorage.getItem("ulogovan"));
  }
  
  stara: string = '';
  lozinka: string = '';
  ponovo: string = '';
  error: string = '';

  slika: File | null = null;
  ngSlika: File = null;
  korisnickoIme: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  mejl: string = '';
  porukaKorIme: string = '';
  porukaIme: string = '';
  porukaPrezime: string = '';
  porukaAdresa: string = '';
  porukaTelefon: string = '';
  porukaMejl: string = '';
  porukaSlika: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  promeni(){
    if(this.stara == "" || this.lozinka == "" || this.ponovo==""){
      this.error = "Niste uneli sve podatke!";
      return;
    }
    if(this.lozinka!=this.ponovo){
      this.error = "Nova lozinka mora biti uneta dva puta isto!";
      return;
    }
    this.error = "";
    this.korisnikService.promeniLozinku(this.korisnik.korisnickoIme, this.stara, this.lozinka).subscribe(m=>{
      if(m['message']=='ok'){
        alert('Promenjena lozinka');
        sessionStorage.clear();
        document.getElementById("ZatvoriProzor").click()
        this.router.navigate(['']);
      }
      else{
        this.error = 'Greska';
        return;
      }
    })
  }
  proveraLozinke(){
    if(this.lozinka==""){
      this.error = "";
      return;
    }
    this.error = this.korisnikService.proveriLozinku(this.lozinka);
    return;
  }
  izaberi(event: any) {
    const novaSlika = event.target.files[0] as File;
    if (novaSlika) {
      this.proveriSliku(novaSlika);
    }
  }
  promeniSliku(){
    this.korisnikService.promeniSliku(this.korisnik.korisnickoIme, this.slika).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
          sessionStorage.setItem("ulogovan",JSON.stringify(k));
        })
        this.slika=null;
        this.ngSlika=null;
        this.ngOnInit();
      }else {
        this.porukaSlika = 'Greska u promeni slike!';
        return;
      }
    })
  }
  promeniKorisnickoIme(korisnickoIme: string){
    if(korisnickoIme==this.korisnik.korisnickoIme){
      return;
    }
    this.korisnikService.dohvatiKorisnika(korisnickoIme).subscribe((u:Korisnik)=>{
      if(u){
        this.porukaKorIme = "Korisničko ime je zauzeto!"
        return;
      }
      else {
        this.zahtevZaRegistracijuService.dohvatiZahtev(korisnickoIme).subscribe((p:ZahtevZaRegistraciju)=>{
          if(p){
            this.porukaKorIme = "Korisničko ime je zauzeto!"
            return;
          }
          else{
            this.korisnikService.promeniKorisnickoIme(this.korisnik.korisnickoIme, korisnickoIme).subscribe(m=>{
              if(m['message']=='ok'){
                this.korisnikService.dohvatiKorisnika(korisnickoIme).subscribe((k:Korisnik)=>{
                  this.korisnik = k;
                  sessionStorage.setItem("ulogovan",JSON.stringify(k));
                })
                return;
              } else {
                this.porukaKorIme = 'Greska u promeni korisnickog imena!';
                return;
              }
            })
          }
        })
      }
    })
  }
  promeniIme(ime: string){
    if(ime==this.korisnik.ime){
      return;
    }
    this.korisnikService.promeniIme(this.korisnik.korisnickoIme, ime).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
          sessionStorage.setItem("ulogovan",JSON.stringify(k));
        })
        return;
      } else {
        this.porukaIme = 'Greska u promeni imena!';
        return;
      }
    })
  }
  promeniPrezime(prezime: string){
    if(prezime==this.korisnik.prezime){
      return;
    }
    this.korisnikService.promeniPrezime(this.korisnik.korisnickoIme, prezime).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
          sessionStorage.setItem("ulogovan",JSON.stringify(k));
        })
        return;
      } else {
        this.porukaPrezime = 'Greska u promeni prezimena!';
        return;
      }
    })
  }
  promeniAdresu(adresa: string){
    if(adresa==this.korisnik.adresa){
      return;
    }
    this.korisnikService.promeniAdresu(this.korisnik.korisnickoIme, adresa).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
          sessionStorage.setItem("ulogovan",JSON.stringify(k));
        })
        return;
      } else {
        this.porukaAdresa = 'Greska u promeni adrese!';
        return;
      }
    })
  }
  promeniTelefon(telefon: string){
    if(telefon==this.korisnik.telefon){
      return;
    }
    this.porukaTelefon = this.korisnikService.proveriTelefon(telefon);
    if(this.porukaTelefon==""){
      this.korisnikService.promeniTelefon(this.korisnik.korisnickoIme, telefon).subscribe(m=>{
        if(m['message']=='ok'){
          this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
            this.korisnik = k;
            sessionStorage.setItem("ulogovan",JSON.stringify(k));
          })
          return;
        } else {
          this.porukaTelefon = 'Greska u promeni telefona!';
          return;
        }
      })
    } else return;
  }
  promeniMejl(mejl: string){
    if(mejl==this.korisnik.mejl){
      return;
    }
    this.korisnikService.dohvatiPoMejlu(mejl).subscribe((u:Korisnik)=>{
      if(u){
        this.porukaMejl = "Mejl je zauzet!"
        return;
      }
      else {
        this.zahtevZaRegistracijuService.dohvatiPoMejlu(mejl).subscribe((z:ZahtevZaRegistraciju)=>{
          if(z){
            this.porukaMejl = "Mejl je zauzet!"
            return;
          } else{
            this.porukaMejl = this.korisnikService.proveriMejl(mejl);
            if(this.porukaMejl==""){
              this.korisnikService.promeniMejl(this.korisnik.korisnickoIme, mejl).subscribe(m=>{
                if(m['message']=='ok'){
                  this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
                    this.korisnik = k;
                    sessionStorage.setItem("ulogovan",JSON.stringify(k));
                  })
                  return;
                } else {
                  this.porukaMejl = 'Greska u promeni mejla!';
                  return;
                }
              })
            } else return;
          }
        })
       
      }
    })
  }
  azuriraj(){
    this.porukaKorIme = '';
    this.porukaIme = '';
    this.porukaPrezime = '';
    this.porukaAdresa = '';
    this.porukaTelefon = '';
    this.porukaMejl = '';
    this.korisnickoIme = document.getElementById("ki").innerText;
    this.promeniKorisnickoIme(this.korisnickoIme);
    this.ime = document.getElementById("i").innerText;
    this.promeniIme(this.ime);
    this.prezime = document.getElementById("p").innerText;
    this.promeniPrezime(this.prezime);
    this.adresa = document.getElementById("a").innerText;
    this.promeniAdresu(this.adresa);
    this.telefon = document.getElementById("t").innerText;
    this.promeniTelefon(this.telefon);
    this.mejl = document.getElementById("m").innerText;
    this.promeniMejl(this.mejl);
    this.ngOnInit();
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