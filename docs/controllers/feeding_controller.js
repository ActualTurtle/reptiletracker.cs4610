"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedingController = void 0;
const controller_1 = require("../lib/controller");
const createFeeding = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Create a feeding for a reptile" });
});
const getFeedings = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Create a feeding for a reptile" });
});
exports.feedingController = (0, controller_1.controller)("reptile/feeding", [
    { path: "/:reptileid", endpointBuilder: getFeedings, method: "get" },
    { path: "/:reptileid", endpointBuilder: createFeeding, method: "post" },
]);
