"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pregled_controller_1 = require("../controllers/pregled.controller");
const PregledRouter = express_1.default.Router();
PregledRouter.route('/dohvatiPregledeLekara').post((req, res) => new pregled_controller_1.PregledController().dohvatiPregledeLekara(req, res));
PregledRouter.route('/dohvatiPregledePacijenta').post((req, res) => new pregled_controller_1.PregledController().dohvatiPregledePacijenta(req, res));
PregledRouter.route('/dodajPregled').post((req, res) => new pregled_controller_1.PregledController().dodajPregled(req, res));
PregledRouter.route('/otkaziPregled').post((req, res) => new pregled_controller_1.PregledController().otkaziPregled(req, res));
PregledRouter.route('/otkaziPregledUzObjasnjenje').post((req, res) => new pregled_controller_1.PregledController().otkaziPregledUzObjasnjenje(req, res));
PregledRouter.route('/obrisiPregledePacijenta').post((req, res) => new pregled_controller_1.PregledController().obrisiPregledePacijenta(req, res));
PregledRouter.route('/postaviStatus').post((req, res) => new pregled_controller_1.PregledController().postaviStatus(req, res));
exports.default = PregledRouter;
//# sourceMappingURL=pregled.route.js.map