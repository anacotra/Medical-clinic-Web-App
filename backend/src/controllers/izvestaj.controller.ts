import express from 'express';
import IzvestajModel from '../models/izvestaj'

export class IzvestajController{
    dohvatiIzvestajPacijenta = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;

        IzvestajModel.find({'pacijent': pacijent}, (err, izv)=>{
            if(err) console.log(err)
            else res.json(izv)
        })
    }
    dodajIzvestaj = (req: express.Request, res: express.Response)=>{
        let nova = new IzvestajModel({
            pacijent: req.body.pacijent,
            lekarKorIme: req.body.lekarKorIme,
            lekarIme: req.body.lekarIme,
            lekarPrezime: req.body.lekarPrezime,
            lekarSpecijalizacija: req.body.lekarSpecijalizacija,
            datum: req.body.datum,
            vreme: req.body.vreme,
            razlogDolaska: req.body.razlogDolaska,
            dijagnoza: req.body.dijagnoza,
            preporucenaTerapija: req.body.preporucenaTerapija,
            preporucenDatumKontrole: req.body.preporucenDatumKontrole
        })

        nova.save((err, resp)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
}