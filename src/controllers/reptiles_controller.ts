import { PrismaClient, Reptile } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { controller, getUser } from "../lib/controller";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getSourceMapRange, toEditorSettings } from "typescript";

type reptile = {
    species: string, // one of "ball_python", "king_snake", "corn_snake", "redtail_boa"
    name: string,
    sex: string,
}



const createReptile = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    
    const {species, name, sex} = req.body as reptile;
    const reptile = await client.reptile.create({
        data: {
            userId: user.id,
            species,
            name,
            sex
        }
    });
    res.json({ message: "reptile created", reptile });
}

const getAllReptiles = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const reptiles = await client.reptile.findMany({
        where: {
            userId: user.id
        }
    })
    res.json({ message: "getting all reptiles", reptiles });
  
}

const deleteReptile = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    })
    if (!reptile) {
        res.status(404).json({ message: "No reptile found."})
        return;
    }
    console.log(reptile);
    await client.reptile.delete({
        where: {
            id: parseInt(req.params.reptileid),
        }
    })

    res.json({ message: `delete a reptile ${parseInt(req.params.reptileid)}`, reptile });
  
}

const updateReptile = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    
    const existing_reptlie = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    if (!existing_reptlie) {
        res.status(404).json({ message: "Reptile not found."});
        return;
    }

    const {species, name, sex} = req.body as reptile;

    const reptile = await client.reptile.update({
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
  
}

type feeding = {
    foodItem: string
}

const createFeeding = (client: PrismaClient): RequestHandler => 
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const {foodItem} = req.body as feeding;
    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });

    if (!reptile) {
        res.status(404).json({ message: "Reptile Not Found" });
        return;
    }

    const feeding = await client.feeding.create({
        data: {
            reptileId: reptile.id,
            foodItem
        }
    });
    res.json({ message: "Create a feeding for a reptile", feeding });
    
}

const getFeedings = (client: PrismaClient): RequestHandler => 
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });

    if (!reptile) {
        res.status(404).json({ message: "Reptile not found" });
        return;
    }

    const feedings = await client.feeding.findMany({
        where: {
            reptileId: reptile.id
        }
    });
    res.json({ message: "Got feedings for a reptile", feedings });
    
}

type husbandry = {
    length: number,
    weight: number,
    temperature: number,
    humidity: number,
}

const createHusbandry = (client: PrismaClient): RequestHandler => 
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    
    if (!reptile) {
        res.status(404).json({ message: "Reptile not found" });
        return;
    }
    
    const {length, weight, temperature, humidity} = req.body as husbandry
    const husbandry = await client.husbandryRecord.create({
        data: {
            reptileId: reptile.id,
            length,
            weight,
            temperature,
            humidity
        }
    });
    res.json({ message: "Created a husbandy",  husbandry});
}

const getHusbandries = (client: PrismaClient): RequestHandler => 
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    
    if (!reptile) {
        res.status(404).json({ message: "Reptile not found" });
        return;
    }

    const husbandries = await client.husbandryRecord.findMany({
        where: {
            reptileId: reptile.id
        }
    });
    res.json({ message: "Got list of husbandries", husbandries });
}

type schedule = {
    type: string // "feed", "record", "clean",
    description: string,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
}

const createSchedule = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    
    if (!reptile) {
        res.status(404).json({ message: "Reptile not found" });
        return;
    }

    const {type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body as schedule;

    const schedule = await client.schedule.create({
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
    })

    res.json({ message: "Create a schedule for reptile", schedule});
}

const getSchedules = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
    const user = await getUser(req, client);
    if (!user){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const reptile = await client.reptile.findFirst({
        where: {
            id: parseInt(req.params.reptileid),
            userId: user.id
        }
    });
    
    if (!reptile) {
        res.status(404).json({ message: "Reptile not found" });
        return;
    }

    const schedules = await client.schedule.findMany({
    where: {
        reptileId: reptile.id
    }
})
    res.json({ message: "Get a list of schedules from reptile", schedules });
}

export const reptileController = controller(
    "reptile",
    [
      { path: "/", endpointBuilder: createReptile, method: "post"},
      { path: "/", endpointBuilder: getAllReptiles, method: "get" },
      { path: "/:reptileid", endpointBuilder: deleteReptile, method: "delete"},
      { path: "/:reptileid", endpointBuilder: updateReptile, method: "put"},

      { path: "/:reptileid/feeding", endpointBuilder: createFeeding, method: "post"},
      { path: "/:reptileid/feeding", endpointBuilder: getFeedings, method: "get" },

      { path: "/:reptileid/husbandry", endpointBuilder: createHusbandry, method: "post"},
      { path: "/:reptileid/husbandry", endpointBuilder: getHusbandries, method: "get"},

      { path: "/:reptileid/schedule", endpointBuilder: createSchedule, method: "post"},
      { path: "/:reptileid/schedule", endpointBuilder: getSchedules, method: "get"},
    ]
  )