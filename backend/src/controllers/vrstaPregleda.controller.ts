import express from 'express';
import VrstaPregledaModel from '../models/vrstaPregleda';
import vrstaPregleda from '../models/vrstaPregleda';

export class VrstaPregledaController{
    dohvatiVrstePregleda = (req: express.Request, res: express.Response)=>{
        let specijalizacija = req.body.specijalizacija;
        let status = req.body.status;

        VrstaPregledaModel.find({'specijalizacija': specijalizacija, 'status': status}, (err, preg)=>{
            if(err) console.log(err)
            else res.json(preg)
        })
    }
    dohvatiPoStatusuVrstePregleda = (req: express.Request, res: express.Response)=>{
        let status = req.body.status;

        VrstaPregledaModel.find({'status': status}, (err, preg)=>{
            if(err) console.log(err)
            else res.json(preg)
        })
    }
    dohvatiPoNazivuVrstuPregleda = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;

        VrstaPregledaModel.findOne({'naziv': naziv}, (err, preg)=>{
            if(err){
                console.log(err)
            } 
            else{
                res.json(preg)
            } 
        })
    }
    dodaj = (req: express.Request, res: express.Response)=>{
        let novaVrsta = new vrstaPregleda({
            naziv: req.body.naziv,
            specijalizacija: req.body.specijalizacija,
            cena: req.body.cena,
            trajanje: req.body.trajanje,
            status: req.body.status
        });

        novaVrsta.save((err, resp)=>{
            if(err){
                console.log(err);
                res.status(500).json({ 'message' : 'Došlo je do greške prilikom dodavanja zahteva.' });          
            } else{
                res.json({'message' : 'ok' });
            }
            
        });
    }
    promeniStatus = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let specijalizacija = req.body.specijalizacija
        let cena = req.body.cena
        let trajanje = req.body.trajanje
        let status = req.body.status

        VrstaPregledaModel.updateOne({$and:[{'naziv': naziv},{'specijalizacija': specijalizacija}, {'cena': cena}, {'trajanje': trajanje}]}, { $set:{'status': status }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
    promeniNaziv = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let novi = req.body.novi

        VrstaPregledaModel.updateOne({'naziv': naziv}, { $set:{'naziv': novi}}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
    promeniSpecijalizaciju = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let specijaizacija = req.body.specijaizacija

        VrstaPregledaModel.updateOne({'naziv': naziv}, { $set:{'specijaizacija': specijaizacija }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else{
                res.json({'message': 'ok'})
            } 
        })
    }
    promeniCenu = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let cena = req.body.cena

        VrstaPregledaModel.updateOne({'naziv': naziv}, { $set:{'cena': cena }}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else{
                res.json({'message': 'ok'})
            } 
        })
    }
    promeniTrajanje = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv
        let trajanje = req.body.trajanje

        VrstaPregledaModel.updateOne({'naziv': naziv}, { $set:{'trajanje': trajanje}}, (err, o) =>{
            if(err){
                console.log(err)
                res.json({'message':'error'});
            }
            else res.json({'message': 'ok'})
        })
    }
}