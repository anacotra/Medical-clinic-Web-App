"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('IzvestajModel', Izvestaj, 'izvestaji');
//# sourceMappingURL=izvestaj.js.map