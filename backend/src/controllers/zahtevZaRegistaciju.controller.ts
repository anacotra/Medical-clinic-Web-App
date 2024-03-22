import express from 'express';
import multer from 'multer';
import ZahtevZaRegistracijuModel from '../models/zahtevZaRegistraciju';

export class ZahtevZaRegistracijuController{    
    dodajZahtev = (req: multer.Request, res: express.Response)=>{
        const { korisnickoIme, lozinka, ime, prezime, adresa, telefon, mejl, tip, status } = req.body;
        let s = '';
        if(req.file == null){
            s ='uploads/profilna.png'
        } else {
            s = req.file.path;
        }
        const slika = `http://localhost:4000/${s.replace(/\\/g, "/")}`;;

        const noviZahtev = new ZahtevZaRegistracijuModel({
            korisnickoIme,
            lozinka,
            ime,
            prezime,
            adresa,
            telefon,
            mejl,
            tip,
            status,
            slika
        });

        noviZahtev.save((err, resp)=>{
            if(err){
                console.log(err);
                res.status(500).json({ 'message' : 'Došlo je do greške prilikom dodavanja zahteva.' });          
            } else{
                res.json({'message' : 'ok' });
            }
            
        });
    }
    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        ZahtevZaRegistracijuModel.find({},(err, zah)=>{
            if(err) console.log(err)
            else res.json(zah)
        })
    }
    dohvatiZahteveUObradi = (req: express.Request, res: express.Response) => {
        ZahtevZaRegistracijuModel.find({'status':'U obradi'},(err, zah)=>{
            if(err) console.log(err)
            else res.json(zah)
        })
    }
    dohvatiPoMejlu = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;

        ZahtevZaRegistracijuModel.findOne({'mejl': mejl}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
    obrisiZahtev = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;

        ZahtevZaRegistracijuModel.deleteOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err){
                console.log(err)
                res.json({'message':'Greska!'})
            } else res.json({'message':'ok'})
        })
    }
    postaviStatus = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;
        let status = req.body.status;

        ZahtevZaRegistracijuModel.updateOne({'korisnickoIme': korisnickoIme}, { $set: { 'status': status }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
    dohvatiZahtev = (req: express.Request, res: express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;

        ZahtevZaRegistracijuModel.findOne({'korisnickoIme': korisnickoIme}, (err, kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }
}