import { Router } from "express";
import { jwtMiddleware } from "../../middlewares/jwt.middleware";
import AuthenticationRoutes from "./authentication.route"
import PostRoutes from "./posts.route"
import UserRoutes from "./users.route"

const api = Router();

api.use('/authentication', AuthenticationRoutes);
api.use('/posts', jwtMiddleware('SECRET'), PostRoutes)
api.use('/users', jwtMiddleware('SECRET'), UserRoutes)


export default api