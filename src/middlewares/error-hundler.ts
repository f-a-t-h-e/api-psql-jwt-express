import { NextFunction, Request, Response } from "express";

const errorHundler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  res
    .status(500)
    .json({
      msg: "Something went wrong",
      err_message: (err as Error).message as string,
    });
};

export default errorHundler;
