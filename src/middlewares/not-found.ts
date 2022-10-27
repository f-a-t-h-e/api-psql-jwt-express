import { NextFunction, Request, Response } from "express";

const notFound = async (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("<h1>This page is not found</h1>");
};

export default notFound;
