"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Specijalizacija = new Schema({
    naziv: {
        type: String
    },
    vrstePregleda: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('SpecijalizacijaModel', Specijalizacija, 'specijalizacije');
//# sourceMappingURL=specijalizacija.js.map