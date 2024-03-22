import { Component, OnInit } from '@angular/core';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Specijalizacija } from '../models/specijalizacija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specijalizacije-men',
  templateUrl: './specijalizacije-men.component.html',
  styleUrls: ['./specijalizacije-men.component.css']
})
export class SpecijalizacijeMenComponent implements OnInit{

  
  constructor(private router: Router, private specijalizacijaService: SpecijalizacijaService){}

  specijalizacije: Specijalizacija[];

  ngOnInit():void{
    this.specijalizacijaService.dohvatiSpecijalizacije().subscribe((s:Specijalizacija[])=>{
      this.specijalizacije = s;
    })
  }

  naziv: string = '';
  poruka: string = '';

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  dodaj(){
    if(this.naziv==''){
      this.poruka = "Niste uneli naziv!"
      return;
    }
    for(let s of this.specijalizacije){
      if(this.naziv==s.naziv){
        alert("Specijalizacija već postoji!")
        this.naziv='';
        return;
      }
    }
    this.specijalizacijaService.dodaj(this.naziv).subscribe(m=>{
      if(m['message']=='ok'){
        alert("Uspesno dodata specijalizacija!")
        this.naziv = this.poruka = '';
        this.ngOnInit();
        return;
      } else {
        this.poruka = 'Greska!';
        return;
      }
    })
  }

}
