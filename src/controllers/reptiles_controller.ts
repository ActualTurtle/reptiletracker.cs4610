import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";


const createReptile = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    // const {firstName, lastName, email, password} = req.body as CreateUserBody;
    // const passwordHash = await bcrypt.hash(password, 10);
    // const user = await client.user.create({
    //   data: {
    //     firstName,
    //     lastName,
    //     email,
    //     passwordHash,
    //   },
    // });

    // const token = jwt.sign({
    //   userId: user.id
    // }, process.env.ENCRYPTION_KEY!!, {
    //   expiresIn: '1m'
    // });

    // res.json({ user, token });
  }


  const getAllReptiles = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    
  }

  const deleteReptile = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    
  }

  const updateReptile = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    
  }

export const usersController = controller(
    "reptiles",
    [
      { path: "/", endpointBuilder: createReptile, method: "post"},
      { path: "/all", endpointBuilder: getAllReptiles, method: "get" },
      { path: "/:reptileid", endpointBuilder: deleteReptile, method: "delete"},
      { path: "/:reptileid", endpointBuilder: updateReptile, method: "put"},
    ]
  )