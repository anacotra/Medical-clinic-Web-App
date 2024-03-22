import express from 'express';
import PregledModel from '../models/pregled';
import Pregled from '../models/pregled';

export class PregledController{
    dohvatiPregledeLekara = (req: express.Request, res: express.Response)=>{
        let lekar = req.body.lekar;
        let status = 'aktivan'

        PregledModel.find({'lekar': lekar, 'status': status}, (err, preg)=>{
            if(err) console.log(err)
            else res.json(preg)
        })
    }
    dohvatiPregledePacijenta = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;
        let status = 'aktivan'

        PregledModel.find({'pacijent': pacijent, 'status': status}, (err, preg)=>{
            if(err) console.log(err)
            else res.json(preg)
        })
    }
    dodajPregled = (req: express.Request, res: express.Response)=>{
        let status = 'aktivan'
        let nova = new Pregled({
            lekar: req.body.lekar,
            imeLekara: req.body.imeLekara,
            prezimeLekara: req.body.prezimeLekara,
            pacijent: req.body.pacijent,
            naziv: req.body.naziv,
            trajanje: req.body.trajanje,
            cena: req.body.cena,
            datum: req.body.datum,
            vreme: req.body.vreme,
            ogranak: req.body.ogranak,
            status: status
        })

        nova.save((err, resp)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
    otkaziPregled = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let status = 'otkazan';

        PregledModel.updateOne({$and:[{'pacijent': pacijent},{'datum': datum}, {'vreme': vreme}]}, { $set: { 'status': status }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
    otkaziPregledUzObjasnjenje = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let objasnjenje = req.body.objasnjenje;
        let status = 'otkazan';

        PregledModel.updateOne({$and:[{'pacijent': pacijent},{'datum': datum}, {'vreme': vreme}]}, { $set:{'objasnjenje': objasnjenje, 'status': status }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
    obrisiPregledePacijenta = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;

        PregledModel.deleteMany({'pacijent': pacijent}, (err, kor)=>{
            if(err){
                console.log(err)
                res.json({'message':'Greska!'})
            } else res.json({'message':'ok'})
        })
    }
    postaviStatus = (req: express.Request, res: express.Response)=>{
        let pacijent = req.body.pacijent;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let status = req.body.status;

        PregledModel.updateOne({$and:[{'pacijent': pacijent},{'datum': datum}, {'vreme': vreme}]}, { $set: { 'status': status }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
}