import { NextFunction, Request, Response } from "express";
import Orders from "../models/Order";

const store = new Orders();

const getAll = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.getComplete(req.body.user_id);
  res.status(200).json({ data });
};
const getOne = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.getOne(req.body.user_id, req.params.id);
  res.status(200).json({ data });
};
const create = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.create(req.body.user_id);
  res.status(201).json({ data });
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  req.body.order_id = req.params.id;
  const data = await store.update(req.body);
  res.status(201).json({ data });
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.delete(req.body.user_id, req.params.id);
  res.status(200).json({ data });
};

export { getAll, getOne, create, update, Delete };
