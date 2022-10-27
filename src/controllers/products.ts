import { NextFunction, Request, Response } from "express";
import Products from "../models/Product";

const store = new Products();

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const data = await store.getAll();
  res.status(200).json({ data });
};
const getOne = async (req: Request, res: Response): Promise<void> => {
  const data = await store.getOne(req.params.id);
  res.status(200).json({ data });
};
const create = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.create(req.body);
  res.status(201).json({ data });
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.update(req.params.id, req.body);
  res.status(200).json({ data });
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const data = await store.delete(req.params.id);
  res.status(200).json({ data });
};

export { getAll, getOne, create, update, Delete };
