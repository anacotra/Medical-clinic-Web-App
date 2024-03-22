import express from 'express';
import { PregledController } from '../controllers/pregled.controller';

const PregledRouter = express.Router();

PregledRouter.route('/dohvatiPregledeLekara').post(
    (req, res) => new PregledController().dohvatiPregledeLekara(req, res)
)
PregledRouter.route('/dohvatiPregledePacijenta').post(
    (req, res) => new PregledController().dohvatiPregledePacijenta(req, res)
)
PregledRouter.route('/dodajPregled').post(
    (req, res) => new PregledController().dodajPregled(req, res)
)
PregledRouter.route('/otkaziPregled').post(
    (req, res) => new PregledController().otkaziPregled(req, res)
)
PregledRouter.route('/otkaziPregledUzObjasnjenje').post(
    (req, res) => new PregledController().otkaziPregledUzObjasnjenje(req, res)
)
PregledRouter.route('/obrisiPregledePacijenta').post(
    (req, res) => new PregledController().obrisiPregledePacijenta(req, res)
)
PregledRouter.route('/postaviStatus').post(
    (req, res) => new PregledController().postaviStatus(req, res)
)
export default PregledRouter;