import express from 'express';
import multer from 'multer';
import { ZahtevZaRegistracijuController } from '../controllers/zahtevZaRegistaciju.controller';

const ZahtevZaRegistracijuRouter = express.Router();

const upload = multer({dest: 'uploads/'});

ZahtevZaRegistracijuRouter.post('/dodajZahtev', upload.single('slika'),
    async(req, res) => new ZahtevZaRegistracijuController().dodajZahtev(req, res)
)
ZahtevZaRegistracijuRouter.route('/dohvatiZahteve').post(
    (req, res) => new ZahtevZaRegistracijuController().dohvatiZahteve(req, res)
)
ZahtevZaRegistracijuRouter.route('/dohvatiZahteveUObradi').post(
    (req, res) => new ZahtevZaRegistracijuController().dohvatiZahteveUObradi(req, res)
)
ZahtevZaRegistracijuRouter.route('/dohvatiPoMejlu').post(
    (req, res) => new ZahtevZaRegistracijuController().dohvatiPoMejlu(req, res)
)
ZahtevZaRegistracijuRouter.route('/obrisiZahtev').post(
    (req, res) => new ZahtevZaRegistracijuController().obrisiZahtev(req, res)
)
ZahtevZaRegistracijuRouter.route('/postaviStatus').post(
    (req, res) => new ZahtevZaRegistracijuController().postaviStatus(req, res)
)
ZahtevZaRegistracijuRouter.route('/dohvatiZahtev').post(
    (req, res) => new ZahtevZaRegistracijuController().dohvatiZahtev(req, res)
)
export default ZahtevZaRegistracijuRouter;
