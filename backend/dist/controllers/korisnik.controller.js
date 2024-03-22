"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const korisnik_2 = __importDefault(require("../models/korisnik"));
const fs = require('fs');
const path = require('path');
class KorisnikController {
    constructor() {
        this.login = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.promeniLozinku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let stara = req.body.stara;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': stara }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme, 'lozinka': stara }, { $set: { 'lozinka': lozinka } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniSliku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let s = '';
            if (req.file == null) {
                s = 'uploads/profilna.png';
            }
            else {
                s = req.file.path;
            }
            const slika = `http://localhost:4000/${s.replace(/\\/g, "/")}`;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    if (kor.slika) {
                        // Pretvorite URL starog slike u lokalnu putanju
                        const staraSlikaUrl = kor.slika;
                        let staraSlikaPath = staraSlikaUrl.replace('http://localhost:4000/', '');
                        if (staraSlikaPath != 'uploads/profilna.png') {
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
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'slika': slika } }, (updateErr, m) => {
                        if (updateErr) {
                            console.log(updateErr);
                            res.json({ 'message': 'error' });
                        }
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniKorisnickoIme = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novo = req.body.novo;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'korisnickoIme': novo } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniIme = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novo = req.body.novo;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'ime': novo } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniPrezime = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novo = req.body.novo;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'prezime': novo } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniAdresu = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novo = req.body.novo;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'adresa': novo } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniTelefon = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novo = req.body.novo;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'telefon': novo } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniMejl = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novo = req.body.novo;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'mejl': novo } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniSpecijalizaciju = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let specijalizacija = req.body.specijalizacija;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'specijalizacija': specijalizacija } }, (err, k) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else {
                            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'vrstePregleda': [] } }, (err, m) => {
                                if (err) {
                                    console.log(err);
                                    res.json({ 'message': 'error' });
                                }
                                else {
                                    res.json({ 'message': 'ok' });
                                }
                            });
                        }
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.dohvatiLekare = (req, res) => {
            let tip = req.body.tip;
            korisnik_1.default.find({ 'tip': tip }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.dohvatiKorisnikeNeMen = (req, res) => {
            korisnik_1.default.find({ 'tip': { $ne: 'menadzer' } }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.dohvatiPoMejlu = (req, res) => {
            let mejl = req.body.mejl;
            korisnik_1.default.findOne({ 'mejl': mejl }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.dohvatiPoLicenci = (req, res) => {
            let brojLekLic = req.body.brojLekLic;
            korisnik_1.default.findOne({ 'brojLekLic': brojLekLic }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.dodajVrstePregleda = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let vrstePregleda = req.body.vrstePregleda;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'vrstePregleda': vrstePregleda } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.obrisiKorisnika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    if (kor.slika) {
                        // Pretvorite URL starog slike u lokalnu putanju
                        const staraSlikaUrl = kor.slika;
                        let staraSlikaPath = staraSlikaUrl.replace('http://localhost:4000/', '');
                        if (staraSlikaPath != 'uploads/profilna.png') {
                            staraSlikaPath = staraSlikaPath.replace(/\//g, '\\');
                            // Obrišite staru sliku
                            fs.unlink(staraSlikaPath, (unlinkErr) => {
                                if (unlinkErr) {
                                    console.log('Greška pri brisanju slike:', unlinkErr);
                                }
                            });
                        }
                    }
                    korisnik_1.default.deleteOne({ 'korisnickoIme': korisnickoIme }, (err, p) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'Greska!' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
            });
        };
        this.dodajKorisnika = (req, res) => {
            let novi = new korisnik_2.default({
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
            novi.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Došlo je do greške prilikom dodavanja korisnika.' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dodajLekara = (req, res) => {
            const { korisnickoIme, lozinka, ime, prezime, adresa, telefon, mejl, tip, brojLekLic, specijalizacija, ogranak } = req.body;
            let s = '';
            if (req.file == null) {
                s = 'uploads/profilna.png';
            }
            else {
                s = req.file.path;
            }
            const slika = `http://localhost:4000/${s.replace(/\\/g, "/")}`;
            ;
            const novi = new korisnik_1.default({
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
            novi.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Došlo je do greške prilikom dodavanja zahteva.' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dodajSlobodanDan = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let slobodanDan = req.body.slobodanDan;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $push: { 'slobodniDani': slobodanDan } }, (err, m) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dodajGodisnji = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lista = req.body.lista;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'godisnji': lista } }, (err, m) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.obrisiVrstePregleda = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else if (kor) {
                    korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'vrstePregleda': [] } }, (err, m) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'error' });
                        }
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    res.json({ 'message': 'Nema korisnika' });
                }
            });
        };
        this.promeniNazivVrste = (req, res) => {
            let vrsta = req.body.vrsta;
            let novo = req.body.novo;
            korisnik_1.default.updateMany({ 'vrstePregleda': vrsta }, { $set: { 'vrstePregleda.$': novo } }, (err, m) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map