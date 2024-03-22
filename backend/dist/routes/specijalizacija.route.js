"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const specijalizacija_controller_1 = require("../controllers/specijalizacija.controller");
const SpecijalizacijaRouter = express_1.default.Router();
SpecijalizacijaRouter.route('/dohvatiSpecijalizacije').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().dohvatiSpecijalizacije(req, res));
SpecijalizacijaRouter.route('/dohvatiSpecijalizaciju').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().dohvatiSpecijalizaciju(req, res));
SpecijalizacijaRouter.route('/dodaj').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().dodaj(req, res));
SpecijalizacijaRouter.route('/dodajVrstuPregleda').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().dodajVrstuPregleda(req, res));
SpecijalizacijaRouter.route('/ukloniVrstuPregleda').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().ukloniVrstuPregleda(req, res));
SpecijalizacijaRouter.route('/promeniNazivVrste').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().promeniNazivVrste(req, res));
exports.default = SpecijalizacijaRouter;
//# sourceMappingURL=specijalizacija.route.js.map