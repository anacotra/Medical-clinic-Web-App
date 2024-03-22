"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecijalizacijaController = void 0;
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
class SpecijalizacijaController {
    constructor() {
        this.dohvatiSpecijalizacije = (req, res) => {
            specijalizacija_1.default.find({}, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.dohvatiSpecijalizaciju = (req, res) => {
            let naziv = req.body.naziv;
            specijalizacija_1.default.findOne({ 'naziv': naziv }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.dodaj = (req, res) => {
            let nova = new specijalizacija_1.default({
                naziv: req.body.naziv
            });
            nova.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Greska' });
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dodajVrstuPregleda = (req, res) => {
            let naziv = req.body.naziv;
            let vrsta = req.body.vrsta;
            specijalizacija_1.default.updateOne({ 'naziv': naziv }, { $push: { 'vrstePregleda': vrsta } }, (err, m) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.ukloniVrstuPregleda = (req, res) => {
            let naziv = req.body.naziv;
            let vrsta = req.body.vrsta;
            specijalizacija_1.default.updateOne({ 'naziv': naziv }, { $pull: { 'vrstePregleda': vrsta } }, (err, m) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.promeniNazivVrste = (req, res) => {
            let naziv = req.body.naziv;
            let vrsta = req.body.vrsta;
            let novo = req.body.novo;
            specijalizacija_1.default.updateOne({ 'naziv': naziv }, { $pull: { 'vrstePregleda': vrsta } }, (err, m) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'error' });
                }
                else {
                    specijalizacija_1.default.updateOne({ 'naziv': naziv }, { $push: { 'vrstePregleda': novo } }, (err, p) => {
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
        };
    }
}
exports.SpecijalizacijaController = SpecijalizacijaController;
//# sourceMappingURL=specijalizacija.controller.js.map