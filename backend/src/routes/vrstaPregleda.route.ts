import express from 'express';
import { VrstaPregledaController } from '../controllers/vrstaPregleda.controller';

const VrstaPregledaRouter = express.Router();

VrstaPregledaRouter.route('/dohvatiVrstePregleda').post(
    (req, res) => new VrstaPregledaController().dohvatiVrstePregleda(req, res)
)
VrstaPregledaRouter.route('/dohvatiPoStatusuVrstePregleda').post(
    (req, res) => new VrstaPregledaController().dohvatiPoStatusuVrstePregleda(req, res)
)
VrstaPregledaRouter.route('/dohvatiPoNazivuVrstuPregleda').post(
    (req, res) => new VrstaPregledaController().dohvatiPoNazivuVrstuPregleda(req, res)
)
VrstaPregledaRouter.route('/dodaj').post(
    (req, res) => new VrstaPregledaController().dodaj(req, res)
)
VrstaPregledaRouter.route('/promeniStatus').post(
    (req, res) => new VrstaPregledaController().promeniStatus(req, res)
)
VrstaPregledaRouter.route('/promeniNaziv').post(
    (req, res) => new VrstaPregledaController().promeniNaziv(req, res)
)
VrstaPregledaRouter.route('/promeniSpecijalizaciju').post(
    (req, res) => new VrstaPregledaController().promeniSpecijalizaciju(req, res)
)
VrstaPregledaRouter.route('/promeniCenu').post(
    (req, res) => new VrstaPregledaController().promeniCenu(req, res)
)
VrstaPregledaRouter.route('/promeniTrajanje').post(
    (req, res) => new VrstaPregledaController().promeniTrajanje(req, res)
)

export default VrstaPregledaRouter;