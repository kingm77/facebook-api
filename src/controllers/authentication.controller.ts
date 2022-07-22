import jwt from 'jsonwebtoken';
import type { UsersInfo } from '../models/users.model';
import * as UserModel from '../models/users.model';
import { HttpException, HttpStatus } from '../errors/HttpException.error';
import { Request, Response, NextFunction} from "express";
import logger from "../utils/logger"

export const login = async (request: Request, response: Response, next: NextFunction) => {
  const {email, password} = request.body.LoginDto
  const userInfo:UsersInfo = {email, password}
  const user = await UserModel.findByCredentials(userInfo);

  if (!user){
    logger.error(`user ${email} fail to connect`)
    return next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  } 

  logger.info(`The user ${email} is connected`)
  const token = jwt.sign(user.id, 'SECRET');
  response.json({
    data: {
      user,
      token
    },
  });
}

export const register = async (request: Request, response: Response) => {
  const { email, password } = request.body.RegisterDto;
  const user = await UserModel.createOne({ email, password });
  
  if(user) logger.info(`The user ${email} is registered`)

  response
  .status(201)
  .json({ user });
  
} 
 
