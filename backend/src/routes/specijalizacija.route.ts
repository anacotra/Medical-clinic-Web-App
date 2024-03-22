import express from 'express';
import { SpecijalizacijaController } from '../controllers/specijalizacija.controller';

const SpecijalizacijaRouter = express.Router();

SpecijalizacijaRouter.route('/dohvatiSpecijalizacije').post(
    (req, res) => new SpecijalizacijaController().dohvatiSpecijalizacije(req, res)
)
SpecijalizacijaRouter.route('/dohvatiSpecijalizaciju').post(
    (req, res) => new SpecijalizacijaController().dohvatiSpecijalizaciju(req, res)
)
SpecijalizacijaRouter.route('/dodaj').post(
    (req, res) => new SpecijalizacijaController().dodaj(req, res)
)
SpecijalizacijaRouter.route('/dodajVrstuPregleda').post(
    (req, res) => new SpecijalizacijaController().dodajVrstuPregleda(req, res)
)
SpecijalizacijaRouter.route('/ukloniVrstuPregleda').post(
    (req, res) => new SpecijalizacijaController().ukloniVrstuPregleda(req, res)
)
SpecijalizacijaRouter.route('/promeniNazivVrste').post(
    (req, res) => new SpecijalizacijaController().promeniNazivVrste(req, res)
)
export default SpecijalizacijaRouter;