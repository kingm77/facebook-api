import * as PostsModel from '../models/posts.model'
import base64url from "base64url";
import { HttpException, HttpStatus } from '../errors/HttpException.error';
import { Request, Response, NextFunction} from "express";
import logger from "../utils/logger"

export const createOne = async ({ body:{CreatePostDto, user} }: Request, response: Response) => {
  const {message} = CreatePostDto;
  const post = await PostsModel.createOne({message, userId: user.id});

  if(post)  logger.info(`The post ${post.id} was created by user ${user.id}`)

  response
    .status(201)
    .json({ post });
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

export const paginateKeyset = async (request: Request, response: Response) => {
  const  API_URL = 'http://localhost:8080/api';

  const { cursor = '' } = request.query;
  const limit = Number(request.query.limit || '5');

  const posts = await PostsModel.findByUser({
    skip: (cursor === '') ? 0 : 1,
    cursor: (cursor === '') ? null: JSON.parse(base64url.decode(cursor.toString())),
    limit,
  },  request.body.user.id);

  const nextCursor = posts[posts.length - 1].cursor;

  const next = `${API_URL}/posts?cursor=${nextCursor}&limit=${Math.abs(limit)}`;
  const previous = `${API_URL}/posts?cursor=${cursor}&limit=${-limit}`;

  response
    .status(200)
    .json({
      data: { posts },
      links: {
        next,
        previous,
      },
    });
}