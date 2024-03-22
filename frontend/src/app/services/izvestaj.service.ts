import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Izvestaj } from '../models/izvestaj';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/izvestaj";


  dohvatiIzvestajPacijenta(pacijent: string){
    let data = {
      pacijent: pacijent
    }
    return this.http.post(`${this.uri}/dohvatiIzvestajPacijenta`, data)
  }
  sortirajIzvestajePoDatumima(izvestaji: Izvestaj[]): Izvestaj[]{
    izvestaji.sort((a, b) => {
      const datumVremeA = new Date(`${a.datum}T${a.vreme}`);
      const datumVremeB = new Date(`${b.datum}T${b.vreme}`);
      return datumVremeA.getTime() - datumVremeB.getTime();
    });
    return izvestaji.reverse();
  }
  dodajIzvestaj(pacijent: string, lekarKorIme: string, lekarIme: string, lekarPrezime: string, lekarSpecijalizacija: string, datum: string, vreme: string, razlogDolaska: string, dijagnoza: string, preporucenaTerapija: string, preporucenDatumKontrole: string){
    let data = {
      pacijent: pacijent,
      lekarKorIme: lekarKorIme,
      lekarIme: lekarIme,
      lekarPrezime: lekarPrezime,
      lekarSpecijalizacija: lekarSpecijalizacija,
      datum: datum,
      vreme: vreme,
      razlogDolaska: razlogDolaska,
      dijagnoza: dijagnoza,
      preporucenaTerapija: preporucenaTerapija,
      preporucenDatumKontrole: preporucenDatumKontrole
    }
    return this.http.post(`${this.uri}/dodajIzvestaj`, data)
  }
}
