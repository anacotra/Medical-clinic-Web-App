"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzvestajController = void 0;
const izvestaj_1 = __importDefault(require("../models/izvestaj"));
class IzvestajController {
    constructor() {
        this.dohvatiIzvestajPacijenta = (req, res) => {
            let pacijent = req.body.pacijent;
            izvestaj_1.default.find({ 'pacijent': pacijent }, (err, izv) => {
                if (err)
                    console.log(err);
                else
                    res.json(izv);
            });
        };
        this.dodajIzvestaj = (req, res) => {
            let nova = new izvestaj_1.default({
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
    }
}
exports.IzvestajController = IzvestajController;
//# sourceMappingURL=izvestaj.controller.js.map