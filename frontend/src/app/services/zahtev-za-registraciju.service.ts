import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevZaRegistracijuService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/zahtevZaRegistraciju";

  dodajZahtev(korisnickoIme: string, lozinka: string, ime: string, prezime: string, adresa: string, telefon: string, mejl: string, tip: string, status: string, slika: File){
    const formData = new FormData();
    formData.append('slika', slika);
    formData.append('korisnickoIme', korisnickoIme);
    formData.append('lozinka', lozinka);
    formData.append('ime', ime);
    formData.append('prezime', prezime);
    formData.append('adresa', adresa);
    formData.append('telefon', telefon);
    formData.append('mejl', mejl);
    formData.append('tip', tip);
    formData.append('status', status);
    
    return this.http.post(`${this.uri}/dodajZahtev`, formData);
  }
  dohvatiZahteve(){
    return this.http.post(`${this.uri}/dohvatiZahteve`, {});
  }
  dohvatiZahteveUObradi(){
    return this.http.post(`${this.uri}/dohvatiZahteveUObradi`, {});
  }
  dohvatiPoMejlu(mejl: string){
    let data = {
      mejl: mejl
    }
    return this.http.post(`${this.uri}/dohvatiPoMejlu`, data);
  }
  obrisiZahtev(korIme: string){
    let data = {
      korisnickoIme: korIme
    }
    return this.http.post(`${this.uri}/obrisiZahtev`, data);
  }
  postaviStatus(korisnickoIme: string, status: string){
    let data = {
      korisnickoIme: korisnickoIme,
      status: status
    }
    return this.http.post(`${this.uri}/postaviStatus`, data);
  }
  dohvatiZahtev(korisnickoIme: string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/dohvatiZahtev`, data);
  }
}
