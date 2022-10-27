import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users, { User } from "../models/User";

const store = new Users();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Access invaliddd.");
  }
  const token = authHeader.split(" ")[1] as string;

  const U = jwt.verify(token, process.env.JWT_SECRET as string) as User;

  const user = await store.auth(U);

  if (user === "invalid") {
    throw new Error("Access invalid.");
  }
  // @ts-ignore
  req.user = user;

  next();
};

export default auth;
