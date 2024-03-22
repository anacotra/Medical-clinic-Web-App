"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('PregledModel', Pregled, 'pregledi');
//# sourceMappingURL=pregled.js.map