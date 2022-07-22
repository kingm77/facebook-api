import * as PostsModel from '../models/posts.model'
import * as PostsController from '../controllers/posts.controller'
import * as UsersModel from '../models/users.model'
import * as ProfileModel from '../models/profile.model'
import { HttpException, HttpStatus } from '../errors/HttpException.error';
import { Request, Response, NextFunction} from "express";

export const getPosts = async (request: Request, response: Response, next: NextFunction) => {
  PostsController.paginateKeyset(request, response);
}

export const getProfile = async ({ body:{ user} }: Request, response: Response) => {
    const profile = await ProfileModel.findByUser(user.id)
    if(profile)
        response
            .status(200)
            .json(profile)
    else
      response
      .status(200)
      .json({})
}

export const updateProfile = async ({ body:{UpdateProfile: {firstName, lastName}, user} }: Request, response: Response) => {
  const profile = await UsersModel.UpdateUserProfile(user.id, {firstName, lastName})
  console.log(profile)
  if(profile)
      response
          .status(200)
          .json(profile)
  else
    response
    .status(200)
    .json({})
}


export const findOne = async ({ params: { id } }: Request, response: Response, next: NextFunction) => {
  const post = await PostsModel.findOneById(Number(id));
  if (!post) {
    return next(new HttpException('Post not found', HttpStatus.NOT_FOUND));
  }

  response
    .status(200)
    .json({ post });
}

export const findAll = async (_request: Request, response: Response) =>
  response
    .status(200)
    .json({
        posts: await PostsModel.findAll(),
    });

export const updateOne = async ({ params: { id }, body }: Request, response: Response) => {
  const {message} =  body.UpdatePostDto
  let post
  if (message) post = await PostsModel.updateOne(Number(id), {message, userId:body.user.id});

  else post = await PostsModel.findOneById(Number(id));

  response
    .status(200)
    .json({ post });
}

export const deleteOne = async ({ params : { id }}: Request, response: Response) => {
  await PostsModel.deleteOne(Number(id));

  response
    .status(204)
    .end();
}