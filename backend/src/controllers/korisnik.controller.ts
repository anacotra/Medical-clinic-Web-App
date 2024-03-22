import express from 'express';
import multer from 'multer';
import KorisnikModel from '../models/korisnik';
import korisnik from '../models/korisnik';
const fs = require('fs');
const path = require('path'); 


export class KorisnikController{
    login = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    promeniLozinku = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let stara = req.body.stara;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme, 'lozinka': stara}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme, 'lozinka': stara}, {$set: {'lozinka': lozinka}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniSliku = (req: multer.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let s = '';
        if(req.file == null){
            s ='uploads/profilna.png'
        } else {
            s = req.file.path;
        }
        const slika = `http://localhost:4000/${s.replace(/\\/g, "/")}`;


        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                if (kor.slika) {
                    // Pretvorite URL starog slike u lokalnu putanju
                    const staraSlikaUrl = kor.slika;
                    let staraSlikaPath = staraSlikaUrl.replace('http://localhost:4000/', '');
                    if(staraSlikaPath!='uploads/profilna.png'){
                        staraSlikaPath = staraSlikaPath.replace(/\//g, '\\');
    
                        // Obrišite staru sliku
                        fs.unlink(staraSlikaPath, (unlinkErr) => {
                            if (unlinkErr) {
                                console.log('Greška pri brisanju slike:', unlinkErr);
                            } 
                        });
                    }
                }

                // Zatim ažurirajte korisnikovu sliku sa novom slikom u bazi podataka
                KorisnikModel.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'slika': slika } }, (updateErr, m) => {
                    if (updateErr) {
                        console.log(updateErr);
                        res.json({ 'message': 'error' });
                    } else {
                        res.json({ 'message': 'ok' });
                    }
                });
            } else {
                res.json({ 'message': 'Nema korisnika' });
            }
        })
    }       
    promeniKorisnickoIme = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let novo = req.body.novo;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'korisnickoIme': novo}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else {
                        res.json({'message':'ok'})
                    }
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniIme = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let novo = req.body.novo;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'ime': novo}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniPrezime = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let novo = req.body.novo;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'prezime': novo}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniAdresu = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let novo = req.body.novo;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'adresa': novo}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniTelefon = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let novo = req.body.novo;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'telefon': novo}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniMejl = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let novo = req.body.novo;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'mejl': novo}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    promeniSpecijalizaciju = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let specijalizacija = req.body.specijalizacija;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'specijalizacija': specijalizacija}}, (err, k)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else {
                        KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set:{'vrstePregleda': []}}, (err, m)=>{
                            if(err){
                                console.log(err)
                                res.json({'message':'error'})
                            } 
                            else {
                                res.json({'message':'ok'})
                            }
                        })
                    }
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
        
    }
    dohvatiLekare = (req: express.Request, res: express.Response)=>{
        let tip = req.body.tip;

        KorisnikModel.find({'tip': tip}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    dohvatiKorisnikeNeMen = (req: express.Request, res: express.Response)=>{
        KorisnikModel.find({'tip': {$ne: 'menadzer'}}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    dohvatiKorisnika = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    dohvatiPoMejlu = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;

        KorisnikModel.findOne({'mejl': mejl}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    dohvatiPoLicenci = (req: express.Request, res: express.Response)=>{
        let brojLekLic = req.body.brojLekLic;

        KorisnikModel.findOne({'brojLekLic': brojLekLic}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    dodajVrstePregleda = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        let vrstePregleda = req.body.vrstePregleda;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'vrstePregleda': vrstePregleda}},  (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
    }
    obrisiKorisnika = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                if (kor.slika) {
                    // Pretvorite URL starog slike u lokalnu putanju
                    const staraSlikaUrl = kor.slika;
                    let staraSlikaPath = staraSlikaUrl.replace('http://localhost:4000/', '');
                    if(staraSlikaPath!='uploads/profilna.png'){
                        staraSlikaPath = staraSlikaPath.replace(/\//g, '\\');
    
                        // Obrišite staru sliku
                        fs.unlink(staraSlikaPath, (unlinkErr) => {
                            if (unlinkErr) {
                                console.log('Greška pri brisanju slike:', unlinkErr);
                            } 
                        });
                    }
                }

                KorisnikModel.deleteOne({'korisnickoIme': korisnickoIme}, (err, p)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'Greska!'})
                    } else res.json({'message':'ok'})
                })
            }
        })
    }
    dodajKorisnika = (req: express.Request, res: express.Response)=>{
        let novi = new korisnik({
            korisnickoIme: req.body.korisnickoIme,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            tip: req.body.tip,
            slika: req.body.slika
        });

        novi.save((err, resp)=>{
            if(err){
                console.log(err);
                res.status(500).json({ 'message' : 'Došlo je do greške prilikom dodavanja korisnika.' });          
            } else{
                res.json({'message' : 'ok' });
            }
            
        });
    }
    dodajLekara = (req: multer.Request, res: express.Response)=>{
        const { korisnickoIme, lozinka, ime, prezime, adresa, telefon, mejl, tip,brojLekLic, specijalizacija, ogranak} = req.body;
        let s = '';
        if(req.file == null){
            s ='uploads/profilna.png'
        } else {
            s = req.file.path;
        }
        const slika = `http://localhost:4000/${s.replace(/\\/g, "/")}`;;
    
        const novi = new KorisnikModel({
            korisnickoIme,
            lozinka,
            ime,
            prezime,
            adresa,
            telefon,
            mejl,
            tip,
            brojLekLic,
            specijalizacija,
            ogranak,
            slika
        });
    
        novi.save((err, resp)=>{
            if(err){
                console.log(err);
                res.status(500).json({ 'message' : 'Došlo je do greške prilikom dodavanja zahteva.' });          
            } else{
                res.json({'message' : 'ok' });
            }
                
        });
    }
    dodajSlobodanDan = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        let slobodanDan = req.body.slobodanDan;

        KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$push: {'slobodniDani': slobodanDan}},  (err, m)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'})
            } 
            else res.json({'message':'ok'})
        })
    }
    dodajGodisnji = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        let lista = req.body.lista;

        KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: { 'godisnji': lista }},  (err, m)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'})
            } 
            else res.json({'message':'ok'})
        })
    }
    obrisiVrstePregleda = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        
        KorisnikModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else if(kor){
                KorisnikModel.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'vrstePregleda': []}}, (err, m)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } 
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'Nema korisnika'})
            }
        })
    }
    promeniNazivVrste = (req: express.Request, res: express.Response)=>{
        let vrsta = req.body.vrsta
        let novo = req.body.novo

        KorisnikModel.updateMany({ 'vrstePregleda': vrsta }, { $set: { 'vrstePregleda.$': novo } },  (err, m)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'})
            } 
            else{
                        res.json({'message':'ok'})
                    
            } 
        })
    }
}