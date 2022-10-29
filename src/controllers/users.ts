import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import Users from "../models/User";
import jwt from "jsonwebtoken";

const store = new Users();

const getAll = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.getAll();

  res.status(200).json({ data });
};
const getOne = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.getOne(req.params.id);
  res.status(200).json({ data });
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  // @ts-ignore
  const { user } = req;

  const data = await store.update(user.user_id, req.body);
  const token = jwt.sign(data, process.env.JWT_SECRET as string);

  res.status(201).json({ data, token });
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  // @ts-ignore
  const { user } = req;
  const data = await store.delete(user.user_id);
  res.status(200).json({ data });
};

const register = async (req: Request, res: Response): Promise<void> => {
  const user = await store.create(req.body);
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  res.status(201).json({ user, token });
};
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await store.login(email, password);
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  res.status(200).json({ user, token });
};

export { getAll, getOne, register, update, Delete, login };
