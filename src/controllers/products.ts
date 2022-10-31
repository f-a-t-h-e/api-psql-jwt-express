import { NextFunction, Request, Response } from "express";
import Products from "../models/Product";

const store = new Products();

const getAll = async (_req: Request, res: Response): Promise<void> => {
try{
  const data = await store.getAll();
  res.status(200).json({ data });
}catch(err){
  throw new Error(`Couldn't getAll products: ${err}`);
}
};
const getByCat = async (req: Request, res: Response): Promise<void> => {
try{
  const data = await store.getByCat(req.params.cat);
  res.status(200).json({ data });
}catch(err){
  throw new Error(`Couldn't getByCat products: ${err}`);
}
};
const getTop = async (req: Request, res: Response): Promise<void> => {
try{
  const data = await store.getTop(parseInt(req.params.num));
  res.status(200).json({ data });
}catch(err){
  throw new Error(`Couldn't getTop products: ${err}`);
}
};
const getOne = async (req: Request, res: Response): Promise<void> => {
try{
  const data = await store.getOne(req.params.id);
  res.status(200).json({ data });
}catch(err){
  throw new Error(`Couldn't getOne product: ${err}`);
}
};
const create = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const { name, price, catagory, user_id } = req.body;
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
}catch(err){
  throw new Error(`Couldn't create product: ${err}`);
}
};
const update = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const { price, name, catagory, user_id } = req.body;
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
}catch(err){
  throw new Error(`Couldn't update product: ${err}`);
}
};
const Delete = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
try{
  const data = await store.delete(req.body.user_id, req.params.id);
  res.status(200).json({ data });
}catch(err){
  throw new Error(`Couldn't Delete product: ${err}`);
}
};

export { getAll, getOne, create, update, Delete, getTop, getByCat };
