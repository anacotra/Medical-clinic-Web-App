import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregled } from '../models/pregled';
import { vrstaPregleda } from '../models/vrstaPregleda';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/pregled";

  dohvatiPregledeLekara(lekar: string){
    let data = {
      lekar: lekar    
    }
    return this.http.post(`${this.uri}/dohvatiPregledeLekara`, data)
  }
  dohvatiPregledePacijenta(pacijent: string){
    let data = {
      pacijent: pacijent    
    }
    return this.http.post(`${this.uri}/dohvatiPregledePacijenta`, data)
  }
  obrisiPregledePacijenta(pacijent: string){
    let data = {
      pacijent: pacijent    
    }
    return this.http.post(`${this.uri}/obrisiPregledePacijenta`, data)
  }
  proveraNaDatum(datum: string, vreme: string, trajanje: number): boolean{
    let datumPoc = new Date(`${datum}T${vreme}`);
    let datumProv = new Date(`${datum}T${vreme}`);
    let danUNedelji = datumPoc.getDay();
    datumPoc = new Date(`${datum}T${vreme}`);
    datumProv.setMinutes(datumProv.getMinutes()+trajanje);
    if (datumProv.getMinutes() >= 60) {
      datumProv.setHours(datumProv.getHours() + 1);
      datumProv.setMinutes(datumProv.getMinutes() - 60);
    }
    let datumSad = new Date();
    if(datumPoc < datumSad){
      return false;
    } else if(((danUNedelji==1 || danUNedelji==2 || danUNedelji==3 || danUNedelji==4 || danUNedelji==5) && (datumProv.getHours()> 20 || datumPoc.getHours()<8)) || ((danUNedelji==0 || danUNedelji==6) && (datumProv.getHours()> 15 || datumPoc.getHours()<10))){
      return false;
    } else{
      return true;
    }  
  }
  proveriSlobodnostLekara(lekar: Korisnik, pregledi: Pregled[], datum: string, vreme: string, trajanje: number): boolean{
    let datumProv = new Date(`${datum}T${vreme}`);
    let datumProvKr = new Date(`${datum}T${vreme}`);
    datumProvKr.setMinutes(datumProv.getMinutes() + trajanje);
    if (datumProvKr.getMinutes() >= 60) {
      datumProvKr.setHours(datumProvKr.getHours() + 1);
      datumProvKr.setMinutes(datumProvKr.getMinutes() - 60);
    }
    let param = true;
    for(let p of pregledi){
      let datumPreg = new Date(`${p.datum}T${p.vreme}`);
      let krajPreg = new Date(`${p.datum}T${p.vreme}`);
      krajPreg.setMinutes(datumPreg.getMinutes() + p.trajanje);
      if (krajPreg.getMinutes() >= 60) {
          krajPreg.setHours(krajPreg.getHours() + 1);
          krajPreg.setMinutes(krajPreg.getMinutes() - 60);
      }
      if(p.datum==datum){
        if((datumProv > datumPreg && datumProv < krajPreg) || (datumProvKr < krajPreg && datumProvKr > datumPreg)){
          param = false;
        }
      }
      if(lekar.slobodniDani){
        for(let d of lekar.slobodniDani){
          if(datum==d){
            param = false;
          }
        }
      }
      if(lekar.godisnji){
        if(datum==lekar.godisnji[0] || datum==lekar.godisnji[1]|| (lekar.godisnji[0]<datum && datum<lekar.godisnji[1])){
          param=false;
        }
      }
    }
    return param;
  }
  dodajPregled(lekar: string, imeLekara: string, prezimeLekara: string, pacijent: string, vrsPreg: vrstaPregleda, datum: string, vreme: string, ogranak: string){
    let data = {
      lekar: lekar,
      imeLekara: imeLekara,
      prezimeLekara: prezimeLekara,
      pacijent: pacijent,
      naziv: vrsPreg.naziv,
      trajanje: vrsPreg.trajanje,
      cena: vrsPreg.cena,
      datum: datum,
      vreme: vreme, 
      ogranak: ogranak
    }
    return this.http.post(`${this.uri}/dodajPregled`, data)
  }
  sortirajPregledePoDatumima(pregledi: Pregled[]):Pregled[]{
    pregledi.sort((a, b) => {
      const datumVremeA = new Date(`${a.datum}T${a.vreme}`);
      const datumVremeB = new Date(`${b.datum}T${b.vreme}`);
      return datumVremeA.getTime() - datumVremeB.getTime();
    });
    return pregledi;
  }
  otkaziPregled(pacijent: string, datum: string, vreme: string){
    let data = {
      pacijent: pacijent,
      datum: datum,
      vreme: vreme
    }
    return this.http.post(`${this.uri}/otkaziPregled`, data)
  }
  otkaziPregledUzObjasnjenje(pacijent: string, datum: string, vreme: string, objasnjenje: string){
    let data = {
      pacijent: pacijent,
      datum: datum,
      vreme: vreme,
      objasnjenje: objasnjenje
    }
    return this.http.post(`${this.uri}/otkaziPregledUzObjasnjenje`, data)
  }
  postaviStatus(pacijent: string, datum: string, vreme: string, status: string){
    let data = {
      pacijent: pacijent,
      datum: datum,
      vreme: vreme,
      status: status
    }
    return this.http.post(`${this.uri}/postaviStatus`, data)
  }
}
