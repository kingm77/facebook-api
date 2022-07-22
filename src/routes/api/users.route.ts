import { Router } from 'express';
import * as UsersController from '../../controllers/users.controller'

const api = Router();

api.get('/:id/posts', UsersController.getPosts);
api.get('/:id/profile', UsersController.getProfile);
api.patch('/:id/profile', UsersController.updateProfile);
api.delete('/:id', UsersController.deleteOne);

export default api;