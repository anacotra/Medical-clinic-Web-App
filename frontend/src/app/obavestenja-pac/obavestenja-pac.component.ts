import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obavestenja-pac',
  templateUrl: './obavestenja-pac.component.html',
  styleUrls: ['./obavestenja-pac.component.css']
})
export class ObavestenjaPacComponent implements OnInit {

  constructor(private router: Router){}
  ngOnInit(): void {

  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
