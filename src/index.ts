import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const client = new PrismaClient();
const app: Express = express();
const port = process.env.PORT;

// TODO: This is a test POST request, needs changing
app.post('/users', async (req, res) => {
  const user = await client.user.create({
    data: {
      firstName: "Test",
      lastName: "User",
      email: "testuser@email.com",
      passwordHash: "password",
    }
  });
  res.json({ user });
})

app.get('/', (req: Request, res: Response) => {
  res.send('BUILD REPTILE TRACKER HERE');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
