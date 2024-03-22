import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { Korisnik } from '../models/korisnik';
import { Specijalizacija } from '../models/specijalizacija';
import { vrstaPregleda } from '../models/vrstaPregleda';
import { ZahtevZaRegistracijuService } from '../services/zahtev-za-registraciju.service';
import { ZahtevZaRegistraciju } from '../models/zahtevZaRegistraciju';

@Component({
  selector: 'app-azuriraj-men',
  templateUrl: './azuriraj-men.component.html',
  styleUrls: ['./azuriraj-men.component.css']
})
export class AzurirajMenComponent implements OnInit{
  constructor(private router: Router, private zahtevZaRegistracijuService: ZahtevZaRegistracijuService, private korisnikService: KorisnikService, private specijalizacijaService: SpecijalizacijaService, private vrstaPregledaService: VrstaPregledaService){}

  korisnikKomeMenjamoIme: string = '';
  korisnik: Korisnik;
  specijalizacije: Specijalizacija[];
  sveVrstePregleda: vrstaPregleda[];

  ngOnInit():void{
    this.korisnikKomeMenjamoIme = sessionStorage.getItem("korisnickoIme")
    this.korisnikService.dohvatiKorisnika(this.korisnikKomeMenjamoIme).subscribe((u: Korisnik)=>{
      this.korisnik = u;
      this.specijalizacijaService.dohvatiSpecijalizacije().subscribe((s:Specijalizacija[])=>{
        this.specijalizacije = s;
      })
      this.specijalizacija = this.korisnik.specijalizacija;
      let statusakt = 'aktivan';
      this.vrstaPregledaService.dohvatiVrstePregleda(this.specijalizacija, statusakt).subscribe((v:vrstaPregleda[])=>{
        this.sveVrstePregleda = v;
      })
    })
  }

  error: string = '';

  slika: File | null = null;
  ngSlika: File = null;
  korisnickoIme: string = '';
  lozinka: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  mejl: string = '';
  specijalizacija: string = '';
  listaVrsta: string [] = [];
  porukaKorIme: string = '';
  porukaLozinka: string = '';
  porukaIme: string = '';
  porukaPrezime: string = '';
  porukaAdresa: string = '';
  porukaTelefon: string = '';
  porukaMejl: string = '';
  porukaSlika: string = '';
  porukaSpecijalizacija: string = '';
  porukaVrste: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazad(){
    sessionStorage.removeItem("korisnikoIme");
    this.router.navigate(['/menadzer']);
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
        })
        this.ngSlika=null;
        this.slika=null;
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
  promeniLozinku(lozinka: string){
    if(lozinka==this.korisnik.lozinka){
      return;
    }
    this.porukaLozinka = this.korisnikService.proveriLozinku(lozinka);
    if(this.porukaLozinka==''){
      this.korisnikService.promeniLozinku(this.korisnik.korisnickoIme, this.korisnik.lozinka, lozinka).subscribe(m=>{
        if(m['message']=='ok'){
          this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
            this.korisnik = k;
          })
          return;
        } else {
          this.porukaLozinka = 'Greska u promeni lozinke!';
          return;
        }
      })
    } else return;
    
  }
  promeniIme(ime: string){
    if(ime==this.korisnik.ime){
      return;
    }
    this.korisnikService.promeniIme(this.korisnik.korisnickoIme, ime).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
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
        })
        return;
      } else {
        this.porukaAdresa = 'Greska u promeni adrese!';
        return;
      }
    })
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
          })
          return;
        } else {
          this.porukaTelefon = 'Greska u promeni telefona!';
          return;
        }
      })
    } else return;
  }
  promeniSpecijalizaciju(specijalizacija: string){
    if(specijalizacija==this.korisnik.specijalizacija){
      return;
    }          
    this.korisnikService.promeniSpecijalizaciju(this.korisnik.korisnickoIme, specijalizacija).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
          let statusakt = 'aktivan';
          this.vrstaPregledaService.dohvatiVrstePregleda(this.korisnik.specijalizacija, statusakt).subscribe((v:vrstaPregleda[])=>{
            this.sveVrstePregleda = v;
          })
        })
        return;
      } else {
        this.porukaSpecijalizacija = 'Greska u promeni specijaizacije!';
        return;
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
    this.lozinka = document.getElementById("loz").innerText;
    this.promeniLozinku(this.lozinka);
    this.ime = document.getElementById("i").innerText;
    this.promeniIme(this.ime);
    this.prezime = document.getElementById("p").innerText;
    this.promeniPrezime(this.prezime);
    this.adresa = document.getElementById("a").innerText;
    this.promeniAdresu(this.adresa);
    this.mejl = document.getElementById("m").innerText;
    this.promeniMejl(this.mejl);
    this.telefon = document.getElementById("t").innerText;
    this.promeniTelefon(this.telefon);
    this.promeniSpecijalizaciju(this.specijalizacija);
    this.ngOnInit();
  }
  izaberiVrste(){
    this.korisnikService.dodajVrstePregleda(this.korisnik.korisnickoIme, this.listaVrsta).subscribe(m=>{
      if(m['message']=='ok'){
        this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((k:Korisnik)=>{
          this.korisnik = k;
        })
        this.listaVrsta = [];
        this.ngOnInit();
        return;
      } else {
        this.porukaVrste = 'Greska u izboru vrsta!';
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
