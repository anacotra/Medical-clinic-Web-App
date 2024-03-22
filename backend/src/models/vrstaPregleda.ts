import mongoose from "mongoose";

const Schema = mongoose.Schema;

let VrstaPregleda = new Schema({
    naziv: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranak: {
        type: String
    },
    cena: {
        type: Number
    },
    trajanje: {
        type: Number
    }, 
    status: {
        type: String
    }
})

export default mongoose.model('VrstaPregledaModel', VrstaPregleda, 'vrstePregleda')
