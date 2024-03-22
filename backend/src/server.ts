import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import KorisnikRouter from './routes/korisnik.route';
import ZahtevZaRegistracijuRouter from './routes/zahtevZaRegistraciju.route';
import PregledRouter from './routes/pregled.route';
import VrstaPregledaRouter from './routes/vrstaPregleda.route';
import SpecijalizacijaRouter from './routes/specijalizacija.route';
import IzvestajRouter from './routes/izvestaj.route';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


mongoose.connect('mongodb://127.0.0.1:27017/ordinacija');
const connection = mongoose.connection
connection.once('open', () => {
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnik', KorisnikRouter)
router.use('/zahtevZaRegistraciju', ZahtevZaRegistracijuRouter)
router.use('/pregled', PregledRouter)
router.use('/vrstaPregleda', VrstaPregledaRouter)
router.use('/specijalizacija', SpecijalizacijaRouter)
router.use('/izvestaj', IzvestajRouter)
app.use('/', router)

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
