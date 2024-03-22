"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PregledController = void 0;
const pregled_1 = __importDefault(require("../models/pregled"));
const pregled_2 = __importDefault(require("../models/pregled"));
class PregledController {
    constructor() {
        this.dohvatiPregledeLekara = (req, res) => {
            let lekar = req.body.lekar;
            let status = 'aktivan';
            pregled_1.default.find({ 'lekar': lekar, 'status': status }, (err, preg) => {
                if (err)
                    console.log(err);
                else
                    res.json(preg);
            });
        };
        this.dohvatiPregledePacijenta = (req, res) => {
            let pacijent = req.body.pacijent;
            let status = 'aktivan';
            pregled_1.default.find({ 'pacijent': pacijent, 'status': status }, (err, preg) => {
                if (err)
                    console.log(err);
                else
                    res.json(preg);
            });
        };
        this.dodajPregled = (req, res) => {
            let status = 'aktivan';
            let nova = new pregled_2.default({
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
            });
            nova.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.otkaziPregled = (req, res) => {
            let pacijent = req.body.pacijent;
            let datum = req.body.datum;
            let vreme = req.body.vreme;
            let status = 'otkazan';
            pregled_1.default.updateOne({ $and: [{ 'pacijent': pacijent }, { 'datum': datum }, { 'vreme': vreme }] }, { $set: { 'status': status } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.otkaziPregledUzObjasnjenje = (req, res) => {
            let pacijent = req.body.pacijent;
            let datum = req.body.datum;
            let vreme = req.body.vreme;
            let objasnjenje = req.body.objasnjenje;
            let status = 'otkazan';
            pregled_1.default.updateOne({ $and: [{ 'pacijent': pacijent }, { 'datum': datum }, { 'vreme': vreme }] }, { $set: { 'objasnjenje': objasnjenje, 'status': status } }, (err, o) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.obrisiPregledePacijenta = (req, res) => {
            let pacijent = req.body.pacijent;
            pregled_1.default.deleteMany({ 'pacijent': pacijent }, (err, kor) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greska!' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.postaviStatus = (req, res) => {
            let pacijent = req.body.pacijent;
            let datum = req.body.datum;
            let vreme = req.body.vreme;
            let status = req.body.status;
            pregled_1.default.updateOne({ $and: [{ 'pacijent': pacijent }, { 'datum': datum }, { 'vreme': vreme }] }, { $set: { 'status': status } }, (err, o) => {
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
exports.PregledController = PregledController;
//# sourceMappingURL=pregled.controller.js.map