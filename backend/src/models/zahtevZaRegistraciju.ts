import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZahtevZaRegistraciju = new Schema({
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
    status: {
        type: String
    },
    slika: {
        type: String
    }
})

export default mongoose.model('ZahtevZaRegistracijuModel', ZahtevZaRegistraciju, 'zahteviZaRegistraciju')
