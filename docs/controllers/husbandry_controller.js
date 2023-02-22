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
exports.husbandryController = void 0;
const controller_1 = require("../lib/controller");
const createHusbandry = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "You reached /reptile/husbandry" });
});
const getHusbandries = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "You reached /reptile/husbandry" });
});
exports.husbandryController = (0, controller_1.controller)("reptile/husbandry", [
    { path: "/", endpointBuilder: createHusbandry, method: "post" },
    { path: "/", endpointBuilder: getHusbandries, method: "get" },
    //   { path: "/all", endpointBuilder: getAllReptiles, method: "get" },
    //   { path: "/:reptileid", endpointBuilder: deleteReptile, method: "delete"},
    //   { path: "/:reptileid", endpointBuilder: updateReptile, method: "put"},
]);
