"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevZaRegistracijuController = void 0;
const zahtevZaRegistraciju_1 = __importDefault(require("../models/zahtevZaRegistraciju"));
class ZahtevZaRegistracijuController {
    constructor() {
        this.dodajZahtev = (req, res) => {
            const { korisnickoIme, lozinka, ime, prezime, adresa, telefon, mejl, tip, status } = req.body;
            let s = '';
            if (req.file == null) {
                s = 'uploads/profilna.png';
            }
            else {
                s = req.file.path;
            }
            const slika = `http://localhost:4000/${s.replace(/\\/g, "/")}`;
            ;
            const noviZahtev = new zahtevZaRegistraciju_1.default({
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
            noviZahtev.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Došlo je do greške prilikom dodavanja zahteva.' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiZahteve = (req, res) => {
            zahtevZaRegistraciju_1.default.find({}, (err, zah) => {
                if (err)
                    console.log(err);
                else
                    res.json(zah);
            });
        };
        this.dohvatiZahteveUObradi = (req, res) => {
            zahtevZaRegistraciju_1.default.find({ 'status': 'U obradi' }, (err, zah) => {
                if (err)
                    console.log(err);
                else
                    res.json(zah);
            });
        };
        this.dohvatiPoMejlu = (req, res) => {
            let mejl = req.body.mejl;
            zahtevZaRegistraciju_1.default.findOne({ 'mejl': mejl }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.obrisiZahtev = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            zahtevZaRegistraciju_1.default.deleteOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greska!' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.postaviStatus = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let status = req.body.status;
            zahtevZaRegistraciju_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'status': status } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dohvatiZahtev = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            zahtevZaRegistraciju_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
    }
}
exports.ZahtevZaRegistracijuController = ZahtevZaRegistracijuController;
//# sourceMappingURL=zahtevZaRegistaciju.controller.js.map