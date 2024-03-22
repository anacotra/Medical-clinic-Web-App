import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { ZahtevZaRegistracijuService } from '../services/zahtev-za-registraciju.service';

@Component({
  selector: 'app-register-pac',
  templateUrl: './register-pac.component.html',
  styleUrls: ['./register-pac.component.css']
})
export class RegisterPacComponent {
  constructor(private router: Router, private korisnikService: KorisnikService, private zahtevZaRegistracijuService: ZahtevZaRegistracijuService){}

  ngOnInit():void{}

  slika: File | null = null;
  korisnickoIme: string = '';
  lozinka: string = '';
  lozinkapotvrda: string = '';
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  telefon: string = '';
  mejl: string = '';
  tip: string = 'pacijent';
  status: string = 'U obradi';
  error: string = '';

  porukaKorIme: string = '';
  porukaMejl: string = '';
  porukaLozinka: string = '';
  porukaLozinkaPot: string = '';
  porukaTelefon: string = '';
  porukaSlika: string = '';

  nazad(){
    sessionStorage.clear()
    this.router.navigate(['']);
  }
  izaberi(event: any) {
    const novaSlika = event.target.files[0] as File;
    if (novaSlika) {
      this.proveriSliku(novaSlika);
    }
  }
  registracija(){
    if(this.korisnickoIme == "" || this.lozinka == "" || this.lozinkapotvrda == ""
    || this.ime == ""|| this.prezime == ""|| this.adresa == ""
    || this.telefon == ""|| this.mejl == ""){
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    if(this.porukaKorIme != '' ||  this.porukaMejl != '' ||  this.porukaLozinka != '' || this.porukaLozinkaPot != '' || this.porukaTelefon != ''){
      this.error = "Nisu ispravni podaci!"
      return;
    }
    this.zahtevZaRegistracijuService.dodajZahtev(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.adresa, this.telefon, this.mejl, this.tip, this.status, this.slika).subscribe(m=>{
        if(m['message']=='ok'){
          this.error = 'Zahtev dodat!';
        }
        else{
          this.error = 'Zahtev nije dodat!';
          return;
        }
    })
    this.router.navigate([''])
  }
  proveraKorIme(){
    this.korisnikService.dohvatiKorisnika(this.korisnickoIme).subscribe(u=>{
      if(u){
        this.porukaKorIme = "Korisničko ime je zauzeto!"
        return;
      }
      else {
        this.zahtevZaRegistracijuService.dohvatiZahtev(this.korisnickoIme).subscribe(m=>{
          if(m){
            this.porukaKorIme = "Korisničko ime je zauzeto!"
            return;
          } else {
            this.porukaKorIme = "";
            return;
          }
        })
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
      } else {
        this.zahtevZaRegistracijuService.dohvatiPoMejlu(this.mejl).subscribe(m=>{
          if(m){
            this.porukaMejl = "Mejl je zauzet!"
            return;
          } else {
            this.porukaMejl = this.korisnikService.proveriMejl(this.mejl);
            return;
          }
        })
      }
    })
  }
  proveraLozinke(){
    if(this.lozinka==""){
      this.porukaLozinka = "";
      return;
    }
    this.porukaLozinka = this.korisnikService.proveriLozinku(this.lozinka);
    return;
  }
  proveraLozinkePot(){
    if(this.lozinkapotvrda==""){
      this.porukaLozinkaPot = "";
      return;
    }
    if(this.lozinkapotvrda != this.lozinka){
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
