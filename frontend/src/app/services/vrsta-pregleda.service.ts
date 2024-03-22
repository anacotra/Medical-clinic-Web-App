import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VrstaPregledaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/vrstaPregleda";


  dohvatiVrstePregleda(specijalizacija: string, status: string){
    let data = {
      specijalizacija: specijalizacija, 
      status: status   
    }
    return this.http.post(`${this.uri}/dohvatiVrstePregleda`, data)
  }
  dohvatiPoStatusuVrstePregleda(status: string){
    let data = {
      status: status   
    }
    return this.http.post(`${this.uri}/dohvatiPoStatusuVrstePregleda`, data)
  }
  dohvatiPoNazivuVrstuPregleda(naziv: string){
    let data = {
      naziv: naziv   
    }
    return this.http.post(`${this.uri}/dohvatiPoNazivuVrstuPregleda`, data)
  }
  dodaj(naziv: string, specijalizacija: string, cena: number, trajanje: number, status: string){
    let data = {
      naziv: naziv,
      specijalizacija: specijalizacija,
      cena: cena, 
      trajanje: trajanje,
      status: status
    }
    return this.http.post(`${this.uri}/dodaj`, data)
  }
  promeniStatus(naziv: string, specijalizacija: string, cena: number, trajanje: number, status: string){
    let data = {
      naziv: naziv,
      specijalizacija: specijalizacija,
      cena: cena, 
      trajanje: trajanje,
      status: status    
    }
    return this.http.post(`${this.uri}/promeniStatus`, data)
  }
  promeniNaziv(naziv:string, novi: string){
    let data = {
      naziv: naziv,
      novi: novi
    }
    return this.http.post(`${this.uri}/promeniNaziv`, data)
  }
  promeniSpecijalizaciju(naziv:string, specijaizacija: string){
    let data = {
      naziv: naziv,
      specijaizacija: specijaizacija
    }
    return this.http.post(`${this.uri}/promeniSpecijalizaciju`, data)
  }
  promeniCenu(naziv: string, cena: number){
    let data = {
      naziv: naziv,
      cena: cena
    }
    return this.http.post(`${this.uri}/promeniCenu`, data)
  }
  promeniTrajanje(naziv: string, trajanje: number){
    let data = {
      naziv: naziv,
      trajanje: trajanje
    }
    return this.http.post(`${this.uri}/promeniTrajanje`, data)
  }
}
