import { NextFunction, Request, Response } from "express";
import Products, { Product } from "../models/Product";

const store = new Products();

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const data = await store.getAll();
  res.status(200).json({ data });
};
const getTop = async (req: Request, res: Response): Promise<void> => {
  const data = await store.getTop(parseInt(req.params.num));
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
  // @ts-ignore
  const user_id = req.user.user_id;
  const { name, price, catagory } = req.body;
  if (!name || !price || !catagory) {
    throw new Error("Please provide name, price and catagory.");
  }
  const data = await store.create({
    user_id,
    name,
    price,
    catagory,
  });
  res.status(201).json({ data });
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  // @ts-ignore
  const user_id = req.user.user_id;
  const { price, name, catagory } = req.body;
  const product_id = req.params.id;
  if (!name || !price || !catagory) {
    throw new Error("Please provide name, price and catagory .");
  }
  const data = await store.update({
    product_id,
    user_id,
    name,
    price,
    catagory,
  });
  res.status(200).json({ data });
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  // @ts-ignore
  const user_id = req.user.user_id;
  const data = await store.delete(user_id, req.params.id);
  res.status(200).json({ data });
};

export { getAll, getOne, create, update, Delete, getTop };
