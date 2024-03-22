"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vrstaPregleda_controller_1 = require("../controllers/vrstaPregleda.controller");
const VrstaPregledaRouter = express_1.default.Router();
VrstaPregledaRouter.route('/dohvatiVrstePregleda').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().dohvatiVrstePregleda(req, res));
VrstaPregledaRouter.route('/dohvatiPoStatusuVrstePregleda').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().dohvatiPoStatusuVrstePregleda(req, res));
VrstaPregledaRouter.route('/dohvatiPoNazivuVrstuPregleda').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().dohvatiPoNazivuVrstuPregleda(req, res));
VrstaPregledaRouter.route('/dodaj').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().dodaj(req, res));
VrstaPregledaRouter.route('/promeniStatus').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().promeniStatus(req, res));
VrstaPregledaRouter.route('/promeniNaziv').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().promeniNaziv(req, res));
VrstaPregledaRouter.route('/promeniSpecijalizaciju').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().promeniSpecijalizaciju(req, res));
VrstaPregledaRouter.route('/promeniCenu').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().promeniCenu(req, res));
VrstaPregledaRouter.route('/promeniTrajanje').post((req, res) => new vrstaPregleda_controller_1.VrstaPregledaController().promeniTrajanje(req, res));
exports.default = VrstaPregledaRouter;
//# sourceMappingURL=vrstaPregleda.route.js.map