import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecijalizacijaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/specijalizacija";

  dohvatiSpecijalizacije(){
    return this.http.post(`${this.uri}/dohvatiSpecijalizacije`, {})
  }
  dohvatiSpecijalizaciju(naziv:string){
    let data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/dohvatiSpecijalizaciju`, data)
  }
  dodaj(naziv:string){
    let data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/dodaj`, data)
  }
  dodajVrstuPregleda(naziv: string, vrsta: string){
    let data = {
      naziv: naziv,
      vrsta: vrsta
    }
    return this.http.post(`${this.uri}/dodajVrstuPregleda`, data)
  }
  ukloniVrstuPregleda(naziv: string, vrsta: string){
    let data = {
      naziv: naziv,
      vrsta: vrsta
    }
    return this.http.post(`${this.uri}/ukloniVrstuPregleda`, data)
  }
  promeniNazivVrste(naziv: string, vrsta: string, novo: string){
    let data = {
      naziv: naziv,
      vrsta: vrsta,
      novo: novo
    }
    return this.http.post(`${this.uri}/promeniNazivVrste`, data)
  }
}
