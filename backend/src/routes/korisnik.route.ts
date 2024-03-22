import express from 'express';
import multer from 'multer';
import { KorisnikController } from '../controllers/korisnik.controller';

const KorisnikRouter = express.Router();
const upload = multer({dest: 'uploads/'});

KorisnikRouter.route('/login').post(
    (req, res) => new KorisnikController().login(req, res)
)
KorisnikRouter.route('/promeniLozinku').post(
    (req, res) => new KorisnikController().promeniLozinku(req, res)
)
KorisnikRouter.post('/promeniSliku', upload.single('slika'),
    async(req, res) => new KorisnikController().promeniSliku(req, res)
);
KorisnikRouter.route('/promeniKorisnickoIme').post(
    (req, res) => new KorisnikController().promeniKorisnickoIme(req, res)
)
KorisnikRouter.route('/promeniIme').post(
    (req, res) => new KorisnikController().promeniIme(req, res)
)
KorisnikRouter.route('/promeniPrezime').post(
    (req, res) => new KorisnikController().promeniPrezime(req, res)
)
KorisnikRouter.route('/promeniAdresu').post(
    (req, res) => new KorisnikController().promeniAdresu(req, res)
)
KorisnikRouter.route('/promeniTelefon').post(
    (req, res) => new KorisnikController().promeniTelefon(req, res)
)
KorisnikRouter.route('/promeniMejl').post(
    (req, res) => new KorisnikController().promeniMejl(req, res)
)
KorisnikRouter.route('/promeniSpecijalizaciju').post(
    (req, res) => new KorisnikController().promeniSpecijalizaciju(req, res)
)
KorisnikRouter.route('/dohvatiLekare').post(
    (req, res) => new KorisnikController().dohvatiLekare(req, res)
)
KorisnikRouter.route('/dohvatiKorisnikeNeMen').post(
    (req, res) => new KorisnikController().dohvatiKorisnikeNeMen(req, res)
)
KorisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)
KorisnikRouter.route('/dohvatiPoMejlu').post(
    (req, res) => new KorisnikController().dohvatiPoMejlu(req, res)
)
KorisnikRouter.route('/dohvatiPoLicenci').post(
    (req, res) => new KorisnikController().dohvatiPoLicenci(req, res)
)
KorisnikRouter.route('/dodajVrstePregleda').post(
    (req, res) => new KorisnikController().dodajVrstePregleda(req, res)
)
KorisnikRouter.route('/obrisiKorisnika').post(
    (req, res) => new KorisnikController().obrisiKorisnika(req, res)
)
KorisnikRouter.route('/dodajKorisnika').post(
    (req, res) => new KorisnikController().dodajKorisnika(req, res)
)
KorisnikRouter.post('/dodajLekara', upload.single('slika'),
    async(req, res) => new KorisnikController().dodajLekara(req, res)
)
KorisnikRouter.route('/dodajSlobodanDan').post(
    (req, res) => new KorisnikController().dodajSlobodanDan(req, res)
)
KorisnikRouter.route('/dodajGodisnji').post(
    (req, res) => new KorisnikController().dodajGodisnji(req, res)
)
KorisnikRouter.route('/obrisiVrstePregleda').post(
    (req, res) => new KorisnikController().obrisiVrstePregleda(req, res)
)
KorisnikRouter.route('/promeniNazivVrste').post(
    (req, res) => new KorisnikController().promeniNazivVrste(req, res)
)
export default KorisnikRouter;