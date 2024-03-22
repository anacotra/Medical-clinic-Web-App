"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrstaPregledaController = void 0;
const vrstaPregleda_1 = __importDefault(require("../models/vrstaPregleda"));
const vrstaPregleda_2 = __importDefault(require("../models/vrstaPregleda"));
class VrstaPregledaController {
    constructor() {
        this.dohvatiVrstePregleda = (req, res) => {
            let specijalizacija = req.body.specijalizacija;
            let status = req.body.status;
            vrstaPregleda_1.default.find({ 'specijalizacija': specijalizacija, 'status': status }, (err, preg) => {
                if (err)
                    console.log(err);
                else
                    res.json(preg);
            });
        };
        this.dohvatiPoStatusuVrstePregleda = (req, res) => {
            let status = req.body.status;
            vrstaPregleda_1.default.find({ 'status': status }, (err, preg) => {
                if (err)
                    console.log(err);
                else
                    res.json(preg);
            });
        };
        this.dohvatiPoNazivuVrstuPregleda = (req, res) => {
            let naziv = req.body.naziv;
            vrstaPregleda_1.default.findOne({ 'naziv': naziv }, (err, preg) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(preg);
                }
            });
        };
        this.dodaj = (req, res) => {
            let novaVrsta = new vrstaPregleda_2.default({
                naziv: req.body.naziv,
                specijalizacija: req.body.specijalizacija,
                cena: req.body.cena,
                trajanje: req.body.trajanje,
                status: req.body.status
            });
            novaVrsta.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Došlo je do greške prilikom dodavanja zahteva.' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.promeniStatus = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            let cena = req.body.cena;
            let trajanje = req.body.trajanje;
            let status = req.body.status;
            vrstaPregleda_1.default.updateOne({ $and: [{ 'naziv': naziv }, { 'specijalizacija': specijalizacija }, { 'cena': cena }, { 'trajanje': trajanje }] }, { $set: { 'status': status } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.promeniNaziv = (req, res) => {
            let naziv = req.body.naziv;
            let novi = req.body.novi;
            vrstaPregleda_1.default.updateOne({ 'naziv': naziv }, { $set: { 'naziv': novi } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.promeniSpecijalizaciju = (req, res) => {
            let naziv = req.body.naziv;
            let specijaizacija = req.body.specijaizacija;
            vrstaPregleda_1.default.updateOne({ 'naziv': naziv }, { $set: { 'specijaizacija': specijaizacija } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.promeniCenu = (req, res) => {
            let naziv = req.body.naziv;
            let cena = req.body.cena;
            vrstaPregleda_1.default.updateOne({ 'naziv': naziv }, { $set: { 'cena': cena } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.promeniTrajanje = (req, res) => {
            let naziv = req.body.naziv;
            let trajanje = req.body.trajanje;
            vrstaPregleda_1.default.updateOne({ 'naziv': naziv }, { $set: { 'trajanje': trajanje } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.VrstaPregledaController = VrstaPregledaController;
//# sourceMappingURL=vrstaPregleda.controller.js.map