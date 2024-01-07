import { NextFunction } from "express";

export const handleNotFound = (
  error: any,
  message: string,
  code: number,
  next: NextFunction
) => {
  error.message = message;
  error.code = code;
  next(error);
};
