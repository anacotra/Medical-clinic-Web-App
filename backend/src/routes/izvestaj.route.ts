import express from 'express';
import { IzvestajController } from '../controllers/izvestaj.controller';

const IzvestajRouter = express.Router();

IzvestajRouter.route('/dohvatiIzvestajPacijenta').post(
    (req, res) => new IzvestajController().dohvatiIzvestajPacijenta(req, res)
)
IzvestajRouter.route('/dodajIzvestaj').post(
    (req, res) => new IzvestajController().dodajIzvestaj(req, res)
)
export default IzvestajRouter;