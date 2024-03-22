"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_route_1 = __importDefault(require("./routes/korisnik.route"));
const zahtevZaRegistraciju_route_1 = __importDefault(require("./routes/zahtevZaRegistraciju.route"));
const pregled_route_1 = __importDefault(require("./routes/pregled.route"));
const vrstaPregleda_route_1 = __importDefault(require("./routes/vrstaPregleda.route"));
const specijalizacija_route_1 = __importDefault(require("./routes/specijalizacija.route"));
const izvestaj_route_1 = __importDefault(require("./routes/izvestaj.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ordinacija');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/korisnik', korisnik_route_1.default);
router.use('/zahtevZaRegistraciju', zahtevZaRegistraciju_route_1.default);
router.use('/pregled', pregled_route_1.default);
router.use('/vrstaPregleda', vrstaPregleda_route_1.default);
router.use('/specijalizacija', specijalizacija_route_1.default);
router.use('/izvestaj', izvestaj_route_1.default);
app.use('/', router);
// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map