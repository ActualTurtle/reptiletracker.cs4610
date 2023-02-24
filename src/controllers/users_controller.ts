import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller, getUser } from "../lib/controller";

const getMe = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithJWTBody, res) => {
    console.log("getMe Called");
    const userId = req.jwtBody?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await client.user.findFirst({
      where: {
        id: userId
      }
    });

    res.json({ user });
  }

type CreateUserBody = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const createUser = (client: PrismaClient): RequestHandler =>
async (req, res) => {
  const {firstName, lastName, email, password} = req.body as CreateUserBody;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
    },
  });
  const token = jwt.sign({
    userId: user.id
  }, process.env.ENCRYPTION_KEY!!, {
    expiresIn: '10m'
  });
  res.json({ user, token });
}

const getSchedules = (client: PrismaClient): RequestHandler =>
async (req: RequestWithJWTBody, res) => {
  console.log("getSchedules called");
  const user = await getUser(req, client);
  if (!user){
      res.status(401).json({ message: "Unauthorized" });
      return;
  }

  const schedules = await client.schedule.findMany({
    where: {
      userId: user.id
    }
  })
  res.json({ data: "Got schedules for user", schedules });

}

export const usersController = controller(
  "users",
  [
    { path: "/", endpointBuilder: createUser, method: "post", skipAuth: true},
    { path: "/me", endpointBuilder: getMe, method: "get" },
    { path: "/schedule", endpointBuilder: getSchedules, method: "get" }, 
  ]
)