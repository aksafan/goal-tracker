import { NextFunction, Request, Response } from "express";

export type ControllerHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;

export type Controller = {
  [key: string]: ControllerHandler;
};
