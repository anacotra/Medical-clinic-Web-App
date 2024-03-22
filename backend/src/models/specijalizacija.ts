import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Specijalizacija = new Schema({
    naziv: {
        type: String
    },
    vrstePregleda: {
        type: Array
    }
})

export default mongoose.model('SpecijalizacijaModel', Specijalizacija, 'specijalizacije')
