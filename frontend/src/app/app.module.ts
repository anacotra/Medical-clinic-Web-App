import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LoginMenComponent } from './login-men/login-men.component';
import { RegisterPacComponent } from './register-pac/register-pac.component';
import { LekarComponent } from './lekar/lekar.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { TabelaLekComponent } from './tabela-lek/tabela-lek.component';
import { VidiProfilComponent } from './vidi-profil/vidi-profil.component';
import { PreglediPacComponent } from './pregledi-pac/pregledi-pac.component';
import { ObavestenjaPacComponent } from './obavestenja-pac/obavestenja-pac.component';
import { PreglediLekComponent } from './pregledi-lek/pregledi-lek.component';
import { RaznoComponent } from './razno/razno.component';
import { KartonComponent } from './karton/karton.component';
import { AzurirajMenComponent } from './azuriraj-men/azuriraj-men.component';
import { SpecijalizacijeMenComponent } from './specijalizacije-men/specijalizacije-men.component';
import { VrstePregledaMenComponent } from './vrste-pregleda-men/vrste-pregleda-men.component';
import { AzurirajVrsteComponent } from './azuriraj-vrste/azuriraj-vrste.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PacijentComponent,
    LoginMenComponent,
    RegisterPacComponent,
    LekarComponent,
    MenadzerComponent,
    TabelaLekComponent,
    VidiProfilComponent,
    PreglediPacComponent,
    ObavestenjaPacComponent,
    PreglediLekComponent,
    RaznoComponent,
    KartonComponent,
    AzurirajMenComponent,
    SpecijalizacijeMenComponent,
    VrstePregledaMenComponent,
    AzurirajVrsteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
