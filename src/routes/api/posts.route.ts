import { Router } from 'express';
import * as PostsController from '../../controllers/posts.controller'

const api = Router();

api.post('/', PostsController.createOne);
api.get('/', PostsController.paginateKeyset);
api.get('/:id', PostsController.findOne);
api.patch('/:id', PostsController.updateOne);
api.delete('/:id', PostsController.deleteOne);


export default api;