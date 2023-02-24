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
/**
 * helper function for getting the user before doing anything else. Could go in a middleware, but I couldn't quite figure that out, so this is the next best thing.
 */
function getUser(req, client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (_a = req.jwtBody) === null || _a === void 0 ? void 0 : _a.userId;
        console.log(userId);
        if (userId == undefined) {
            return undefined;
        }
        const user = yield client.user.findFirst({
            where: {
                id: userId
            }
        });
        console.log(user);
        return user;
    });
}
const createReptile = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req, client);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { species, name, sex } = req.body;
    const reptile = yield client.reptile.create({
        data: {
            userId: user.id,
            species,
            name,
            sex
        }
    });
    res.json({ message: "reptile created", reptile });
});
const getAllReptiles = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req, client);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const reptiles = yield client.reptile.findMany({
        where: {
            userId: user.id
        }
    });
    res.json({ message: "getting all reptiles", reptiles });
});
const deleteReptile = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req, client);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    if (!reptile) {
        res.status(404).json({ message: "No reptile found." });
        return;
    }
    console.log(reptile);
    yield client.reptile.delete({
        where: {
            id: parseInt(req.params.reptileid),
        }
    });
    res.json({ message: `delete a reptile ${parseInt(req.params.reptileid)}`, reptile });
});
const updateReptile = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req, client);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const existing_reptlie = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    if (!existing_reptlie) {
        res.status(404).json({ message: "Reptile not found." });
        return;
    }
    const { species, name, sex } = req.body;
    const reptile = yield client.reptile.update({
        where: {
            id: parseInt(req.params.reptileid),
        },
        data: {
            species,
            name,
            sex
        }
    });
    res.json({ message: "Updated a reptile", reptile });
});
const createFeeding = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req, client);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { foodItem } = req.body;
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    if (!reptile) {
        res.status(404).json({ message: "Reptile Not Found" });
        return;
    }
    const feeding = yield client.feeding.create({
        data: {
            reptileId: reptile.id,
            foodItem
        }
    });
    res.json({ message: "Create a feeding for a reptile", feeding });
});
const getFeedings = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(req, client);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    if (!reptile) {
        res.status(404).json({ message: "Reptile not found" });
        return;
    }
    const feedings = yield client.feeding.findMany({
        where: {
            reptileId: reptile.id
        }
    });
    res.json({ message: "Got feedings for a reptile", feedings });
});
const createHusbandry = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { length, weight, temperature, humidity } = req.body;
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid)
        }
    });
    if (!reptile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const husbnadry = yield client.husbandryRecord.create({
        data: {
            reptileId: reptile.id,
            length,
            weight,
            temperature,
            humidity
        }
    });
    res.json({ message: "create a husbandy", husbnadry });
});
const getHusbandries = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid)
        }
    });
    if (!reptile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const husbandries = yield client.husbandryRecord.findMany({
        where: {
            reptileId: reptile.id
        }
    });
    res.json({ message: "get list of husbandries", husbandries });
});
const createSchedule = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid)
        }
    });
    const userId = (_a = req.jwtBody) === null || _a === void 0 ? void 0 : _a.userId;
    const user = yield client.user.findFirst({
        where: {
            id: userId
        }
    });
    if (!reptile || !user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const schedule = yield client.schedule.create({
        data: {
            userId: user.id,
            reptileId: reptile.id,
            type,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        }
    });
    res.json({ message: "Create a schedule for reptile", schedule });
});
const getSchedules = (client) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reptile = yield client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid)
        }
    });
    if (!reptile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const schedules = yield client.schedule.findMany({
        where: {
            reptileId: reptile.id
        }
    });
    res.json({ message: "Get a list of schedules from reptile", schedules });
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
