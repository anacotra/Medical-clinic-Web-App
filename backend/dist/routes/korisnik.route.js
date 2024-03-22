"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const KorisnikRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
KorisnikRouter.route('/login').post((req, res) => new korisnik_controller_1.KorisnikController().login(req, res));
KorisnikRouter.route('/promeniLozinku').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
KorisnikRouter.post('/promeniSliku', upload.single('slika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new korisnik_controller_1.KorisnikController().promeniSliku(req, res); }));
KorisnikRouter.route('/promeniKorisnickoIme').post((req, res) => new korisnik_controller_1.KorisnikController().promeniKorisnickoIme(req, res));
KorisnikRouter.route('/promeniIme').post((req, res) => new korisnik_controller_1.KorisnikController().promeniIme(req, res));
KorisnikRouter.route('/promeniPrezime').post((req, res) => new korisnik_controller_1.KorisnikController().promeniPrezime(req, res));
KorisnikRouter.route('/promeniAdresu').post((req, res) => new korisnik_controller_1.KorisnikController().promeniAdresu(req, res));
KorisnikRouter.route('/promeniTelefon').post((req, res) => new korisnik_controller_1.KorisnikController().promeniTelefon(req, res));
KorisnikRouter.route('/promeniMejl').post((req, res) => new korisnik_controller_1.KorisnikController().promeniMejl(req, res));
KorisnikRouter.route('/promeniSpecijalizaciju').post((req, res) => new korisnik_controller_1.KorisnikController().promeniSpecijalizaciju(req, res));
KorisnikRouter.route('/dohvatiLekare').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiLekare(req, res));
KorisnikRouter.route('/dohvatiKorisnikeNeMen').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnikeNeMen(req, res));
KorisnikRouter.route('/dohvatiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnika(req, res));
KorisnikRouter.route('/dohvatiPoMejlu').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiPoMejlu(req, res));
KorisnikRouter.route('/dohvatiPoLicenci').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiPoLicenci(req, res));
KorisnikRouter.route('/dodajVrstePregleda').post((req, res) => new korisnik_controller_1.KorisnikController().dodajVrstePregleda(req, res));
KorisnikRouter.route('/obrisiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().obrisiKorisnika(req, res));
KorisnikRouter.route('/dodajKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().dodajKorisnika(req, res));
KorisnikRouter.post('/dodajLekara', upload.single('slika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new korisnik_controller_1.KorisnikController().dodajLekara(req, res); }));
KorisnikRouter.route('/dodajSlobodanDan').post((req, res) => new korisnik_controller_1.KorisnikController().dodajSlobodanDan(req, res));
KorisnikRouter.route('/dodajGodisnji').post((req, res) => new korisnik_controller_1.KorisnikController().dodajGodisnji(req, res));
KorisnikRouter.route('/obrisiVrstePregleda').post((req, res) => new korisnik_controller_1.KorisnikController().obrisiVrstePregleda(req, res));
KorisnikRouter.route('/promeniNazivVrste').post((req, res) => new korisnik_controller_1.KorisnikController().promeniNazivVrste(req, res));
exports.default = KorisnikRouter;
//# sourceMappingURL=korisnik.route.js.map