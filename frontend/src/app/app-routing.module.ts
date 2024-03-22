import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { RegisterPacComponent } from './register-pac/register-pac.component';
import { LoginMenComponent } from './login-men/login-men.component';
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
import { PacijentAuthGuardService } from './zastita/pacijent-auth-guard.service';
import { LekarAuthGuardService } from './zastita/lekar-auth-guard.service';
import { MenadzerAuthGuardService } from './zastita/menadzer-auth-guard.service';

const routes: Routes = [
  {path:'', component: PocetnaComponent},
  {path:'loginMen', component: LoginMenComponent},
  {path:'registerPac',component: RegisterPacComponent},
  {path:'pacijent', component: PacijentComponent, canActivate: [PacijentAuthGuardService]},
  {path:'lekar', component: LekarComponent, canActivate: [LekarAuthGuardService]},
  {path:'menadzer', component: MenadzerComponent, canActivate: [MenadzerAuthGuardService]},
  {path:'tabelaLek', component: TabelaLekComponent, canActivate: [PacijentAuthGuardService]},
  {path:'vidiProfil', component: VidiProfilComponent, canActivate: [PacijentAuthGuardService]},
  {path:'preglediPac', component: PreglediPacComponent, canActivate: [PacijentAuthGuardService]},
  {path:'obavestenjaPac', component: ObavestenjaPacComponent, canActivate: [PacijentAuthGuardService]},
  {path:'preglediLek', component: PreglediLekComponent, canActivate: [LekarAuthGuardService]},
  {path:'razno', component: RaznoComponent, canActivate: [LekarAuthGuardService]},
  {path:'karton', component: KartonComponent, canActivate: [LekarAuthGuardService]},
  {path:'azurirajMen', component: AzurirajMenComponent, canActivate: [MenadzerAuthGuardService]},
  {path:'specijalizacijeMen', component: SpecijalizacijeMenComponent, canActivate: [MenadzerAuthGuardService]},
  {path:'vrstePregledaMen', component: VrstePregledaMenComponent, canActivate: [MenadzerAuthGuardService]},
  {path:'azurirajVrste', component: AzurirajVrsteComponent, canActivate: [MenadzerAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
