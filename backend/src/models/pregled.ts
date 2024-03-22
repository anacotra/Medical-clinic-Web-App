import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pregled = new Schema({
    lekar: {
        type: String
    },
    imeLekara: {
        type: String
    },
    prezimeLekara: {
        type: String
    },
    pacijent: {
        type: String
    },
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    },
    cena: {
        type: Number
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    ogranak: {
        type: String
    },
    status: {
        type: String
    },
    objasnjenje: {
        type: String
    }
})

export default mongoose.model('PregledModel', Pregled, 'pregledi')
