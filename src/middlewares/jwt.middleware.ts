import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '../errors/HttpException.error';
import { Request, Response, NextFunction} from "express";
import * as UserModel from '../models/users.model';

export const jwtMiddleware = (secret: string) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    const token = request.headers.authorization
    if (token){
        try {
            const id = jwt.verify(token, secret).toString();
            const user = await UserModel.findOneById(id);

            if (!user) return next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
            
            request.body.user = user
            next();
          } catch(error) {
            next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
          }
    }
    else next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  }