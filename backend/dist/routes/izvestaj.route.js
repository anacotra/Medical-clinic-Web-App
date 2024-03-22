"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const izvestaj_controller_1 = require("../controllers/izvestaj.controller");
const IzvestajRouter = express_1.default.Router();
IzvestajRouter.route('/dohvatiIzvestajPacijenta').post((req, res) => new izvestaj_controller_1.IzvestajController().dohvatiIzvestajPacijenta(req, res));
IzvestajRouter.route('/dodajIzvestaj').post((req, res) => new izvestaj_controller_1.IzvestajController().dodajIzvestaj(req, res));
exports.default = IzvestajRouter;
//# sourceMappingURL=izvestaj.route.js.map