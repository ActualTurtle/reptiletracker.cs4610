import { PrismaClient } from "@prisma/client"
import express, { RequestHandler, Express } from "express"
import { RequestWithJWTBody } from "../dto/jwt"
import { authenticationMiddleware } from "../middleware/authentication"

export type Route = {
  path: string,
  method: "post" | "put" | "get" | "delete",
  endpointBuilder: (client: PrismaClient) => RequestHandler,
  skipAuth?: boolean
}

export const controller = (name: string, routes: Route[]) => (app: Express, client: PrismaClient) => {
  const router = express.Router();
  routes.forEach(route => {
    if (!route.skipAuth) {
      router.use(route.path, (req, res, next) => {
        if (req.method.toLowerCase() === route.method) {
          authenticationMiddleware(req, res, next);
        } else {
          next();
        }
      });
    }
    router[route.method](route.path, route.endpointBuilder(client));
  })
  app.use(`/${name}`, router);
}

/**
 * helper function for getting the user before doing anything else. Could go in a middleware, but I couldn't quite figure that out, so this is the next best thing.
 */
export async function getUser(req: RequestWithJWTBody, client: PrismaClient)  {
  const userId = req.jwtBody?.userId;
  console.log("UserId: " + userId);
  if (userId == undefined) {
      return undefined;
  }
  const user = await client.user.findFirst({
      where: {
          id: userId
      }
  });
  console.log(user);
  return user;

}