import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    tip: {
        type: String
    },
    brojLekLic: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranak: {
        type: String
    },
    vrstePregleda: {
        type: Array<String>
    },
    slika: {
        type: String
    },
    slobodniDani: {
        type: Array<String>
    },
    godisnji: {
        type: Array<String>
    }
})

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici')
