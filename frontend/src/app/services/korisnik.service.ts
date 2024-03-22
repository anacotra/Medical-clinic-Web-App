import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Pregled } from '../models/pregled';
import { vrstaPregleda } from '../models/vrstaPregleda';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/korisnik";

  login(korisnickoIme: string, lozinka: string){
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/login`, data)
  }
  promeniLozinku(korisnickoIme: string, stara:string, lozinka: string){
    let data = {
      korisnickoIme: korisnickoIme,
      stara: stara,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/promeniLozinku`, data)
  }
  promeniSliku(korisnickoIme: string, slika: File){
    const formData = new FormData();
    formData.append('slika', slika);
    formData.append('korisnickoIme', korisnickoIme)
    return this.http.post(`${this.uri}/promeniSliku`,formData)
  }
  promeniKorisnickoIme(korisnickoIme: string, novo:string){
    let data = {
      korisnickoIme: korisnickoIme,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniKorisnickoIme`, data)
  }
  promeniIme(korisnickoIme:string, novo:string){
    let data = {
      korisnickoIme: korisnickoIme,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniIme`, data)
  }
  promeniPrezime(korisnickoIme:string, novo:string){
    let data = {
      korisnickoIme: korisnickoIme,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniPrezime`, data)
  }
  promeniAdresu(korisnickoIme:string, novo:string){
    let data = {
      korisnickoIme: korisnickoIme,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniAdresu`, data)
  }
  promeniTelefon(korisnickoIme:string, novo:string){
    let data = {
      korisnickoIme: korisnickoIme,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniTelefon`, data)
  }
  promeniMejl(korisnickoIme:string, novo:string){
    let data = {
      korisnickoIme: korisnickoIme,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniMejl`, data)
  }
  promeniSpecijalizaciju(korisnickoIme: string, specijalizacija: string){
    let data = {
      korisnickoIme: korisnickoIme,
      specijalizacija: specijalizacija
    }
    return this.http.post(`${this.uri}/promeniSpecijalizaciju`, data)
  }
  dohvatiLekare(){
    let lekar = 'lekar';
    let data = {
      tip: lekar    
    }
    return this.http.post(`${this.uri}/dohvatiLekare`, data)
  }
  dohvatiKorisnikeNeMen(){
    return this.http.post(`${this.uri}/dohvatiKorisnikeNeMen`, {})
  }
  dohvatiKorisnika(korisnickoIme: string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/dohvatiKorisnika`, data)
  }
  dohvatiPoMejlu(mejl: string){
    let data = {
      mejl: mejl
    }
    return this.http.post(`${this.uri}/dohvatiPoMejlu`, data)
  }
  dohvatiPoLicenci(brojLekLic: string){
    let data = {
      brojLekLic: brojLekLic
    }
    return this.http.post(`${this.uri}/dohvatiPoLicenci`, data)
  }
  dodajVrstePregleda(korisnickoIme: string, listaVrsta: string[]){
    let data = {
      korisnickoIme: korisnickoIme,
      vrstePregleda: listaVrsta 
    }
    return this.http.post(`${this.uri}/dodajVrstePregleda`, data)
  }
  dodajKorisnika(korisnickoIme: string, lozinka: string, ime: string, prezime: string, adresa: string, telefon: string, mejl: string, tip: string, slika: string){
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      telefon: telefon,
      mejl: mejl,
      tip: tip,
      slika: slika
    }
    return this.http.post(`${this.uri}/dodajKorisnika`, data)
  }
  dodajLekara(korisnickoIme: string, lozinka: string, ime: string, prezime: string, adresa: string, telefon: string, mejl: string, tip: string, brojLekLic: string, specijalizacija: string, ogranak: string, slika: File){
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
    formData.append('brojLekLic', brojLekLic);
    formData.append('specijalizacija', specijalizacija);
    formData.append('ogranak',ogranak);
    
    return this.http.post(`${this.uri}/dodajLekara`, formData);
  }
  obrisiKorisnika(korisnickoIme: string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/obrisiKorisnika`, data)
  }
  obrisiVrstePregleda(korisnickoIme: string){
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/obrisiVrstePregleda`, data)
  }
  sortirajImena(izabrani: Korisnik[], imenaSortirana: boolean): Korisnik[]{
    if(!imenaSortirana){
      izabrani.sort((i1, i2) => (i1.ime > i2.ime ? 1 : -1));
    } else{
      izabrani.sort((i1, i2) => (i1.ime > i2.ime ? -1 : 1));
    }
    return izabrani;
  }
  sortirajPrezimena(izabrani: Korisnik[], prezimenaSortirana: boolean): Korisnik[]{
    if(!prezimenaSortirana){
      izabrani.sort((i1, i2) => (i1.prezime > i2.prezime ? 1 : -1));
    } else{
      izabrani.sort((i1, i2) => (i1.prezime > i2.prezime ? -1 : 1));
    }
    return izabrani;
  }
  sortirajSpec(izabrani: Korisnik[], specSortirana: boolean): Korisnik[]{
    if(!specSortirana){
      izabrani.sort((i1, i2) => (i1.specijalizacija > i2.specijalizacija ? 1 : -1));
    } else{
      izabrani.sort((i1, i2) => (i1.specijalizacija > i2.specijalizacija ? -1 : 1));
    }
    return izabrani;
  }
  sortirajOgranak(izabrani: Korisnik[], ogranakSortirana: boolean): Korisnik[]{
    if(!ogranakSortirana){
      izabrani.sort((i1, i2) => (i1.ogranak > i2.ogranak ? 1 : -1));
    } else{
      izabrani.sort((i1, i2) => (i1.ogranak > i2.ogranak ? -1 : 1));
    }
    return izabrani;
  }
  pretragaImePrezSpec(pretragaIme: string, pretragaPrezime: string, pretragaSpec: string, lekari: Korisnik[], izabrani: Korisnik[]): Korisnik[]{
    let t = [];
      if (pretragaIme === '' && pretragaPrezime === '' && pretragaSpec === '') {
        t.push(...lekari);
      } else {
        lekari.forEach((lekar) => {
          const imeMatch = pretragaIme.toLowerCase() === '' || lekar.ime.toLowerCase().includes(pretragaIme.toLowerCase());
          const prezimeMatch =
            pretragaPrezime.toLowerCase() === '' || lekar.prezime.toLowerCase().includes(pretragaPrezime.toLowerCase());
          const specMatch =
            pretragaSpec.toLowerCase() === '' || lekar.specijalizacija.toLowerCase().includes(pretragaSpec.toLowerCase());
    
          if (imeMatch && prezimeMatch && specMatch) {
            t.push(lekar);
          }
        });
      }
    izabrani = t;
    return izabrani;
  }
  pretragaImePrezSpecOgr(pretragaIme: string, pretragaPrezime: string, pretragaSpec: string, pretragaOgr: string, lekari: Korisnik[], izabrani: Korisnik[]): Korisnik[]{
    let t = [];
      if (pretragaIme === '' && pretragaPrezime === '' && pretragaSpec === '' && pretragaOgr === '') {
        t.push(...lekari);
      } else {
        lekari.forEach((lekar) => {
          const imeMatch = pretragaIme.toLowerCase() === '' || lekar.ime.toLowerCase().includes(pretragaIme.toLowerCase());
          const prezimeMatch =
            pretragaPrezime.toLowerCase() === '' || lekar.prezime.toLowerCase().includes(pretragaPrezime.toLowerCase());
          const specMatch =
            pretragaSpec.toLowerCase() === '' || lekar.specijalizacija.toLowerCase().includes(pretragaSpec.toLowerCase());
          const ogrMatch =
            pretragaOgr.toLowerCase() === '' || lekar.ogranak.toLowerCase().includes(pretragaOgr.toLowerCase());
  
          if (imeMatch && prezimeMatch && specMatch && ogrMatch) {
            t.push(lekar);
          }
        });
      }
    izabrani = t;
    return izabrani;
  }
  proveriLozinku(lozinka: string): string{
    let porukaLozinka;
    const pocetnoReg = /^[a-zA-Z]/;
    const velikoReg = /[A-Z]/;
    const brojReg = /[0-9]/;
    const specReg = /[^a-zA-Z0-9]/;
    const susedniReg = /(.)\1/;
    const lozReg = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*(.)\1)^[A-Za-z].{7,13}$/;
    
    if(!lozReg.test(lozinka)){
      porukaLozinka = "Lozinka mora počinjati slovom, mora sadržati 1 veliko slovo, 1 broj, 1 specijalni karakter, dva susedna karaktera ne smeju biti ista i mora imati od 8 do 14 karaktera!"
      return porukaLozinka;
    }
    else{
      porukaLozinka = "";
      return porukaLozinka;
    }
  }
  proveriMejl(mejl: string): string{
    let porukaMejl;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(mejl)){
      porukaMejl = "";
      return porukaMejl;
    }
    else{
      porukaMejl = "Mejl nije u ispravnom formatu!"
      return porukaMejl;
    }
  }
  proveriTelefon(telefon: string): string{
    let porukaTelefon;
    const telReg = /^\+381\d{2}\/\d{3}\/\d{4}$|^\+381\d{2}\/\d{3}\/\d{3}$/;
    if(!telReg.test(telefon)){
      porukaTelefon = "Telefon je u pogrešnom formatu!"
      return porukaTelefon;
    }
    else {
      porukaTelefon = "";
      return porukaTelefon;
    }
  }
  dodajSlobodanDan(korisnickoIme: string, slobodanDan: string){
    
    let data = {
      korisnickoIme: korisnickoIme,
      slobodanDan: slobodanDan
    }
    return this.http.post(`${this.uri}/dodajSlobodanDan`, data)
  }
  proveraDatumaSlobDan(datum: string, kor: Korisnik): boolean{
    let datumProv = new Date(datum);
    let datumSad = new Date();
    if(datumProv < datumSad){
      return false;
    } 
    if(kor.slobodniDani.length==0){
      return true;
    } 
    for(let d of kor.slobodniDani){
      if(datum==d){
        return false;
      }
    }
    return true;
  }
  dodajGodisnji(korisnickoIme: string, datumPoc: string, datumKraj: string,){
    let lista = [datumPoc, datumKraj]
    let data = {
      korisnickoIme: korisnickoIme,
      lista: lista
    }
    return this.http.post(`${this.uri}/dodajGodisnji`, data)
  }
  proveraDatumaGodisnji(datumPoc: string, datumKraj: string, kor: Korisnik): boolean{
    let datumProvPoc = new Date(datumPoc);
    let datumProvKraj = new Date(datumKraj);
    let datumSad = new Date();
    if(datumProvPoc < datumSad || datumProvKraj < datumSad){
      return false;
    } 
    if(kor.slobodniDani.length!=0){
      for(let d of kor.slobodniDani){
        let datumSlob = new Date(d);
        if(datumProvPoc < datumSlob && datumSlob < datumProvKraj || datumPoc == d || datumKraj == d){
          return false;
        }
      }
    }
    return true;
  }
  promeniNazivVrste(vrsta: string, novo: string){
    let data = {
      vrsta: vrsta,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniNazivVrste`, data)
  }
}