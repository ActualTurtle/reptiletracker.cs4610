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
exports.reptileController = void 0;
const controller_1 = require("../lib/controller");
const createReptile = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Create a reptile" });
});
const getAllReptiles = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Get a list of reptiles" });
});
const deleteReptile = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Delete a reptile" });
});
const updateReptile = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Update a reptile" });
});
const createFeeding = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Create a feeding for a reptile" });
});
const getFeedings = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "get feedings for a reptile" });
});
const createHusbandry = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "create a husbandy" });
});
const getHusbandries = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "get list of husbandries" });
});
const createSchedule = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Create a schedule for reptile" });
});
const getSchedules = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: "Get a list of schedules" });
});
exports.reptileController = (0, controller_1.controller)("reptile", [
    { path: "/", endpointBuilder: createReptile, method: "post" },
    { path: "/", endpointBuilder: getAllReptiles, method: "get" },
    { path: "/:reptileid", endpointBuilder: deleteReptile, method: "delete" },
    { path: "/:reptileid", endpointBuilder: updateReptile, method: "put" },
    { path: "/:reptileid/feeding", endpointBuilder: createFeeding, method: "post" },
    { path: "/:reptileid/feeding", endpointBuilder: getFeedings, method: "get" },
    { path: "/:reptileid/husbandry", endpointBuilder: createHusbandry, method: "post" },
    { path: "/:reptileid/husbandry", endpointBuilder: getHusbandries, method: "get" },
    { path: "/:reptileid/schedule", endpointBuilder: createSchedule, method: "post" },
    { path: "/:reptileid/schedule", endpointBuilder: getSchedules, method: "get" },
]);
