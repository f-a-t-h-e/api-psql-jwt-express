import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import Users from "../models/User";
import Orders from "../models/Order";
import jwt from "jsonwebtoken";

const store = new Users();
const orderStore = new Orders();

const getAll = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const users = await store.getAll();

  res.status(200).json({ data: { users } });
}catch(err){
throw new Error(`Couldn't getAll users: ${err}`);
}
};
const getOne = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const orders = await orderStore.getComplete(req.params.id);
  const user = await store.getOne(req.params.id);
  res.status(200).json({ data: { user, orders: orders.slice(0, 5) } });
}catch(err){
throw new Error(`Couldn't getOne user: ${err}`);
}
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const user = await store.update(req.body.user_id, req.body);
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  res.status(201).json({ data: { user }, token });
}catch(err){
throw new Error(`Couldn't update user: ${err}`);
}
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const data = await store.delete(req.body.user_id);
  res.status(200).json({ data });
}catch(err){
throw new Error(`Couldn't Delete user: ${err}`);
}
};

const register = async (req: Request, res: Response): Promise<void> => {
try{
  const user = await store.create(req.body);
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  res.status(201).json({ user, token });
}catch(err){
throw new Error(`Couldn't register a new user: ${err}`);
}
};
const login = async (req: Request, res: Response): Promise<void> => {
try{
  const { email, password } = req.body;
  const user = await store.login(email, password);
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  res.status(200).json({ user, token });
}catch(err){
throw new Error(`Couldn't login user: ${err}`);
}
};

export { getAll, getOne, register, update, Delete, login };
