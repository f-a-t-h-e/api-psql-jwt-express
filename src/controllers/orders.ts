import { NextFunction, Request, Response } from "express";
import Orders from "../models/Order";

const store = new Orders();

const getAll = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const data = await store.getComplete(req.body.user_id);
    res.status(200).json({ data });
  } catch (err) {
    throw new Error(`Couldn't getAll orders: ${err}`);
  }
};
const getOne = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const data = await store.getOne(req.body.user_id, req.params.id);
    res.status(200).json({ data });
  } catch (err) {
    throw new Error(`Couldn't getOne order: ${err}`);
  }
};
const create = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const data = await store.create(req.body.user_id);
    res.status(201).json({ data });
  } catch (err) {
    throw new Error(`Couldn't create order: ${err}`);
  }
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    req.body.order_id = req.params.id;
    const data = await store.update(req.body);
    res.status(201).json({ data });
  } catch (err) {
    throw new Error(`Couldn't update order: ${err}`);
  }
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const data = await store.delete(req.body.user_id, req.params.id);
    res.status(200).json({ data });
  } catch (err) {
    throw new Error(`Couldn't Delete order: ${err}`);
  }
};

export { getAll, getOne, create, update, Delete };
