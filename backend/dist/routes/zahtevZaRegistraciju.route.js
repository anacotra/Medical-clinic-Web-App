"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const zahtevZaRegistaciju_controller_1 = require("../controllers/zahtevZaRegistaciju.controller");
const ZahtevZaRegistracijuRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
ZahtevZaRegistracijuRouter.post('/dodajZahtev', upload.single('slika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().dodajZahtev(req, res); }));
ZahtevZaRegistracijuRouter.route('/dohvatiZahteve').post((req, res) => new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().dohvatiZahteve(req, res));
ZahtevZaRegistracijuRouter.route('/dohvatiZahteveUObradi').post((req, res) => new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().dohvatiZahteveUObradi(req, res));
ZahtevZaRegistracijuRouter.route('/dohvatiPoMejlu').post((req, res) => new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().dohvatiPoMejlu(req, res));
ZahtevZaRegistracijuRouter.route('/obrisiZahtev').post((req, res) => new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().obrisiZahtev(req, res));
ZahtevZaRegistracijuRouter.route('/postaviStatus').post((req, res) => new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().postaviStatus(req, res));
ZahtevZaRegistracijuRouter.route('/dohvatiZahtev').post((req, res) => new zahtevZaRegistaciju_controller_1.ZahtevZaRegistracijuController().dohvatiZahtev(req, res));
exports.default = ZahtevZaRegistracijuRouter;
//# sourceMappingURL=zahtevZaRegistraciju.route.js.map