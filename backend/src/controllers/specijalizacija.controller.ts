import express from 'express';
import SpecijalizacijaModel from '../models/specijalizacija';

export class SpecijalizacijaController{
    dohvatiSpecijalizacije = (req: express.Request, res: express.Response)=>{
        SpecijalizacijaModel.find({}, (err, spec)=>{
            if(err) console.log(err)
            else res.json(spec)
        })
    }
    dohvatiSpecijalizaciju = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        
        SpecijalizacijaModel.findOne({'naziv': naziv}, (err, spec)=>{
            if(err) console.log(err)
            else res.json(spec)
        })
    }
    dodaj = (req: express.Request, res: express.Response)=>{
        let nova = new SpecijalizacijaModel({
            naziv: req.body.naziv
        });
        
        nova.save((err, resp)=>{
            if(err){
                console.log(err);
                res.status(500).json({ 'message' : 'Greska' });          
            } else{
                res.json({'message' : 'ok' });
            }
        })
    }
    dodajVrstuPregleda= (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let vrsta = req.body.vrsta

        SpecijalizacijaModel.updateOne({'naziv': naziv}, {$push: {'vrstePregleda': vrsta}},  (err, m)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'})
            } 
            else res.json({'message':'ok'})
        })

    }
    ukloniVrstuPregleda = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let vrsta = req.body.vrsta

        SpecijalizacijaModel.updateOne({'naziv': naziv}, {$pull: {'vrstePregleda': vrsta}},  (err, m)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'})
            } 
            else res.json({'message':'ok'})
        })
    }
    promeniNazivVrste = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let vrsta = req.body.vrsta
        let novo = req.body.novo

        SpecijalizacijaModel.updateOne({'naziv': naziv}, {$pull:{'vrstePregleda':vrsta}},  (err, m)=>{
            if(err){
                console.log(err)
                res.json({'message':'error'})
            } 
            else{
                SpecijalizacijaModel.updateOne({'naziv': naziv}, {$push:{'vrstePregleda':novo}},  (err, p)=>{
                    if(err){
                        console.log(err)
                        res.json({'message':'error'})
                    } else {
                        res.json({'message':'ok'})
                    }
                })
            } 
        })
    }
}