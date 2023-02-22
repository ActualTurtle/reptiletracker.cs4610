import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient, User, Reptile, Feeding, Schedule } from '@prisma/client';
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { JWTBody, RequestWithJWTBody } from "./dto/jwt";
import { usersController } from "./controllers/users_controller";
import { reptileController } from './controllers/reptiles_controller';
import { controller } from './lib/controller';

dotenv.config();

const client = new PrismaClient();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

type LoginBody = {
  email: string,
  password: string
}

// log in
app.post("/login",  async (req, res) => {
  const {email, password} = req.body as LoginBody;
  const user = await client.user.findFirst({
    where: {
      email,
    }
  });
  if (!user) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({
    userId: user.id
  }, process.env.ENCRYPTION_KEY!!, {
    expiresIn: '10m'
  });
  res.json({
    user,
    token
  })
});

usersController(app, client); // "/user/"
reptileController(app, client); // "/reptile/"

app.get('/', (req: Request, res: Response) => {
  res.send('BUILD REPTILE TRACKER HERE');
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;