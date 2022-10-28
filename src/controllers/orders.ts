// import { NextFunction, Request, Response } from "express";
// import Orders from "../models/Order";

// const store = new Orders();

// const getAll = async (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Promise<void> => {
//   // @ts-ignore
//   const { user } = req;
//   const data = await store.getAll(user.id);
//   res.status(200).json({ data });
// };
// const getOne = async (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Promise<void> => {
//   // @ts-ignore
//   const { user } = req;
//   const data = await store.getOne(req.params.id, user.id);
//   res.status(200).json({ data });
// };
// const create = async (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Promise<void> => {
//   // @ts-ignore
//   const { user } = req;
//   const data = await store.create(req.body, user.id);
//   console.log(data);

//   res.status(201).json({ data });
// };
// const update = async (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Promise<void> => {
//   // @ts-ignore
//   const { user } = req;

//   const data = await store.update(req.params.id, req.body, user.id);
//   res.status(201).json({ data });
// };
// const Delete = async (
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Promise<void> => {
//   // @ts-ignore
//   const { user } = req;
//   const data = await store.delete(req.params.id, user.id);
//   res.status(200).json({ data });
// };

// export { getAll, getOne, create, update, Delete };
