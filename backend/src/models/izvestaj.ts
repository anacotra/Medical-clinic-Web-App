import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
    pacijent: {
        type: String
    },
    lekarKorIme: {
        type: String
    },
    lekarIme: {
        type: String
    },
    lekarPrezime: {
        type: String
    },
    lekarSpecijalizacija: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    razlogDolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    preporucenaTerapija: {
        type: String
    },
    preporucenDatumKontrole: {
        type: String
    }
})

export default mongoose.model('IzvestajModel', Izvestaj, 'izvestaji')
