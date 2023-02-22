import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { controller } from "../lib/controller";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createReptile = (client: PrismaClient): RequestHandler =>
async (req, res) => {
  
  res.json({ data: "Create a reptile" });
}
const getAllReptiles = (client: PrismaClient): RequestHandler =>
async (req, res) => {
    res.json({ data: "Get a list of reptiles" });
  
}
const deleteReptile = (client: PrismaClient): RequestHandler =>
async (req, res) => {
    res.json({ data: "Delete a reptile" });
  
}
const updateReptile = (client: PrismaClient): RequestHandler =>
async (req, res) => {
    res.json({ data: "Update a reptile" });
  
}


const createFeeding = (client: PrismaClient): RequestHandler => 
async (req, res) => {
    res.json({ data: "Create a feeding for a reptile" });
    
}

const getFeedings = (client: PrismaClient): RequestHandler => 
async (req, res) => {
    res.json({ data: "get feedings for a reptile" });
    
}

const createHusbandry = (client: PrismaClient): RequestHandler => 
async (req, res) => {
    res.json({ data: "create a husbandy" });
    
}

const getHusbandries = (client: PrismaClient): RequestHandler => 
async (req, res) => {
    res.json({ data: "get list of husbandries" });
    
}

const createSchedule = (client: PrismaClient): RequestHandler =>
async (req, res) => {
    res.json({ data: "Create a schedule for reptile" });
  
}

const getSchedules = (client: PrismaClient): RequestHandler =>
async (req, res) => {
    res.json({ data: "Get a list of schedules" });
  
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