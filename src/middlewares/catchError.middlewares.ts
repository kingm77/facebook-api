import { HttpException } from "../errors/HttpException.error";
import { Request, Response, NextFunction} from "express";


export const catchError = () => ({ statusCode = 500, message}: HttpException, _request: Request, response: Response, _next: NextFunction) =>
  response
    .status(statusCode)
    .json({ error: { message } });